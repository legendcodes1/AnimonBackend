import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { clubsService } from "../services/clubsService";
import { supabase } from "../db/supabaseClient";
import type { User } from "../types/user.type";
import type { Club } from "../types/club.type";

interface IclubsController {
  getClubs: (req: Request, res: Response) => any;
  createClubs: (req: Request, res: Response) => any;
  getClubById: (req: Request, res: Response) => any;
  joinClub: (req: Request, res: Response) => any;
  checkClub: (req: Request, res: Response) => any;
  deleteClub: (req: Request, res: Response) => any;
}
export const clubsController = (): IclubsController => ({
  getClubs: async (req, res) => {
    const result = await clubsService.getClubs(supabase);
    return res.json(result);
  },

  getClubById: async (req, res) => {
    const clubId = req.params.id as string;
    const result = await clubsService.getClubById(supabase, clubId);
    return res.json(result);
  },
  createClubs: async (req: Request, res: Response) => {
    const userId = req.body.userId;
    console.log("Creating club with:", { userId, body: req.body });
    if (!userId) {
      return res.status(400).json({ message: "User ID missing in token" });
    }

    const result = await clubsService.createClubs(userId, supabase, req.body);
    if (!result) {
      return res.status(500).json({ error: "Club service returned undefined" });
    }

    return res.json(result[0]);
  },

  joinClub: async (req, res) => {
    try {
      const userId = req.params.userId;
      const clubId = req.params.id;

      if (Array.isArray(userId) || Array.isArray(clubId)) {
        return res.status(400).json({ message: "Invalid user or group ID" });
      }

      if (!userId || !clubId) {
        return res.status(400).json({ message: "Missing user or group ID" });
      }

      // Check if already a member
      const isMember = await clubsService.checkClubMembership(
        supabase,
        userId,
        clubId,
      );
      if (isMember) {
        return res.status(400).json({ message: "User is already a member" });
      }

      const result = await clubsService.joinClub(supabase, userId, clubId);
      return res.json(result);
    } catch (error) {
      console.error("Error joining club:", error);
      res.status(500).json({ message: "Failed to join club" });
    }
  },
  
  checkClub: async (req, res) => {
    try {
      const userId = req.params.userId;
      const clubId = req.params.id;

      if (
        !userId ||
        Array.isArray(userId) ||
        !clubId ||
        Array.isArray(clubId)
      ) {
        return res.status(400).json({ message: "Missing user or club ID" });
      }

      const isMember = await clubsService.checkClubMembership(
        supabase,
        clubId,
        userId,
      );

      return res.json({ isMember }); // ← Return as object
    } catch (error) {
      console.error("Error checking membership:", error);
      res.status(500).json({ message: "Failed to check membership" });
    }
  },

  deleteClub: async (req: Request, res: Response) => {
    const groupId = req.body.clubId;

    if (!groupId) {
      return res.status(400).json({ message: "Group ID missing in token" });
    }

    const result = await clubsService.deleteClub(
      groupId,
      req.supabase,
      req.body,
    );
    res.json(result);
  },
});
