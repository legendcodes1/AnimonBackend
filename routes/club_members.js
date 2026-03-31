const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id; 

  try {
    const { data, error } = await req.supabase
      .from("Groups")
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
  const groupId = req.group.id;
  const { role} = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Groups_Members")
      .insert([
        {
          role,
          group_id: groupId,
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


router.put("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { role} = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Groups_Members")
      .update({  
          role})
      .match({ id, user_id: userId }); 

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
      .from("Groups_Members")
      .delete()
      .match({ id, user_id: userId }); 

    if (error) throw error;
    res.json({ message: "Deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
