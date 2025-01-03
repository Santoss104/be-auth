import express from "express";
import {
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updatePassword,
  updateUserInfo
} from "../controllers/user.controllers";

const userRouter = express.Router();

userRouter.post("/register", registrationUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logoutUser);

userRouter.get("/user", getUserInfo);

userRouter.put("/update-user-info", updateUserInfo);

userRouter.put("/update-user-password", updatePassword);

userRouter.get("/get-users", getAllUsers);

export default userRouter;