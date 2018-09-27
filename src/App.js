
import React, { Component } from 'react';
import './App.css';
import emoji from './components/images/emoji-tongue.png'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <img src={emoji} className="App-logo" alt="logo" />
          <h1 className="App-title">Meme-otional</h1>
        </header>
      </div>
    );
  }
}

export default App
