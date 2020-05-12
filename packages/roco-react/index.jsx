import React from './src/index';

class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }
  onClick = () => {
    this.setState(state => ({
      number: state.number + 1
    }))
  }
  render() {
    return (
      <div id="couter">
        <span>{this.state.number}</span>
        <button onClick={this.onClick}> + 1</button>
       <div>
        <span>{this.state.number}</span>
        <button onClick={this.onClick}> + 1</button>
        </div>
      </div>
    )
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {count: state.count + 1};
    default:
      return state;
  }
}

function FunctionCouter() {
  const [countState, dispatch] = React.useReducer(reducer, {count: 0});
  const [number, setNumber] = React.useState(10);
  return (
    <div>
      <div id="counter1">
        <span>{countState.count}</span>
        <button onClick={() => dispatch({type: 'ADD'})}>加1</button>
      </div>
      <div id="counter2">
        <span>{number}</span>
        <button onClick={() => setNumber(number+ 1)}>加1</button>
      </div>
    </div> 
  )
}

React.render(<FunctionCouter name="计数器"/>, document.getElementById('app'));




