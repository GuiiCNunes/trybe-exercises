import { Component } from 'react';
import './App.css';


class App extends Component {
  
  constructor() {
    super()
    this.click1 = this.click1.bind(this);
    this.click2 = this.click2.bind(this);
    // this.click3 = this.click3.bind(this);

    this.state = {
      numbersOfClick1: 0,
      numbersOfClick2: 0,
      numbersOfClick3: 0,
    };
  }

  makeGreen(button) {
    document.getElementById(button).className = 'pairClick';
    console.log('green');
  }
  
  makeNoGreen(button) {
    document.getElementById(button).className = ''; 
    console.log('grey');
  }

  click1() {
    console.log(this);
    console.log('Kabum!');
    this.setState((oldState, _props) => {
      if (this.state.numbersOfClick1 % 2 !== 0) this.makeGreen('button1');
      else this.makeNoGreen('button1');
      return {
        numbersOfClick1: this.state.numbersOfClick1 + 1,
      }
    });    
  }
  click2() {
    console.log(this);
    console.log('Ratabum!!');
    this.setState((oldState, _props) => {
      if (this.state.numbersOfClick2 % 2 !== 0) this.makeGreen('button2');
      else this.makeNoGreen('button2');
      return {
        numbersOfClick2: this.state.numbersOfClick2 + 1,
      }
    });
  }
  click3() {
    console.log(this);
    console.log('Sacabum!!!');
  }  
  
  render() {
    return (
      <div>
        <button onClick={this.click1} id='button1'>{this.state.numbersOfClick1}</button>
        <button onClick={this.click2} id='button2'>{this.state.numbersOfClick2}</button>
        <button onClick={this.click3} id='button3'>Botão3</button>
      </div>
    );
  }
} 

export default App;
