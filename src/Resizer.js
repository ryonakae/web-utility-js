export default class Resizer {
  constructor() {
    this.windowHeight = 0;
    this.windowWidth = 0;
    this.functions = {};
    this.fps = 60;
    this.isResizing = false;
  }

  init() {
    this.update();

    window.addEventListener("resize", this.onResize.bind(this), false);
    window.addEventListener(
      "orientationchange",
      this.onResize.bind(this),
      false
    );
  }

  add(name, func) {
    this.functions[name] = func;
    this.update();
  }

  remove(name) {
    delete this.functions[name];
    this.update();
  }

  onResize() {
    if (this.isResizing) return;

    this.isResizing = true;

    if (window.requestAnimationFrame) {
      requestAnimationFrame(this.update.bind(this));
    } else {
      setTimeout(this.update.bind(this), 1000 / this.fps);
    }
  }

  update() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if (Object.keys(this.functions).length > 0) {
      for (const func in this.functions) {
        this.functions[func]();
      }
    }

    this.isResizing = false;
  }

  getWindowWidth() {
    return this.windowWidth;
  }

  getWindowHeight() {
    return this.windowHeight;
  }
}
