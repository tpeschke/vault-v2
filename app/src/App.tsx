import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Header from './components/header/Header'
import { isUserLoggedOn, setUser } from './redux/slices/userSlice'
import AllRoutes from './routes/AllRoutes'
import { accessURL } from './frontend-config'
import { Tooltip } from 'react-tooltip'

function App() {
  const userIsLoggedIn = useSelector(isUserLoggedOn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userIsLoggedIn) {
      axios.get(accessURL + '/isLoggedIn').then(({ data }) => {
        dispatch(setUser(data))
      })
    }
  }, []);

  return (
    <div className='background'>
      <div className='container'>
        <Header />
        <AllRoutes />
        <Tooltip id="my-tooltip" place="bottom" />
      </div>
    </div>
  )
}

export default App
