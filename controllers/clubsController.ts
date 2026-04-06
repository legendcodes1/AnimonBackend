import express, { type Request, type Response, type NextFunction } from 'express';
import { clubsService } from '../services/clubsService';
import { supabase} from '../db/supabaseClient'
import type { User} from '../types/user.type';
import type { Club } from '../types/club.type';

interface  IclubsController {
  getClubs : (req: Request, res: Response) => any ,
  createClubs : (req: Request, res: Response) => any,
  joinClub : (req: Request, res: Response) => any,
  deleteClub : (req: Request, res: Response) => any,
}
export const clubsController = () : IclubsController =>  
    ({

      getClubs : async(req, res) => {
        const result = await clubsService.getClubs(supabase)
        return res.json(result);
        
      },
        createClubs: async (req: Request, res: Response) => {
   
         
            const userId = req.body.userId
            console.log("Creating club with:", { userId, body: req.body })
            if (!userId) {
              return res.status(400).json({ message: "User ID missing in token" });
            }
            
            const result = await clubsService.createClubs(userId, supabase, req.body)
             if (!result) {
              return res.status(500).json({ error: "Club service returned undefined" });
            }
    
            return res.json(result)
     
        },
        
        joinClub : async (req, res) => {
          if(!req.body.userId){
            return res.status(400).json({ message: "User ID missing in token" });
          }
          const result = await clubsService.joinClub(supabase, req.body);

          return res.json(result)
        },

        deleteClub : async (req: Request, res: Response) => {
            const groupId = req.body.clubId

            if(!groupId){
               return res.status(400).json({ message: "Group ID missing in token" });
            }

            const result = await clubsService.deleteClub(groupId, req.supabase, req.body)
            res.json(result)
        }
    })
