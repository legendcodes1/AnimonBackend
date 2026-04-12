

export const clubRepository = {

     getClubs : async(supabase: any) => {
        return await supabase
            .from('Groups')
            .select(`
                *,
                Group_Members(count)
            `);
    },
    getClubById : async(supabase : any, clubId: string) => {
        return await supabase.
        from('Groups')
        .select('*')
         .eq('id', clubId)
    },
    insertClub : async(userId: string, supabase:any, clubData:any) => {
        const { userId: _, createdBy: __, ...cleanData } = clubData;
        return  await supabase
        .from('Groups')
        .insert({ ...cleanData, created_by: userId })
        .select()
    },
    joinClub : async(supabase:any, user_id:string, group_id:string) => {
        return await supabase
        .from('Group_Members')
        .insert({
            user_id: user_id,
            group_id: group_id,
        })
        .select()
    },
    deleteClub : async (groupId: string, supabase:any, clubData:any) =>{
        return await  supabase
        .from('Groups')
        .delete()
        .eq('id', groupId)
    }
}