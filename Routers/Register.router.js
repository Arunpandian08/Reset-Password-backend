import express from "express";
import { postRegister } from "../Controllers/Register.controller.js";

const router = express.Router()

router.post('/register',postRegister) //http://localhost:4000/user/register

export default router