
function createStore(reducer) {
    let _innerState;
    const subscribes = [];
    return {
        getState() {
            return _innerState;
        },
        subscribe(func) {
            subscribes.push(func);
        },
        dispatch(action){
            _innerState = reducer(_innerState, action);
            subscribes.forEach(func => func());
        }
    }
}

 function combineReducers(reducers) {
    return function (state= {}, action) {
        let newState = {};
        let hasChanged = false;
        Object.entries(reducers).forEach(([key, reducer]) => {
            newState[key] = reducer(state[key], action);
            hasChanged = hasChanged || newState[key] !== state
        });
        return hasChanged ? newState: state; 
    }
}

 function reduceReducers(initState, ...reducers) {
    return (state,payload) => {
        return reducers.reduce((newState, reducer) => {
            return reducer(newState, payload);
        }, state || initState,)
    }
}

module.exports = {
    createStore,
    combineReducers,
    reduceReducers
}
