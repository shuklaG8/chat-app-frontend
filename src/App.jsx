import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers, setAuthUser } from './redux/userSlice';
import axios from 'axios';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


const App = () => {
  const {authUser} = useSelector((store) => store.user);
  const {socket} = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && authUser.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authUser.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authUser]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          dispatch(setAuthUser(null));
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch]);

  useEffect(() => {
    if(authUser) {
      const socketio = io(`${import.meta.env.VITE_BASE_URL}`, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return() => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch]);

  return (
    <div className='p-4 h-screen items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App