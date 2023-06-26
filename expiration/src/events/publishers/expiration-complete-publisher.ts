import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@inovit-bd/ms-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
