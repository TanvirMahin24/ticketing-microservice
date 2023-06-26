import { Publisher, OrderCreatedEvent, Subjects } from "@inovit-bd/ms-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
