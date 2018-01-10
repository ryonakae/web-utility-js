import Utils from "../utilities/Utils";
import ResizeManager from "../utilities/ResizeManager";
import ScrollManager from "../utilities/ScrollManager";

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
