import { supabase } from "../db/supabaseClient";


export const libaryRepository = {
    getLibrary :  async(supabase : any, userId: string) => {
        console.log("in repo")
      return await supabase
      .from("Library")
      .select("*")
      .eq("user_id", userId) // ← filter by user_id
      .single();
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

    editLibrayItem : async(supabase:any, userId:string, libraryData: any) => {
        return await supabase.
        from("Library")
        .update(...libraryData)
        .eq('id', userId)
        .select()
    },

    deleteLibraryItem : async(supabase:any, libraryId:string, libraryData: any) => {
        return await supabase.
        from("Library")
        .delete()
        .eq('id', libraryId)
    }
}