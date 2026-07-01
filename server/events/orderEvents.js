import { EventEmitter } from 'events';

class OrderEvents extends EventEmitter {
  async emitAsync(eventName, payload) {
    const listeners = this.listeners(eventName);

    for (const listener of listeners) {
      await listener(payload);
    }
  }
}

const orderEvents = new OrderEvents();

export default orderEvents;