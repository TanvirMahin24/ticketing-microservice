import { Publisher, Subject, TicketUpdatedEvent } from "@inovit-bd/ms-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subject.TicketUpdated = Subject.TicketUpdated;
}
