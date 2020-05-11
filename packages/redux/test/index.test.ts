import { createStore, reduceReducers} from '../src/index';

function counter(state = 0, action:any ) {
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
  let store = createStore(counter)
  store.dispatch({ type: 'INCREMENT' });
  expect(store.getState()).toBe(1);
});

test('dispatch DECREMENT', () => {
  let store = createStore(counter)
  store.dispatch({ type: 'DECREMENT' });
  expect(store.getState()).toBe(-1);
});

test('subscribe times', () => {
  const store = createStore(counter)
  const myMock = jest.fn();
  store.subscribe(() => myMock());
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'INCREMENT' });
  expect(myMock.mock.calls.length).toBe(2);
  expect(store.getState()).toBe(2);
});

test('reduceReducers', () => {
  const initialState = { A: 0, B: 0 };

  const addReducer = (state: {A:number, B:number}, payload: number) => ({ ...state, A: state.A + payload });
  const multReducer = (state: {A:number, B:number}, payload: number) => ({ ...state, B: state.B * payload });

  const reducer = reduceReducers(initialState, addReducer, multReducer);

  const state = { A: 1, B: 2 };
  const payload = 3;
  expect(reducer(state, payload)).toStrictEqual({A: 4, B:6});
});

