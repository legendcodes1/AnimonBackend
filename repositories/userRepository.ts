import { User } from '../types/user.type'

export const userRepository = (supabaseClient) => ({
    findAllUsers: async (): Promise<User[]> => {
        const { data, error } = await supabaseClient.from("Users").select("*");
        if (error) {
            throw error; 
        }
        return data;
    },

    createUser: async (userData: { username: string; email: string; password: string }): Promise<User> => {
        const { data, error } = await supabaseClient
            .from("Users")
            .insert([userData])
            .select("*");
        
        if (error) {
            throw error;
        }
        return data[0];
    },

    findUserById: async (id: string): Promise<User | null> => {
        // FIX 1: Changed id: User to id: string
        const { data, error } = await supabaseClient
            .from("Users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }
        return data;
    },

    findUserByEmail: async (email: string): Promise<User | null> => {
        // FIX 2: Added this method (you'll need it in loginUser)
        const { data, error } = await supabaseClient
            .from("Users")
            .select("*")
            .eq("email", email)
            .single();

        if (error) {
            throw error;
        }
        return data;
    },

    deleteUser: async (userId: string): Promise<void> => {
        const { data, error } = await supabaseClient
            .from("Users")
            .delete()
            .eq("id", userId);

        if (error) {
            throw error;
        }
    },

    updateUser: async (userId: string, updateData: Partial<{ username: string; email: string; password: string }>): Promise<User> => {
        const { data, error } = await supabaseClient
            .from("Users")
            .update(updateData)
            .eq("id", userId)
            .select("*")
            .single();

        if (error) {
            throw error;
        }
        return data;
    }
})