import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './context/useAuth';
import { db } from './firebase';
import Nav from './Nav';

const ChatUser = () => {
    const{ user }= useAuth()
    const navigate = useNavigate()
    const [showUser, setShowUser] = useState([])
    const [noti,setNoti] = useState([])
    
    console.log(noti);

    useEffect(() => {
        db.collection("supportUser").onSnapshot((snapshot) => {
            setShowUser(snapshot.docs.map((doc) => doc.data()))
        })
    }, [])
     
    const notification = noti.filter((doc)=>(doc?.to === user.uid && doc.unread))
    console.log(notification);
    
   

    useEffect(() => {
        db.collection("supportLastMsge").onSnapshot((snapshot)=>(
            setNoti(snapshot.docs.map((doc)=>doc.data()))
        ))
      }, [])

    const sendMessage = (uid) => {
        const id = user.uid > uid ? user.uid + uid : uid + user.uid
        db.collection("supportLastMsge").doc(id).update({unread: false })
        navigate({ pathname: `/chat/${uid}` })
    }

    return (
        <>
            <Nav  />
            <section id="main-content">
                <section class="wrapper"></section>
                <div class="panel-body">
                    <table class="table" ui-jq="footable" ui-options='{
        "paging": {
          "enabled": true
        },
        "filtering": {
          "enabled": true
        },
        "sorting": {
          "enabled": true
        }}'>
                        {showUser.map((doc,i)=>(
                           <>
                            <tbody key={i} onClick={()=>sendMessage(doc.uid)}>
                            <tr style={{display:"flex",justifyContent:"space-around",alignItems:"center",border:"1px solid black",cursor:"pointer"}}>
                                <td>
                                    <img style={{width:"50px",borderRadius:"50%",height:"50px"}} src={doc.image} alt='' />
                                
                                    
                                </td>
                                <td style={{color:"black"}}>{doc.displayName}</td>
                                {notification.filter
                                ((data)=>data?.form === doc.uid && data?.unread )
                                .map((data)=>(
                                    <>
                                    <button className='unread_mess'>New Message</button>
                                    </>
                                    
                                ))
                                
                                }
                                <td style={{color:"black"}}>{doc.createdAt?.toDate().toString()}</td>
                               
                            </tr>
                        </tbody>
                           </>
                        ))}
                
                    </table>
                </div>
                <div class="footer">
                    <div class="wthree-copyright">
                        <p>© 2022 Visitors. All rights reserved | Design by sumit jambharkar</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChatUser