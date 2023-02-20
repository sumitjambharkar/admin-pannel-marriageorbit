import React,{useState,useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';
import useAuth from './context/useAuth';
import { db } from './firebase';
import Nav from './Nav';

const Chat = () => {
    const Id = useParams()
    const {user} =  useAuth()
    const user1 = user.uid
    const user2 = Id.id
    const [chat,setChat] = useState([])
    const [text,setText] = useState("")
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);
    
    const sendMessage = (e) => {
        e.preventDefault()
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        db.collection("supportChat").doc(id).collection("chat").add({
            text:text,
            createdAt:new Date(),
            form:user1,
            to:user2

        })
        db.collection("supportLastMsge").doc(id).set({
            text:text,
            createdAt:new Date(),
            unread: true,
            form:user1,
            to:user2
        })
        setText("")
    }

    console.log(chat);

    useEffect(() => {
     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      db.collection("supportChat").doc(id).collection("chat").orderBy("createdAt", "asc")
      .onSnapshot((snapshot)=>(
        setChat(snapshot.docs.map((doc)=>doc.data()))
      ))
    },[])
    
    return (
        <>
            <Nav />
            <section id="main-content">
                <section className="wrapper">
                    <div className="form-w3layouts">
                        <div className="row">
                            <section className="msger">
                                <header className="msger-header">
                                    <div className="msger-header-title">
                                        <i className="fas fa-comment-alt"></i> SimpleChat
                                    </div>
                                    <div className="msger-header-options">
                                        <span><i className="fas fa-cog"></i></span>
                                    </div>
                                </header>

                                <main className="msger-chat">
                                    {chat.map((doc,i)=>(
                                        <div ref={scrollRef} key={i} className={`${user1===doc.to? "msg left-msg":"msg right-msg"}`}>
                                        <div
                                            className="msg-img"

                                        ></div>

                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                                {user1===doc.to? <div className="msg-info-name">Customer</div>:<div className="msg-info-name">Me</div> }
                                                <div className="msg-info-time">{doc.createdAt?.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
                                            </div>

                                            <div className="msg-text">
                                                {doc.text}
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                    
                                </main>
                                

                                <form onSubmit={sendMessage} className="msger-inputarea">
                                    <input value={text} onChange={(e)=>setText(e.target.value)} type="text" className="msger-input" placeholder="Enter your message..." />
                                    <button type="submit" className="msger-send-btn">Send</button>
                                </form>
                            </section>
                        </div>

                    </div>
                </section>

                <div className="footer">
                    <div className="wthree-copyright">
                        <p>© 2022 Visitors. All rights reserved | Design by sumit jambharkar</p>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Chat