import { ExpirationCompleteEvent, Publisher, Subjects } from "@aaecomm/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}