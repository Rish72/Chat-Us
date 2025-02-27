import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controller/auth.controller.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';
const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/update-profile", protectedRoute, updateProfile)
authRouter.get("/check",protectedRoute, checkAuth)
export default authRouter