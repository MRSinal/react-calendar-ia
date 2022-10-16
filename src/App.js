import './App.css';
import { React, useState, useEffect } from 'react'
import Login from './components/Login'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import MainPage from './components/main'
function App() {

  return (
    <>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/main' element={<MainPage />} />
            </Routes>
          </BrowserRouter>

        </div>
      </>

      );
}

export default App;
