import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { gsap, CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin);

ReactDOM.render(

  <App />
  ,
  document.getElementById('root')
);
