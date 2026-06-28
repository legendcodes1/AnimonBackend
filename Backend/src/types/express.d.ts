import { User } from "./user.type"
import { SupabaseClient } from "@supabase/supabase-js";

export {}

declare global {
    namespace Express {
        export interface Request{
            user?: User;
            supabase : SupabaseClient;
        }
    }
}
