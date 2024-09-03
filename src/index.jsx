/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Home from './pages/home'
import App from './pages/model'
import Feedback from './pages/feedback'
import About from './pages/about'
import FirstPost from './pages/first-post'
import Selector from './pages/selector'
import Criteria from './pages/criteriamodel'
import CriteriaSelector from './pages/selector2'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About/>}/>
                <Route path='/selector2' element={<CriteriaSelector/>}/>
                <Route path='/selector/model' element={<App/>}/>
                <Route path='/selector' element={<Selector/>}/>
                <Route path='/first-post' element={<FirstPost/>}/>
                <Route path='/selector2/criteria' element={<Criteria/>}/>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>,
)
