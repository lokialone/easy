const response = {
    _body: '',
    get body(){
        return this._body;
    },
    set body(val){
        this._body = val;
    },
    get end() {
        return this.res.end;
    }
}

module.exports = response;