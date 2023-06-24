import { Publisher, Subject, TicketCreatedEvent } from "@inovit-bd/ms-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
}
