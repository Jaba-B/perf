var arr=[];onmessage=function(a){var r=a.data;arr.push(r),arr.length>4&&(postMessage(arr),console.log("5x is sent back"),arr.length=0)};