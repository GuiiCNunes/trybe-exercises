import { Component } from 'react';
import './App.css';

const click1 = () => {
  console.log('Kabum!');
}
const click2 = () => {
  console.log('Ratabum!!');
}
const click3 = () => {
  console.log('Sacabum!!!');
}

class App extends Component {
  render() {
    return <div>
      <button onClick={click1}>Botão1</button>
      <button onClick={click2}>Botão2</button>
      <button onClick={click3}>Botão3</button>
      </div>
  }
} 

export default App;
