import './App.css'
import Header from './components/header/Header'
import AllRoutes from './routes/AllRoutes'

function App() {
  return (
    <div className='background'>
      <div className='container'>
        <Header />
        <AllRoutes />
      </div>
    </div>
  )
}

export default App
