const express = require("express");
const router = express.Router();

// ✅ CREATE manga (POST /mangas)
router.post("/", async (req, res, next) => {
  const { Name, Chapters, Genre, Image, Status } = req.body; // receive from frontend form

  try {
    const { data, error } = await req.supabase
      .from("manga")
      .insert([{ Name, Chapters, Genre, Image, Status }])
      .select("*"); // insert using variables

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// ✅ READ all mangas (GET /mangas)
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await req.supabase.from("manga").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ✅ UPDATE manga by id (PUT /mangas/:id)
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { Name, Chapters, Genre, Image, Status } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("manga")
      .update({ Name, Chapters, Genre, Image, Status })
      .eq("id", id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE manga by id (DELETE /mangas/:id)
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("manga")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
