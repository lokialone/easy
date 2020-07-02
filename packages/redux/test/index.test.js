const redux = require('../src/index');
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

test('dispatch INCREMENT', () => {
  let store = redux.createStore(counter)
  store.dispatch({ type: 'INCREMENT' });
  expect(store.getState()).toBe(1);
});

test('dispatch DECREMENT', () => {
  let store = redux.createStore(counter)
  store.dispatch({ type: 'DECREMENT' });
  expect(store.getState()).toBe(-1);
});

test('subscribe times', () => {
  const store = redux.createStore(counter)
  const myMock = jest.fn();
  store.subscribe(() => myMock());
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'INCREMENT' });
  expect(myMock.mock.calls.length).toBe(2);
  expect(store.getState()).toBe(2);
});

test('reduceReducers', () => {
  const initialState = { A: 0, B: 0 };

  const addReducer = (state, payload) => ({ ...state, A: state.A + payload });
  const multReducer = (state , payload) => ({ ...state, B: state.B * payload });

  const reducer = redux.reduceReducers(initialState, addReducer, multReducer);

  const state = { A: 1, B: 2 };
  const payload = 3;
  expect(reducer(state, payload)).toStrictEqual({A: 4, B:6});
});


test('combireReducers', () => {
 const reducer1 = function(state ={count: 0}, action) {
    switch (action.type) {
      case 'add' : {
        return {...state,count:state.count +1}
      };
      case 'minus': return  {...state,count:state.count -1};
      default:return state;
    }
 }

  const reducer2 = function(state ={count: 0}, action){
    switch (action.type) {
      case 'add1' :  return {...state, count:state.count +1};
      case 'minus2': return {...state, count:state.count -1};
      default: return state;
    }
 }

 const combine = redux.combineReducers({
   reducer1,
   reducer2
 });

  const store = redux.createStore(combine);
  store.dispatch({ type: 'add'});
  console.log(store.getState().reducer1.count)
  expect()


});


