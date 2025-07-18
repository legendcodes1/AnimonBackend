const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { data, error } = await req.supabase.from("User").select("*");

  try {
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { Username, Password, Email } = req.body;
  try {
    const { data, error } = await req.supabase
      .from("User")
      .update({ Username, Password, Email })
      .eq("id", id)
      .select("*");

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  const { Username, Password, Email } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("User")
      .insert([{ Username, Password, Email }])
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
      .from("User")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
