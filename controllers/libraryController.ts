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
        const userId = req.body.userId;
         console.log(req.body)
        if(!userId){
            return res.status(400).json({message: "no user"})
        }
        const result = await libraryService.getLibrary(supabase, userId)
        return res.json(result)
    },

    createLibraryItem : async (req, res) => {
        const userId = req.body.userId;
        if(!userId){
            return res.status(400).json({message: "no user"})
        }
        const result = await libraryService.createLibraryItem(supabase, userId, req.body)
        return res.json(result)
    },

    editLibraryItem : async (req, res) => {
        const userId = req.body.userId;

        if(!userId){
            return res.status(400).json({message: "User is not logged in. Please log in"})
        }

        const result = await libraryService.editLibraryItem(supabase, userId, req.body)
        return res.json(result)
    },

    deleteLibraryItem : async (req, res) => {
        const libraryId = req.body.libraryId;
        if(!libraryId){
            return res.status(400).json({message: "Library item doesn't exits"})
        }

        const result = await libraryService.deleteLibraryItem(supabase, libraryId, req.body);
        res.json(result)
    }
})