import { Injectable, Provider} from '@angular/core';
import { provide } from '@angular/core';
import {unimplemented} from '@angular/core/src/facade/exceptions';

provide(Window, { useValue: window });

function _window(): Window {
  return window
}

export abstract class WINDOW {
  get nativeWindow(): Window {
    return unimplemented();
  }
}

class WindowRef_ extends WINDOW {
  constructor() {
    super();
  }
  get nativeWindow(): Window {
    return _window();
  }
}

export const WINDOW_PROVIDERS = [
  new Provider(WINDOW, { useClass: WindowRef_ }),
];
