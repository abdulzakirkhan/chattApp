import express from 'express'
import { login, logout, signup } from '../controler/auth.controller.js';


const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', login);

router.post('/log-out', logout);



export default router;