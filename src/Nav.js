import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';

const Nav = () => {
    const logout = () => {
        auth.signOut()
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
            <a data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false" href="#">
                <img alt="" src="images/2.png"/>
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
                                    <a href="javascript:;">
                                        <i class="fa fa-glass"></i>
                                        <span>Extra</span>
                                    </a>

                                </li>
                                <li>
                                    <a style={{color:"white",cursor: "pointer"}} onClick={logout}>
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