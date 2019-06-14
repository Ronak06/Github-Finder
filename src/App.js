import React from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default App;
