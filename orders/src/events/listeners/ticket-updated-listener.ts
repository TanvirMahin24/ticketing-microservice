import { Listener, Subject, TicketUpdatedEvent } from "@inovit-bd/ms-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subject.TicketUpdated = Subject.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { title, price } = data;
    const ticket = await Ticket.findById(data.id);

    if (!ticket) {
      throw new Error("[ORDERS] Ticket not found!");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
