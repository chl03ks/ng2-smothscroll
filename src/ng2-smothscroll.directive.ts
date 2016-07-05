import { Directive, Input } from '@angular/core';

import { WINDOW } from './window.service';

@Directive({
  selector: '[smothscroll]'
})
export class DirectiveNameDirective {
  public win: Window;
  public things = new Array(200);

  @Input() smothScroll: string;

  constructor(private _win: WINDOW){
    this.win = _win.nativeWindow;
  }

   public Scroll() {
    let startY = this.currentYPosition();
    let stopY = this.elmYPosition(this.smothScroll);

    let distance = stopY > startY ? stopY - startY : startY - stopY;

    if (distance < 100) {
      this.win.window.scrollTo(0, stopY); return;
    }

    let speed = Math.round(distance / 100);

    if (speed >= 20) speed = 20;

    let step = Math.round(distance / 100);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;

    if (stopY > startY) {
      for (let i = startY; i < stopY; i += step) {
        this.scrollTo(leapY, timer * speed);
        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
    }

    for (let i = startY; i > stopY; i -= step) {
      this.scrollTo(leapY, timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }

  }

  public scrollTo(yPoint: number, duration: number) {
    setTimeout(() => {
      this.win.window.scrollTo(0, yPoint);
    }, duration);
    return;
  }

  currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  elmYPosition(smothScroll: any) {
    let elm = document.getElementById(this.smothScroll);
    let y = elm.offsetTop;
    let node: any = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    } return y;
  }

}
