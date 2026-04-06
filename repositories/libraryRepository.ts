import { supabase } from "../db/supabaseClient";


export const libaryRepository = {
    getLibrary :  async(supabase : any, userId: any) => {
      return await supabase
      .from("Library")
      .select("*")
      .eq("user_id", userId) 
    },

    createLibraryItem : async(supabase: any, userId: string, libraryData : any) => {
        return await supabase
        .from("Library")
        .insert(
            {
            ...libraryData,
            user_id: userId,
            },
        )
        .select("*");
    },

    editLibrayItem : async(supabase:any, userId:any, libraryId: any, libraryData: any) => {
        return await supabase.
        from("Library")
        .update(libraryData)
        .eq('id', libraryId)
        .select()
    },

    deleteLibraryItem : async(supabase:any, libraryId:any, libraryData: any) => {
        return await supabase.
        from("Library")
        .delete()
        .eq('id', libraryId)
    }
}