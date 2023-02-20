import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import useAuth from '../src/context/useAuth'

const Nav = () => {
    const navigate = useNavigate()
    const { user, setName } = useAuth()
    const [noti, setNoti] = useState([])
    console.log(user.uid);

    const logout = () => {
        auth.signOut()
    }

    useEffect(() => {
        db.collection("supportLastMsge").onSnapshot((snapshot) => (
            setNoti(snapshot.docs.map((doc) => doc.data()))
        ))
    }, [])

    const notification = noti.filter((doc) => (doc.to === user.uid && doc.unread))
    console.log(notification);

    const GoProfile = () => {
        let person = prompt("Please enter your name");
        if (person != null) {
            navigate({ pathname: "/send-profile" })
            setName(person)
        }

    }


    return (
        <>
            <section id="container">
                <header class="header fixed-top clearfix">

                    <div class="brand">
                        <Link to="/" class="logo">
                            Admin
                        </Link>

                    </div>


                    <div class="top-nav clearfix">

                        <ul class="nav pull-right top-menu">

                            <li class="dropdown">
                               
                                <Link to="/chat" >Message{notification.length ? <button className="unread">{notification.length}</button> : null}</Link>
                                <a data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false" href="#">
                                    <img alt="" src="images/2.png" />
                                    <span class="username">{auth.currentUser.email}</span>
                                    <b class="caret"></b>
                                </a>

                                <ul class="dropdown-menu extended logout">
                                    <li><a href="#"><i class=" fa fa-suitcase"></i>Profile</a></li>
                                    <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                                    <li><a href="login.html"><i class="fa fa-key"></i> Log Out</a></li>
                                </ul>
                            </li>


                        </ul>

                    </div>
                </header>

                <aside>
                    <div id="sidebar" class="nav-collapse">

                        <div class="leftside-navigation">
                            <ul class="sidebar-menu" id="nav-accordion">
                                <li>
                                    <Link class="active" to="/">
                                        <i class="fa fa-dashboard"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                <li class="sub-menu">
                                    <Link to="/addprofile">
                                        <i class="fa fa-book"></i>
                                        <span>Add New Profile</span>
                                    </Link>

                                </li>

                                <li class="sub-menu">
                                    <Link to="/male">
                                        <i class="fa fa-envelope"></i>
                                        <span>Male</span>
                                    </Link>

                                </li>
                                <li class="sub-menu">
                                    <Link to="/female">
                                        <i class="fa fa-envelope"></i>
                                        <span>Female</span>
                                    </Link>

                                </li>
                                <li class="sub-menu">
                                    <Link to="/total">
                                        <i class=" fa fa-bar-chart-o"></i>
                                        <span>Total</span>
                                    </Link>

                                </li>
                                <li class="sub-menu">
                                    <Link to="/chat">
                                        <i class=" fa fa-bar-chart-o"></i>
                                        <span>Chat</span>
                                    </Link>

                                </li>
                                <li class="sub-menu">
                                    <a style={{ color: "white" }} onClick={GoProfile}>
                                        <i class=" fa fa-bar-chart-o"></i>
                                        <span>Send Profile</span>
                                    </a>

                                </li>
                                <li>
                                    <a style={{ color: "white", cursor: "pointer" }} onClick={logout}>
                                        <i class="fa fa-user"></i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>            </div>

                    </div>
                </aside>
            </section>
        </>
    )
}

export default Nav;