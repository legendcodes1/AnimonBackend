import express, { type Request, type Response, type NextFunction } from 'express';

export const clubsController = ()  =>  
    ({
        createClubs : ( async (req, res) => {
          try {
            // Extract userId from token (try multiple possible keys)
            const userId = req.user.id || req.user.userId || req.user.sub;
        
            if (!userId) {
              console.warn("User ID missing in JWT:", req.user);
              return res.status(400).json({ message: "User ID missing in token" });
            }
        
            // Fetch user's group memberships
            const { data, error } = await req.supabase
              .from("Groups_Members")
              .select(`
                role,
                Groups (
                  id,
                  name,
                  description,
                  group_avatar_url,
                  created_by
                )
              `)
              .eq("user_id", userId);
        
            if (error) {
              console.error("Supabase fetch error:", error);
              return res.status(500).json({ message: "Failed to fetch groups", details: error.message });
            }
        
            // Return groups data
            res.json(data);
          } catch (err) {
            console.error("GET /groups unexpected error:", err);
            res.status(500).json({ message: "Internal server error", details: err.message });
          }
        });
    })
