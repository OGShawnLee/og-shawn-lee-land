export interface Ref<T> {
  value: T
}

export interface Computed<T> {
  readonly value: T;
}

export function ref<T>(initial: T): Ref<T> {
  let state = $state(initial);
  return {
    get value() {
      return state;
    }, 
    set value(current: T) {
      state = current;
    }
  }
}

export function computed<T>(fn: () => T): Computed<T> {
  const state = $derived.by(fn);
  return {
    get value() {
      return state;
    }
  }
}

export function readonly<T>(value: Ref<T>): Computed<T> {
  return {
    get value() {
      return value.value;
    }
  }
}

export function useListener<Key extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  event: Key,
  callback: (event: HTMLElementEventMap[Key] & { currentTarget: HTMLElement } | Event) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export function useListener<Key extends keyof HTMLElementEventMap>(
  element: Ref<HTMLElement | null>,
  event: Key,
  callback: (event: HTMLElementEventMap[Key] & { currentTarget: HTMLElement } | Event) => void,
  options?: boolean | AddEventListenerOptions
): void;

export function useListener<Key extends keyof HTMLElementEventMap>(
  element: Ref<HTMLElement | null> | HTMLElement,
  event: Key,
  callback: (event: HTMLElementEventMap[Key] & { currentTarget: HTMLElement } | Event) => void,
  options?: boolean | AddEventListenerOptions
): (() => void) | void {
  if (element instanceof HTMLElement) {
    element.addEventListener(event, callback, options);
    return () => {
      element.removeEventListener(event, callback, options);
    }
  } else {
    $effect(() => {
      if (element.value) {
        return useListener(element.value, event, callback, options);
      }
    });
  }
}