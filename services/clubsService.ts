import { clubRepository } from "../repositories/clubRepository";
import type { Club } from "../types/club.type";
import type { User } from "../types/user.type";

export const clubsService = {
  getClubs: async (supabase: any) => {
    const { data, error } = await clubRepository.getClubs(supabase);

    if (error) {
      throw error;
    }
    return (
      data?.map((group: Club) => ({
        ...group,
        memberCount: group.Group_Members?.length || 0,
      })) || []
    );
  },
  getClubById: async (supabase: any, clubId: string) => {
    const { data, error } = await clubRepository.getClubById(supabase, clubId);
    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  },
  createClubs: async (userId: string, supabase: any, payload: any) => {
    const { data, error } = await clubRepository.insertClub(
      userId,
      supabase,
      payload,
    );
    if (error) throw error;

    const clubId = data[0].id;
    const { error: memberError } = await clubRepository.addMember(
      supabase,
      userId,
      clubId,
    );
    if (memberError) throw memberError;

    return data;
  },
  joinClub: async (supabase: any, group_id: string, user_id: string) => {
    const { data, error } = await clubRepository.joinClub(
      supabase,
      group_id,
      user_id,
    );
    if (error) {
      throw error;
    }
    return data;
  },
  checkClubMembership: async (
    supabase: any,
    group_id: string,
    user_id: string,
  ) => {
    const { data, error } = await clubRepository.checkMembership(
      supabase,
      group_id,
      user_id,
    );

    // PGRST116 = no rows found = user is not a member
    if (error && error.code === "PGRST116") {
      return false;
    }

    if (error) {
      throw error;
    }

    return !!data; // Return true if member exists
  },
  checkUserIsAdmin: async (supabase: any, userId: string, groupId: string) => {
    const { data, error } = await clubRepository.checkUserIsAdmin(
      supabase,
      userId,
      groupId,
    );
    if (error) {
      throw error;
    }
    return data?.created_by === userId;
  },
  deleteClub: async (groupId: string, supabase: any, payload: any) => {
    const { data, error } = await clubRepository.deleteClub(
      groupId,
      supabase,
      payload,
    );

    if (error) {
      throw error;
    }

    return data;
  },
};
