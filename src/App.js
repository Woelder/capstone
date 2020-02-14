import React from 'react';
import { withRouter } from "react-router-dom";
import Routes from './Utils/Routes';
import './App.css';

function App() {
  const childProps = {
      employeeInfo: "stuff"
  }
  return (
    <div className="App">
      <Routes childProps={childProps} />
    </div>
  );
}

export default withRouter(App);
