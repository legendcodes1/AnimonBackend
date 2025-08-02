const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

// ✅ READ all animes for the logged-in user
router.get("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { data, error } = await req.supabase
      .from("Anime")
      .select("*")
      .eq("user_id", userId); // Only get the user's animes

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ✅ UPDATE an anime by ID (only if it belongs to the user)
router.put("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { Name, Episodes, Genre, Image, Status, Rating } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Anime")
      .update({ Name, Episodes, Genre, Image, Status, Rating })
      .match({ id, user_id: userId }) // Only update if it belongs to this user
      .select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// ✅ CREATE anime and associate with user
router.post("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { Name, Episodes, Genre, Image, Status, Rating } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Anime")
      .insert([
        {
          Name,
          Episodes,
          Genre,
          Image,
          Status,
          Rating,
          user_id: userId, // Associate with logged-in user
        },
      ])
      .select("*");

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// ✅ DELETE an anime by ID (only if it belongs to the user)
router.delete("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("Anime")
      .delete()
      .match({ id, user_id: userId }); // Only delete if it belongs to the user

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
