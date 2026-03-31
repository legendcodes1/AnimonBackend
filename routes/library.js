const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id; 

  try {
    const { data, error } = await req.supabase
      .from("Library")
      .select("*")
      .eq("user_id", userId); // ← filter by user_id

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ✅ CREATE 
router.post("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { title, type, episodes, chapters, genre, image, notes, total_chapters,
          total_episodes, status, rating, watch } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Library")
      .insert([
        {
          title,
          type,
          chapters,
          episodes,
          total_chapters,
          total_episodes,
          genre,
          image,
          status,
          notes,
          watch,
          rating,
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
  const { title, type, chapters, genre, image,episodes, notes, total_chapters,
          total_episodes, status, rating, watch } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Library")
      .update({  
          title,
          type,
          chapters,
          episodes,
          total_chapters,
          total_episodes,
          genre,
          notes,
          image,
          status,
          watch,
          rating, })
      .match({ id, user_id: userId }); // ← enforce ownership

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("Library")
      .delete()
      .match({ id, user_id: userId }); 

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
