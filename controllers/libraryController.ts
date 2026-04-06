import express, { type Request, type Response, type NextFunction } from 'express';
import { libraryService } from '../services/libraryService';
import { supabase } from '../db/supabaseClient';

interface ILibraryController {
  getLibrary : (req: Request, res: Response) => any ,
  createLibraryItem : (req: Request, res: Response) => any,
   editLibraryItem : (req: Request, res: Response) => any,
  deleteLibraryItem : (req: Request, res: Response) => any,
}


export const libraryController = () : ILibraryController => 
    ({

    getLibrary : async (req, res) => {
        try {
        const userId = req.query.user_id;
         console.log(req.body)
        if(!userId){
            return res.status(400).json({message: "no user"})
        }
        const result = await libraryService.getLibrary(supabase, userId)
        return res.json(result)
        } catch (error) {
            console.log(error)
        }
      
    
    },
     createLibraryItem : async (req, res) => {
      try {
        const userId = req.body.user_id;
        console.log("Creating item for:", userId);
        
        if(!userId){
          return res.status(400).json({message: "no user"})
        }
        
        const result = await libraryService.createLibraryItem(supabase, userId, req.body);
        return res.json(result);
      } catch (error) {
        console.error(" Error in createLibraryItem:", error);
      }
    },
    editLibraryItem : async (req, res) => {
          //we use query for fetching id
        const userId = req.query.userId;
        //we use params for the /:id not body duh
        const libraryId = req.params.id;
        if(!userId){
            return res.status(400).json({message: "User is not logged in. Please log in"})
        }

        const result = await libraryService.editLibraryItem(supabase, userId, libraryId, req.body)
        return res.json(result)
    },

    deleteLibraryItem : async (req, res) => {
    const libraryId = req.params.id;
    
    if(!libraryId){
        return res.status(400).json({message: "Library item doesn't exist"})
    }

    try {
        const result = await libraryService.deleteLibraryItem(supabase, libraryId, req.body);
        return res.json(result);
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({message: "Failed to delete"});
    }
}
})