import { Router } from "express"
// import verifyToken from "../middlewares/auth";
import {clubsController} from "../controllers/clubsController"


const router = Router()
const controller = clubsController()
// ---------------- GET ALL GROUPS FOR USER ----------------
router.get("/", 
  controller.getClubs
);

// ---------------- CREATE A NEW GROUP ----------------
router.post("/", 
  controller.createClubs
);

// // ---------------- JOIN A GROUP ----------------
// router.post("/:groupId/join",  
//   controller.
// );

// ---------------- UPDATE GROUP ----------------
// router.put("/:id", verifyToken, async (req, res, next) => {
//   const userId = req.user.id;
//   const { id } = req.params;
//   const { name, description, group_avatar_url } = req.body;

//   try {
//     const { data, error } = await req.supabase
//       .from("Groups")
//       .update({ name, description, group_avatar_url })
//       .match({ id, created_by: userId });

//     if (error) throw error;

//     res.json(data);
//   } catch (err) {
//     next(err);
//   }
// });

// // ---------------- DELETE GROUP ----------------
router.delete("/:id", 
  controller.deleteClub
);

// // ---------------- REMOVE MEMBER ----------------
// router.delete("/:groupId/members/:memberId", verifyToken, async (req, res, next) => {
//   const userId = req.user.id;
//   const { groupId, memberId } = req.params;

//   try {
//     const { data: member } = await req.supabase
//       .from("Groups_Members")
//       .select("*")
//       .match({ id: memberId })
//       .single();

//     if (!member) return res.status(404).json({ error: "Member not found" });

//     if (member.user_id !== userId) {
//       const { data: adminCheck } = await req.supabase
//         .from("Groups_Members")
//         .select("*")
//         .match({ group_id: groupId, user_id: userId, role: "admin" })
//         .single();

//       if (!adminCheck) return res.status(403).json({ error: "Not authorized" });
//     }

//     const { data, error } = await req.supabase
//       .from("Groups_Members")
//       .delete()
//       .match({ id: memberId });

//     if (error) throw error;

//     res.json({ message: "Member removed", data });
//   } catch (err) {
//     console.error("DELETE /groups/:groupId/members/:memberId error:", err);
//     next(err);
//   }
// });

export default router;