import React from "react";
import ReactDOM from "react-dom";

// import { App } from './components/App'

function App(props: number) {
  return <h1>Hello, TS</h1>;
}

App("");

ReactDOM.render(<App/>, document.getElementById("root"));
