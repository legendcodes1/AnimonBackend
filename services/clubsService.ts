import { clubRepository } from '../repositories/clubRepository';
import type { User } from '../types/user.type';

export const clubsService = {

        getClubs : async (supabase:any) => {
            const {data, error} = await clubRepository.getClubs(supabase)

            if(error){
                throw error;
            }
            return data
        },
        createClubs : async (userId: string, supabase: any, payload: any) => {
            const {data, error} = await clubRepository.insertClub(userId, supabase, payload)
            if(error){
                console.log(error)
                throw error;
            }
            return data;
        },

        joinClub : async (supabase:any, payload:any) => {
            const {data, error} = await clubRepository.joinClub(supabase, payload)
            if(error){
                throw error;
            }
            return data;
        },
        deleteClub : async (groupId: string, supabase: any, payload:any) => {
            const {data, error} = await clubRepository.deleteClub(groupId, supabase, payload)

            if(error){
                throw error;
            }

            return data;
        }
   
}