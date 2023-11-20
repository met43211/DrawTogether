import React from 'react'
import Canvas from './components/Canvas'
import SettingBar from './components/Settingbar'
import Toolbar from './components/Toolbar'
import './styles/app.scss'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/:id' element={
            <React.Fragment>
              <Toolbar/>
              <SettingBar/>
              <Canvas/>
            </React.Fragment>}/>
          <Route
              path="*"
              element={<Navigate to={`f${(+new Date).toString(16)}`} replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
