import Utils from "../utilities/Utils";
import Resizer from "../utilities/Resizer";
import Scroller from "../utilities/Scroller";

// utils
const utils = new Utils();
utils.init();

new Promise(resolve => {
  console.log("1st promise");
  const msg = "promise!";
  setTimeout(() => {
    resolve(msg);
  }, 100);
})
  .then(value => {
    return new Promise(resolve => {
      console.log("2nd promise");
      setTimeout(() => {
        resolve(value);
      }, 100);
    });
  })
  .then(utils.waitPromise(2000))
  .then(value => {
    return new Promise(resolve => {
      console.log("3rd promise");
      setTimeout(() => {
        console.log(value);
      }, 100);
    });
  });

// resizer
const resizer = new Resizer();
resizer.init();

resizer.add("onResize", () => {
  console.log("resized");
});

// scroller
const scroller = new Scroller();
scroller.init();

scroller.add("onScroll", () => {
  console.log("scrolled");
});
