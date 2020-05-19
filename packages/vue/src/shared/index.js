export function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}

export function isObject(val) {
    return typeof val === 'object' && val !== null;
}
