import BasePubSub from "pubsub-js";
import events from "src/consts/events.json";

export function createPubSub<T>(event: keyof typeof events) {
  const topic = events[event];
  return {
    publish(data: T) {
      return BasePubSub.publish(topic, data);
    },
    async subscribe(
      callback: (message: typeof event, data: T) => Promise<void>
    ) {
      BasePubSub.subscribe(topic, callback);
    },
    unsubscribe() {
      return BasePubSub.unsubscribe(topic);
    },
  };
}
