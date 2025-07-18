const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { data, error } = await req.supabase.from("Anime").select("*");

  try {
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { Name, Episodes, Genre, Image, Status } = req.body;
  try {
    const { data, error } = await req.supabase
      .from("User")
      .update({ Name, Episodes, Genre, Image, Status })
      .eq("id", id)
      .select("*");

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  const { Name, Episodes, Genre, Image, Status } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Anime")
      .insert([{ Name, Episodes, Genre, Image, Status }])
      .select("*");
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("Anime")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
