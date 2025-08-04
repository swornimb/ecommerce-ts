import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {

  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        <Sidebar/>
        <div className='rounded w-full flex justify-between flex-wrap'>
          <Routes>
            <Route path='/' element={<MainContent/>}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
