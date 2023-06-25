import { OrderCreatedEvent, Publisher, Subject } from "@inovit-bd/ms-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
}
