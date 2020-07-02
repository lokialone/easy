const url = require('url');
const request = {
    get url() { 
        return this.req.url;
    },
    set url (val) {
        this.req.url = val;
    },
    get path() {
        return url.parse(this.req.url).pathname;
    }
}

module.exports = request;