import express, { Request, Response } from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  // If no jwt found on header
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  // verify token
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    // success response
    res.send({ currentUser: payload });
  } catch (error) {
    // invalid token error response
    return res.send({ currentUser: null });
  }
});

export { router as currentuserRouter };
