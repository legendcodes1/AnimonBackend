import { libaryRepository } from "../repositories/libraryRepository";

export const libraryService = {

    getLibrary : async(supabase: any, userId: any) =>{
        const {data, error} =  await libaryRepository.getLibrary(supabase, userId)

        if(error){
            throw error
        }
        return data;
    } ,

    createLibraryItem : async(supabase: any, userId: any, payload: any) => {
        const cleanedData = {
            ...payload,
            rating: payload.rating ? parseFloat(payload.rating) : null,
            chapters: payload.chapters ? parseInt(payload.chapters) : null,
            episodes: payload.episodes ? parseInt(payload.episodes) : null,
            total_chapters: payload.total_chapters ? parseInt(payload.total_chapters) : null,
            total_episodes: payload.total_episodes ? parseInt(payload.total_episodes) : null,
        };
        const {data, error} = await libaryRepository.createLibraryItem(supabase, userId, cleanedData);

        if(error){
            throw error
        }
        return data;
    } ,

    editLibraryItem : async(supabase: any, userId: any, libraryId:any, payload: any) => {
        const {data, error} = await libaryRepository.editLibrayItem(supabase, userId, libraryId, payload);

        if(error){
            throw error;
        }
        return data;
    },

    deleteLibraryItem : async(supabase:any, librayId:any, payload:any) => {
        const {data, error} = await libaryRepository.deleteLibraryItem(supabase, librayId, payload)

        if(error){
            throw error;
        }
        return data;
    }
}