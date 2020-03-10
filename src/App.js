import React from "react";
import { withRouter } from "react-router-dom";

import Routes from './Utils/Routes';
import './App.css';
import * as firebase from 'firebase';





let setup = firebase.initializeApp(fbcon); // this is what you use for firebase functionality
//let fb = setup.database().ref('Groups/Group1/chat') 
function App() {

  const childProps = {
    fire: setup
  }

  return (
    <div className="App">
      <script src="/__/firebase/7.8.2/firebase-app.js"></script>
      <script src="/__/firebase/7.8.2/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>
      <main>
      <Routes childProps={childProps} />
      </main>
    </div>

  );
>>>>>>> 0e65d294d6fc0afb72ece3348909f1763c7f09bc
}

export default withRouter(App);
