export const clubRepository = {
  getClubs: async (supabase: any) => {
    return await supabase.from("Groups").select(`
                *,
                Group_Members(count)
            `);
  },
  getClubById: async (supabase: any, clubId: string) => {
    return await supabase.from("Groups").select("*").eq("id", clubId);
  },
  insertClub: async (userId: string, supabase: any, clubData: any) => {
    const { userId: _, createdBy: __, ...cleanData } = clubData;
    return await supabase
      .from("Groups")
      .insert({ ...cleanData, created_by: userId })
      .select();
  },
  joinClub: async (supabase: any, user_id: string, group_id: string) => {
    return await supabase
      .from("Group_Members")
      .insert({
        user_id: user_id,
        group_id: group_id,
      })
      .select();
  },
  addMember: async (supabase: any, userId: string, clubId: string) => {
    return await supabase
      .from("Group_Members")
      .insert({
        user_id: userId,
        group_id: clubId,
      })
      .select();
  },
  checkMembership: async (supabase: any, userId: any, clubId: any) => {
    // Check if user is a member of this club
    return await supabase
      .from("Group_Members")
      .select("*")
      .eq("user_id", userId)
      .eq("group_id", clubId)
      .single();
  },
  checkUserIsAdmin: async (supabase: any, userId: string, clubId: string) => {
    // Admin = user who created the club
    return await supabase
      .from("Groups")
      .select("created_by")
      .eq("id", clubId)
      .single();
  },
  deleteClub: async (groupId: string, supabase: any, clubData: any) => {
    return await supabase.from("Groups").delete().eq("id", groupId);
  },
};
