import express, { type Request, type Response, type NextFunction } from 'express';

export const userController = (userService) => {
  
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUser();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  });

  // POST register
  router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      
      const user = await userService.registerUser({ username, email, password });
      res.status(201).json({ success: true, message: "User registered", data: user });
    } catch (error) {
      next(error);
    }
  });


  router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      
      const { token, user } = await userService.loginUser(email, password);
      res.status(200).json({ success: true, token, user });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      
      const user = await userService.updateUser(req.params.id, { username, email, password });
      res.status(200).json({ success: true, message: "User updated", data: user });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
      next(error);
    }
  });

  return router;
};