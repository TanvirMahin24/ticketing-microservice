import { Publisher, Subjects, TicketCreatedEvent } from "@inovit-bd/ms-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
