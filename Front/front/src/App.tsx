import { useState } from 'react'
import './App.css'
import TableModule from './modules/user/UserList'
import UserForm from './modules/user/UserForm'
import { Button } from 'antd'
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/table">Table</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/table" element={<TableModule />} />
      </Routes>
    </Router>
  )
}

export default App
