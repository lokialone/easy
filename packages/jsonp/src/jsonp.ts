// JSONP.js
function insertScript(src: string, reject: Function) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onerror = (error) => {
    reject(error);
  };
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

function seriesParamters(data: any) : string {
  return Object.keys(data).reduce((acc, key) => {
    acc += `${key}=${encodeURIComponent(data[key])}&`;
    return acc;
  }, '');
}

const JSONP = (config: {
  data?: any,
  url: string
}) => () => new Promise((resolve, reject) => {
  let { data, url } = config;
    let functionName: string = `callback${Date.now()}`;
    let sUrl = '';
    if (data) {
      let seriesData = seriesParamters(data);
      sUrl = `${url}?${seriesData}callback=${functionName}`;
    } else {
      sUrl = `${url}?callback=${functionName}`;
    }

    (window as any)[functionName] = function(data:any) {
      resolve(data);
      (window as any)[functionName] = undefined;
    }
    insertScript(sUrl, reject);
})

export default JSONP;