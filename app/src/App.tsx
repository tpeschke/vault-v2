import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Header from './components/header/Header'
import { isUserLoggedOn, setUser } from './redux/slices/userSlice'
import AllRoutes from './routes/AllRoutes'
import { accessURL } from './frontend-config'
import { Tooltip } from 'react-tooltip'
import LocationHook from './hooks/LocationHook'
import Footer from './components/footer/Footer'

function App() {
  const { pathname } = LocationHook()

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
        <AllRoutes pathname={pathname} />
        <Tooltip id="my-tooltip" place="bottom" />
        <Footer />
      </div>
    </div>
  )
}

export default App
