

export const clubRepository = {

    getClubs : async(supabase: any) => {
        return await  supabase
        .from('Groups')
        .select()
    },
    insertClub : async(userId: string, supabase:any, clubData:any) => {
        const { userId: _, createdBy: __, ...cleanData } = clubData;
        return  await supabase
        .from('Groups')
        .insert({ ...cleanData, created_by: userId })
        .select()
    },
    joinClub : async(supabase:any, clubData:any) => {
        return await supabase
        .from('Group_Members')
        .insert(...clubData)
        .select()
    },
    deleteClub : async (groupId: string, supabase:any, clubData:any) =>{
        return await  supabase
        .from('Groups')
        .delete()
        .eq('id', groupId)
    }
}