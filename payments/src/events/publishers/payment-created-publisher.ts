import { Subjects, Publisher, PaymentCreatedEvent } from "@inovit-bd/ms-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
