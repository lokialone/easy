// JSONP.js
let count = 1;
function insertScript(src) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(script);

}

function seriesParamters(data: object) : string {
  return Object.keys(data).reduce((acc, key) => {
    acc += `${key}=${encodeURIComponent(data[key])}&`;
    return acc;
  }, '');
}

const JSONP = (config) => {
    let { data, url, callback } = config;
    let time = Date.now();
    let functionName = `callback${count++}${time}`;
    let seriesData = seriesParamters(data);
    let sUrl = `${url}?${seriesData}callback=${functionName}`;
    
    window[functionName] = function( data:any) {
      callback(data);
      window[functionName] = undefined;
    }
    insertScript(sUrl);
}
export default JSONP;