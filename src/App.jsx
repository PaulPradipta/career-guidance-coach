import React from 'react'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Signin from './components/Signin'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App