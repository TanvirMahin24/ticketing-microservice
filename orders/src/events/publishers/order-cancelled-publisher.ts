import { OrderCancelledEvent, Publisher, Subject } from "@inovit-bd/ms-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subject.OrderCancelled = Subject.OrderCancelled;
}
