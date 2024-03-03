
import './App.css';
import Register from './components/register/register'
import Login from './components/login/login'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Restaurant from './components/basics/Restaurant'

function App() {
  const [user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            user && user._id ? (
              <Restaurant setLoginUser={setLoginUser} />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )
          } />
          <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </Router>


    </div>
  );
}

export default App;
