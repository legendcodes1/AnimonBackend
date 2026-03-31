import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

export const userService = (supabaseClient) => {
  const repo = userRepository(supabaseClient);

  return {
    // Get all users
    getAllUser: async () => {
      return repo.findAllUsers();
    },

    // Register a new user
    registerUser: async (userData: { username: string; email: string; password: string }) => {
      // VALIDATION
      if (!userData.username || !userData.password || !userData.email) {
        throw new Error("username, email, and password are required");
      }

      // BUSINESS LOGIC: Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Call repo with hashed password
      return repo.createUser({
        ...userData,
        password: hashedPassword
      });
    },

    // Login user
    loginUser: async (email: string, password: string) => {
      // VALIDATION
      if (!email || !password) {
        throw new Error("email and password are required");
      }

      // Find user by email
      const user = await repo.findUserById(email);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // BUSINESS LOGIC: Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      // BUSINESS LOGIC: Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return { token, user };
    },

    // Get user by ID
    getUserById: async (id: string) => {
      const user = await repo.findUserById(id);

      if (!user) {
        throw new Error("User does not exist");
      }

      return user;
    },

    // Update user
    updateUser: async (userId: string, updateData: Partial<{ username: string; email: string; password: string }>) => {
      // If password is being updated, hash it
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      return repo.updateUser(userId, updateData);
    },

    // Delete user
    deleteUser: async (userId: string) => {
      return repo.deleteUser(userId);
    }
  };
};