// JSONP.js
// let count = 1;
function insertScript(src, reject) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onerror = reject;
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

function seriesParamters(data: object) : string {
  return Object.keys(data).reduce((acc, key) => {
    acc += `${key}=${encodeURIComponent(data[key])}&`;
    return acc;
  }, '');
}

// const JSONP = (config) => {
//     let { data, url, callback } = config;
//     let time = Date.now();
//     let functionName = `callback${count++}${time}`;
//     let sUrl = '';
//     if (data) {
//       let seriesData = seriesParamters(data);
//       sUrl = `${url}?${seriesData}callback=${functionName}`;
//     } else {
//       sUrl = `${url}?callback=${functionName}`;
//     }
    
//     window[functionName] = function(data:any) {
//       callback(data);
//       window[functionName] = undefined;
//     }
//     insertScript(sUrl);
// }

const JSONP = (config) => () => new Promise((resolve, reject) => {
  let { data, url } = config;
    let time = Date.now();
    let functionName = `callback${time}`;
    let sUrl = '';
    if (data) {
      let seriesData = seriesParamters(data);
      sUrl = `${url}?${seriesData}callback=${functionName}`;
    } else {
      sUrl = `${url}?callback=${functionName}`;
    }
    
    window[functionName] = function(data:any) {
      resolve(data);
      window[functionName] = undefined;
    }
    insertScript(sUrl, reject);
})

export default JSONP;