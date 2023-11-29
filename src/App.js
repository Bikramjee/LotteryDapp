
import './App.css';
import {Routes,Route } from 'react-router-dom';
import { Navbar } from './Components/NavBar';
import  Home  from './Components/Home';
import  PickWinner  from './Components/PickWinner';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='PickWinner' element={<PickWinner/>} />
    </Routes>
    </>
  );
}

export default App;
