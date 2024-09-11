
export const FLASH_MESSAGE_EVENT = "FLASH_MESSAGE_EVENT";

const EVENTS = [
    FLASH_MESSAGE_EVENT, 
  ] as const;

type AllowedEvents = (typeof EVENTS)[number];

export function dispatch(eventName: AllowedEvents, data?: any) {
  console.log('Event dispatched:', eventName, data)
  const notificationEvent = new CustomEvent(eventName, {
    detail: data,
  });
  document.dispatchEvent(notificationEvent);
}

export function observe(eventName: AllowedEvents, callback: any) {
  document.addEventListener(eventName, (e: any) => {
    e.stopImmediatePropagation();
    callback(e.detail);
  });
}

export function unobserve(eventName: AllowedEvents, callback?: any) {
  document.removeEventListener(eventName, callback)
}