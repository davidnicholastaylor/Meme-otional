
import React, { Component } from 'react';
import './App.css';
import emoji from './components/images/emoji-tongue.png'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Memeotional</h1>
          <img src={emoji} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App
