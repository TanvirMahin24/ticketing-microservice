import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subject } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
  queueGroupName = "payment-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data", data);

    msg.ack();
  }
}
