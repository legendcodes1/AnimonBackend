const express = require("express");
const router = express.Router();
import verifyToken from("../middlewares/auth");
import {clubsController} from "../controllers/clubsController"
// ---------------- GET ALL GROUPS FOR USER ----------------
router.get("/", verifyToken,  
  clubsController.createClubs
);

// ---------------- CREATE A NEW GROUP ----------------
router.post("/", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { name, description, group_avatar_url } = req.body;

  try {
    const { data: groupData, error: groupError } = await req.supabase
      .from("Groups")
      .insert([{ 
        name, 
        description, 
        group_avatar_url, 
        created_by: userId 
      }])
      .select("*")
      .single();

    if (groupError) throw groupError;

    const { data: memberData, error: memberError } = await req.supabase
      .from("Groups_Members")
      .insert([{ 
        group_id: groupData.id, 
        user_id: userId, 
        role: "admin" 
      }])
      .select("*");

    if (memberError) throw memberError;

    res.status(201).json({ group: groupData, member: memberData });
  } catch (err) {
    console.error("POST /groups error:", err);
    next(err);
  }
});

// ---------------- JOIN A GROUP ----------------
router.post("/:groupId/join", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { groupId } = req.params;

  try {
    const { data: existingMember } = await req.supabase
      .from("Groups_Members")
      .select("*")
      .match({ group_id: groupId, user_id: userId })
      .single();

    if (existingMember) return res.status(400).json({ error: "Already a member" });

    const { data, error } = await req.supabase
      .from("Groups_Members")
      .insert([{ group_id: groupId, user_id: userId, role: "member" }])
      .select("*");

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
          console.error("POST /groups error FULL:", JSON.stringify(err, null, 2));

    next(err);
  }
});

// ---------------- UPDATE GROUP ----------------
router.put("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, description, group_avatar_url } = req.body;

  try {
    const { data, error } = await req.supabase
      .from("Groups")
      .update({ name, description, group_avatar_url })
      .match({ id, created_by: userId });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ---------------- DELETE GROUP ----------------
router.delete("/:id", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const { data, error } = await req.supabase
      .from("Groups")
      .delete()
      .match({ id, created_by: userId });

    if (error) throw error;

    await req.supabase
      .from("Groups_Members")
      .delete()
      .match({ group_id: id });

    res.json({ message: "Group deleted successfully", data });
  } catch (err) {
    next(err);
  }
});

// ---------------- REMOVE MEMBER ----------------
router.delete("/:groupId/members/:memberId", verifyToken, async (req, res, next) => {
  const userId = req.user.id;
  const { groupId, memberId } = req.params;

  try {
    const { data: member } = await req.supabase
      .from("Groups_Members")
      .select("*")
      .match({ id: memberId })
      .single();

    if (!member) return res.status(404).json({ error: "Member not found" });

    if (member.user_id !== userId) {
      const { data: adminCheck } = await req.supabase
        .from("Groups_Members")
        .select("*")
        .match({ group_id: groupId, user_id: userId, role: "admin" })
        .single();

      if (!adminCheck) return res.status(403).json({ error: "Not authorized" });
    }

    const { data, error } = await req.supabase
      .from("Groups_Members")
      .delete()
      .match({ id: memberId });

    if (error) throw error;

    res.json({ message: "Member removed", data });
  } catch (err) {
    console.error("DELETE /groups/:groupId/members/:memberId error:", err);
    next(err);
  }
});

module.exports = router;