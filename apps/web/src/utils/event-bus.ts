import mitt from "mitt";

export type EventBusRecord = {
  http401: void;
};

export const eventBus = mitt<EventBusRecord>();
