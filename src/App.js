import Home from './Home'
import './App.css';
import  { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import View from './View';
import AddProfile from './AddProfile'
import Login from './Login';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Male from './Male';
import Female from './Female';
import Single from './Single';
import Update from './Update';
import Total from './Total';


function App() {
  
  const [user,setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      
    });
  }, []);
  return (
    <> 
    <Router>
      <Routes>
        {!user ?
        <Route path='/' element={<Login/>}/>
        :
        <>
        <Route path='/' element={<Home/>}/>
        <Route path='/male' element={<Male/>}/>
        <Route path='/female' element={<Female/>}/>
        <Route path='/view/:profileId' element={<View/>}/>
        <Route path='/addprofile' element={<AddProfile/>}/>
        <Route path='/single/:id' element={<Single/>}/>
        <Route path='/total' element={<Total/>}/>
        </>
      }
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
