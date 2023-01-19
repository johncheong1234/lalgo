import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  const customAlgo = useSelector(state => state.customAlgo);

  return (
    console.log(customAlgo),
   <div>
      <input type="text" />
   </div>
  );
}

export default App;
