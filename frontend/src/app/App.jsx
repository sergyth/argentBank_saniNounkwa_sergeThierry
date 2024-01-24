import Home from '../pages/Home';
import Signin from '../pages/signin';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../pages/Layout';
import User from '../pages/User';
import {store} from './store';
import { Provider } from 'react-redux';
import './app.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const App = () => {

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout/>,
   errorElement: <ErrorPage/>,
    children: [
      { 
        index: true, 
        element: <Home />, 
      },
      {
        path: '/user/login', 
        element: <Signin/>,
      },
     
    ],  
  },
  {
    path: '/user/profile', 
    element: <User/>,
  }

])

  return (
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
      
  );

  
}

export default App;
