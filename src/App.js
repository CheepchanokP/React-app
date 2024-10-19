
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Prediction from './pages/Prediction';
import Ports from './pages/Ports';
import Market from './pages/Market';
import SignUp from './pages/Signup';



function App  ()  {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index  element={<Home/>}/>
          <Route path='ports' element={<Ports/>}/>
          <Route path='market' element={<Market/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='prediction' element={<Prediction/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
    
    </div>
  );
}

export default App;
