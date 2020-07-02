const context = {};

function Delegate(proto, target) { 
    if (!(this instanceof Delegate)) return new Delegate(proto, target);
    this.proto = proto;
    this.target = target;
}

Delegate.prototype.getter = function(key) { 
    let target = this.target;
    this.proto.__defineGetter__(key, function() {  
        return this[target][key] 
    });
    return this;
}
Delegate.prototype.setter = function(key) {
     let target = this.target;
     this.proto.__defineSetter__(key, function(value) {  
        this[target][key] = value;
     });
     return this;
}

Delegate(context, 'request').getter('url').setter('url');
Delegate(context, 'response').getter('body').setter('body');
Delegate(context, 'response').getter('end');
module.exports = context;