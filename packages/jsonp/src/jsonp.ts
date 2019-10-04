// JSONP.js
let count = 1;
function insertScript(src) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(script);

}

const JSONP = (config) => {
    let { data, url, callback } = config;
    let functionName = `callback${count++}`;
    let sUrl = `${url}?callback=${functionName}`;
    window[functionName] = function( data:any) {
      callback(data);
    }
    insertScript(sUrl);
}
export default JSONP;