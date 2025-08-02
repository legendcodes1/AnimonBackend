const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
// ✅ READ all mangas (GET /mangas)
router.get("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id; // ← get current user's ID

  try {
    const { data, error } = await req.supabase
      .from("Manga")
      .select("*")
      .eq("user_id", userId); // ← filter by user_id

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ✅ CREATE manga (POST /mangas)
router.post("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { Name, Chapters, Genre, Image, Status, Rating } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Manga")
      .insert([
        {
          Name,
          Chapters,
          Genre,
          Image,
          Status,
          Rating,
          user_id: userId,
        },
      ])
      .select("*");

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("POST /mangas error:", err); // << Add this for logging
    next(err);
  }
});

// ✅ UPDATE manga by id (PUT /mangas/:id)
router.put("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { Name, Chapters, Genre, Image, Status, Rating } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Manga")
      .update({ Name, Chapters, Genre, Image, Status, Rating })
      .match({ id, user_id: userId }); // ← enforce ownership

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE manga by id (DELETE /mangas/:id)
router.delete("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("Manga")
      .delete()
      .match({ id, user_id: userId }); // ← enforce ownership

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
