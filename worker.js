/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */

const arr = [];
onmessage = function (e) {
  const click = e.data;
  arr.push(click);
  if (arr.length > 4) {
    postMessage(arr);
    arr.length = 0;
  }
};
