import { Subjects, Publisher, OrderCancelledEvent } from "@inovit-bd/ms-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
