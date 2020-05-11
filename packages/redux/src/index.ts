export interface ReducerAction {
    type: string, 
    payload?: any
}
export function createStore<T>(reducer: (state: T, action: ReducerAction) => T) {
    let _innerState = reducer((null) as any, {type: ''});
    const subscribes: Function[] = [];
    return {
        getState() {
            return _innerState;
        },
        subscribe(func: Function) {
            subscribes.push(func);
        },
        dispatch(action:ReducerAction){
            _innerState = reducer(_innerState, action);
            subscribes.forEach(func => func());
        }
    }
}

export function combineReducers<T>(reducers: { [key: string]: (state: T, action: ReducerAction) => T}) {

    // Object.keys(reducers).reduce((state, key) => {
    //     // return state[key] = reducers[key]();
    // }, {});

}

export function reduceReducers<T>(initState: T, ...reducers: ((state: T, payload: any) => T)[]) {
    return (state: T,payload: any) => {
        return reducers.reduce((newState, reducer) => {
            return reducer(newState, payload);
        }, state || initState,)
    }
}
