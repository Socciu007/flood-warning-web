import React, { Fragment, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { route } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import * as UserService from "./services/UserService";
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, resetUser } from './redux/slices/userSlice';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true)
    const {storageData, decoded} = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token');
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem("refresh_token")
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken =  jwtDecode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDatailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }
  return (
    <div style={{height: '100vh'}}>
      <Loading isLoading={isLoading}>
      <Router>
        <Routes>
          {route.map((route) => {
            const Page = route.page
            const isCheckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return isCheckAuth && (
              <Route key={route.path} path={route.path} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
            )
          })}
        </Routes>
      </Router>
      </Loading>
    </div>
  )
}

export default App