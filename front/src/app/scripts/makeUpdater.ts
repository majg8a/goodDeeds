import { WritableSignal } from '@angular/core';

export const makeUpdater =
  <T>(sg: WritableSignal<T>) =>
  <K extends keyof T>(prop: K, value: T[K]) =>
    sg.update((obj) => ({
      ...obj,
      [prop]: value,
    }));
