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
import Total from './Total';
import Chat from './Chat';
import ChatUser from './ChatUser';
import SendProfile from './SendProfile';


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
        <Route path='/chat' element={<ChatUser/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='/send-profile' element={<SendProfile/>}/>
        </>
      }
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
