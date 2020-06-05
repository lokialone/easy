// function createStore(reducer, initState) {
//     const callbacks = [];
//     let state = initState;
//     function dispatch(action) {
//         state = reducer(state, action);
//         callbacks.forEach((cb) => cb(state))
//     }

//     function getState(){
//         return state;
//     }

//     function subscribe(fn) {
//         callbacks.push(fn);
//     }
//     dispatch({type: Symbol()});

//     return {
//         dispatch,
//         getState,
//         subscribe
//     }
// }

// let state = {
//   counter: {
//     count: 0
//   },
//   info: {
//     name: '前端九部',
//     description: '我们都是前端爱好者！'
//   }
// }

// /*counterReducer, 一个子reducer*/
// /*注意：counterReducer 接收的 state 是 state.counter*/
// function counterReducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + 1
//       }
//     case 'DECREMENT':
//       return {
//         ...state,
//         count: state.count - 1
//       }
//     default:
//       return state;
//   }
// }


// function InfoReducer(state, action) {
//   switch (action.type) {
//     case 'SET_NAME':
//       return {
//         ...state,
//         name: action.name
//       }
//     case 'SET_DESCRIPTION':
//       return {
//         ...state,
//         description: action.description
//       }
//     default:
//       return state;
//   }
// }


// function combineReducers(reducers) {
//   /* reducerKeys = ['counter', 'info']*/
//   const reducerKeys = Object.keys(reducers)
//   /*返回合并后的新的reducer函数*/
//   return function combination(state = {}, action) {
//     /*生成的新的state*/
//     const nextState = {}
//     /*遍历执行所有的reducers，整合成为一个新的state*/
//     for (let i = 0; i < reducerKeys.length; i++) {
//       const key = reducerKeys[i]
//       const reducer = reducers[key]
//       /*之前的 key 的 state*/
//       const previousStateForKey = state[key]
//       /*执行 分 reducer，获得新的state*/
//       const nextStateForKey = reducer(previousStateForKey, action)
//       nextState[key] = nextStateForKey
//       console.log(nextState)
//     }
//     return nextState;
//   }
// }

// const reducer = combineReducers({
//   counter: counterReducer,
//   info: InfoReducer
// });


// const loggerMiddleware = (store) => (next) => (action) => {
//   console.log('this state', store.getState());
//   console.log('action', action);
//   next(action);
//   console.log('next state', store.getState());
// }
// const exceptionMiddleware = (store) => (next) => (action) => {
//   try {
//     next(action);
//   } catch (err) {
//     console.error('错误报告: ', err)
//   }
// }


// function applyMiddleware(store, ...middlewares) {
//     let dispatch = function (next) {
//         return () => next;
//     };
//     middlewares.forEach(middleware => {
//         console.log(middleware)
//         dispatch = dispatch(middleware(store));
        
//     });
//     store.dispatch = dispatch;
//     return store;
// }


// let initState = {
//   counter: {
//     count: 0
//   },
//   info: {
//     name: '前端九部',
//     description: '我们都是前端爱好者！'
//   }
// }
// // let store = createStore(reducer, initState);

// const storeBefore =  createStore(reducer, initState);
// const store  = applyMiddleware(storeBefore,loggerMiddleware,exceptionMiddleware);


// store.subscribe(() => {
//   let state = store.getState();
//   console.log(state.counter.count, state.info.name, state.info.description);
// });
// /*自增*/
// store.dispatch({
//   type: 'INCREMENT'
// });
// /*修改 name*/
// store.dispatch({
//   type: 'SET_NAME',
//   name: '前端九部2号'
// });


// function a(value){
//     return (next) =>{
//         console.log('aaaa', value);
//         next();
//     }
    
// }

// function b() {
//     return (next) =>{
//         console.log('bbb', 'before');
//         next();
//         console.log('bbb', 'after');
//     }
// }



// function c () {
//     return (next) =>{
//         console.log('ccc');
//         next();
//     }
// }

function next() {
    console.log('next');
}

function compose(...fns) {
    return (...args) => {
        // return fns[1](args)(next1);
        // console.log(d);
    }
    // return (...args) => {
    //     fns.forEach((fn) => {
            
    //         console.log(fn(...args)(dispatch));
    //     });
    //     return dispatch;
    // }
}
// a('')
// let d = compose(function(){console.log()}, b);
// d('store');


