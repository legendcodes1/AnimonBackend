import { libaryRepository } from "../repositories/libraryRepository";

export const libraryService = {

    getLibrary : async(supabase: any, userId: string) =>{
        console.log("in service");
        const {data, error} =  await libaryRepository.getLibrary(supabase, userId)

        if(error){
            throw error
        }
        return data;
    } ,

    createLibraryItem : async(supabase: any, userId: string, payload: any) => {
        const {data, error} = await libaryRepository.createLibraryItem(supabase, userId, payload)

        if(error){
            throw error
        }
        return data;
    }  ,

    editLibraryItem : async(supabase: any, userId: string, payload: any) => {
        const {data, error} = await libaryRepository.editLibrayItem(supabase, userId, payload);

        if(error){
            throw error;
        }
        return data;
    },

    deleteLibraryItem : async(supabase:any, librayId:string, payload:any) => {
        const {data, error} = await libaryRepository.deleteLibraryItem(supabase, librayId, payload)

        if(error){
            throw error;
        }
        return data;
    }
}