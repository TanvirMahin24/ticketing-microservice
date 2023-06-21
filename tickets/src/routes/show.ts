import { DatabaseConnectionError, NotFoundError } from "@inovit-bd/ms-common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    console.log(ticket);

    res.status(200).send(ticket);
  } catch (error) {
    console.log(error);
    throw new DatabaseConnectionError();
  }
});

export { router as showTicketRouter };
