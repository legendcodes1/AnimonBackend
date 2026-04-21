import { libaryRepository } from "../repositories/libraryRepository";

export const libraryService = {
  getLibrary: async (supabase: any, userId: any) => {
    const { data, error } = await libaryRepository.getLibrary(supabase, userId);

    if (error) {
      throw error;
    }
    return data;
  },

  createLibraryItem: async (supabase: any, userId: any, payload: any) => {
    console.log(payload);
    const cleanedData = {
      ...payload,
    };
    const { data, error } = await libaryRepository.createLibraryItem(
      supabase,
      userId,
      cleanedData,
    );

    if (error) {
      throw error;
    }
    return data;
  },

  editLibraryItem: async (
    supabase: any,
    userId: any,
    libraryId: any,
    payload: any,
  ) => {
    const { data, error } = await libaryRepository.editLibrayItem(
      supabase,
      userId,
      libraryId,
      payload,
    );

    if (error) {
      throw error;
    }
    return data;
  },

  deleteLibraryItem: async (supabase: any, librayId: any, payload: any) => {
    const { data, error } = await libaryRepository.deleteLibraryItem(
      supabase,
      librayId,
      payload,
    );

    if (error) {
      throw error;
    }
    return data;
  },

};
