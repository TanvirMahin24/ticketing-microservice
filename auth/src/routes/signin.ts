import express, { Request, Response } from "express";
const router = express.Router();

router.post("/api/users/signin", (req: Request, res: Response) => {});

export { router as signinRouter };
