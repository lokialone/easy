interface Iobserver {
    next: () => void;
}
interface IsubscribeFunc {
    (a: Iobserver): {unsubscribe: Function};
}
class Observable           {
    private _subscribe: IsubscribeFunc;
    constructor(subscribe: IsubscribeFunc) {
        this._subscribe = subscribe;
    }
    subscribe(observer: Iobserver):any {
        return this._subscribe(observer)
    }
    static timeout(time: number) {
        return new Observable((observer: Iobserver) => {
            let timer = setTimeout(() => {
                observer.next();
            }, time);
            return {
                unsubscribe() {
                    clearTimeout(timer);
                }
            }
        })
    }
}

let a = Observable.timeout(100);
a.subscribe({
    next: () => console.log('next')
});
a.subscribe({
    next: () => console.log('next1111')
});
// a.unsubscribe();

console.log('start');
