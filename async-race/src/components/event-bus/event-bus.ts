declare type EventListeners = {
  [name: string]: (() => void | Promise<void>)[];
};

const listeners: EventListeners = {};

export const subscribeEvent = (name: string, executor: () => void) => {
  if (!listeners[name]) {
    listeners[name] = [];
  }
  if (!listeners[name].map((listen) => listen.name).includes(executor.name)) {
    listeners[name].push(executor);
  } else {
    listeners[name] = listeners[name].map((listen) => {
      if (listen.name !== executor.name) return listen;
      return executor;
    });
  }
};

export const triggerEvent = async (name: string) => {
  const executors: (void | Promise<void>)[] = [];
  if (listeners[name]) {
    listeners[name].forEach((fn) => {
      executors.push(fn());
    });
  }
  await Promise.all(executors);
};
