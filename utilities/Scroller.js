"use strict";

const UAParser = require("ua-parser-js");

module.exports = class Scroller {
  constructor() {
    this.ua = null;

    this.scrollTop = 0;
    this.scrollBottom = 0;
    this.scrollAmount = 0;
    this.scrollDirection = null;
    this.touchStartY = 0;

    this.functions = {};
    this.fps = 60;
    this.isScrolling = false;
  }

  init() {
    const parser = new UAParser();
    this.ua = this.parser.getResult();
    this.update();

    window.addEventListener(
      "scroll",
      () => {
        this.onScroll();
      },
      false
    );

    if (this.ua.device.type === undefined) {
      window.addEventListener(
        "wheel",
        e => {
          this.onScroll(e);
        },
        false
      );
    } else {
      window.addEventListener(
        "touchstart",
        e => {
          this.onTouchstart(e);
        },
        false
      );
      window.addEventListener(
        "touchmove",
        e => {
          this.onScroll(e);
        },
        false
      );
    }
  }

  add(name, func) {
    this.functions[name] = func;
    this.update();
  }

  remove(name) {
    delete this.functions[name];
    this.update();
  }

  onScroll(event) {
    if (this.isScrolling) return;

    this.isScrolling = true;

    if (window.requestAnimationFrame) {
      requestAnimationFrame(() => {
        this.update(event);
      });
    } else {
      setTimeout(() => {
        this.update(event);
      }, 1000 / this.fps);
    }
  }

  onTouchstart(event) {
    this.touchStartY = event.changedTouches[0].pageY;
  }

  update(event) {
    this.scrollTop = window.pageYOffset;
    this.scrollBottom = this.getScrollTop() + window.innerHeight;

    if (event !== undefined) {
      if (this.ua.device.type === undefined) {
        this.scrollAmount = event.deltaY;
      } else {
        this.scrollAmount = this.touchStartY - event.changedTouches[0].pageY;
      }
    }

    if (this.getAmount() > 0) {
      this.scrollDirection = "down";
    } else if (this.getAmount() < 0) {
      this.scrollDirection = "up";
    }

    if (Object.keys(this.functions).length > 0) {
      for (const func in this.functions) {
        this.functions[func]();
      }
    }

    this.isScrolling = false;
  }

  getScrollTop() {
    return this.scrollTop;
  }

  getScrollBottom() {
    return this.scrollBottom;
  }

  getAmount() {
    return this.scrollAmount;
  }

  getDirection() {
    return this.scrollDirection;
  }
};
