import Chart from './Chart';
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    const [data, setData] = useState([])


    useEffect(() => {
        db.collection("users")
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
                setData(snapshot.docs.map((doc) => doc.data()))
            })

    }, [])

    function calculate_age(dob) {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    const maleCall = () => {
        navigate({ pathname: "/male" })
    }
    const femaleCall = () => {
        navigate({ pathname: "/female" })
    }
    const totalCall = () => {
        navigate({ pathname: "/total" })
    }

    const male = data.filter((doc) => (doc.gender === "Male"))
    const female = data.filter((doc) => (doc.gender === "Female"))
    const date = new Date().toJSON().slice(0, 10);

    const today = data.filter((doc) => new Date(doc.createdAt?.toDate()).toJSON().slice(0, 10) === date)

    const getUser = (uid) => {
        navigate({ pathname: `/single/${uid}` })
    }

    return (
        <>
            <Nav />
            <section id="main-content">
                <section class="wrapper">

                    <div class="market-updates">
                        <div class="col-md-3 market-update-gd">
                            <div class="market-update-block clr-block-2">
                                <div class="col-md-4 market-update-right">
                                <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div onClick={totalCall} class="col-md-8 market-update-left">
                                    <h4>Total User</h4>
                                    <h3>{data.length}</h3>
                                    <p>Other hand, we denounce</p>
                                </div>
                                <div class="clearfix"> </div>
                            </div>
                        </div>
                        <div class="col-md-3 market-update-gd">
                            <div class="market-update-block clr-block-1">
                                <div class="col-md-4 market-update-right">
                                    <i class="fa fa-users" ></i>
                                </div>
                                <div onClick={maleCall} class="col-md-8 market-update-left">
                                    <h4>Male</h4>
                                    <h3>{male.length}</h3>
                                    <p>Other hand, we denounce</p>
                                </div>
                                <div class="clearfix"> </div>
                            </div>
                        </div>
                        <div class="col-md-3 market-update-gd">
                            <div class="market-update-block clr-block-3">
                                <div class="col-md-4 market-update-right">
                                    <i class="fa fa-users"></i>
                                </div>
                                <div onClick={femaleCall} class="col-md-8 market-update-left">
                                    <h4>Female</h4>
                                    <h3>{female.length}</h3>
                                    <p>Other hand, we denounce</p>
                                </div>
                                <div class="clearfix"> </div>
                            </div>
                        </div>
                        <div class="col-md-3 market-update-gd">
                            <div class="market-update-block clr-block-4">
                                <div class="col-md-4 market-update-right">
                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                </div>
                                <div class="col-md-8 market-update-left">
                                    <h4>Today</h4>
                                    <h3>{today.length}</h3>
                                    <p>Other hand, we denounce</p>
                                </div>
                                <div class="clearfix"> </div>
                            </div>
                        </div>
                        <div class="clearfix"> </div>
                    </div>

                    <div class="row">
                        <div class="panel-body">
                            <div class="col-md-12 w3ls-graph">

                                <div class="agileinfo-grap">
                                    <div class="agileits-box">
                                        <header class="agileits-box-header clearfix">
                                            <h3>Visitor Statistics</h3>
                                            <div class="toolbar">
                                                <Chart />

                                            </div>
                                        </header>
                                        <div class="agileits-box-body clearfix">
                                            <div id="hero-area"></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="panel-body">
                            <div class="col-md-12 w3ls-graph">

                                <div class="agileinfo-grap">
                                    <div class="agileits-box">
                                        <header class="agileits-box-header clearfix">
                                            <h3>Today Users({today.length})</h3>
                                            <div class="row">

                                                {today.map((doc) => (
                                                    <div class="col-lg-4">
                                                        <div class="card shadow-sm">
                                                            <div class="card-header bg-transparent text-center">
                                                                <img class="profile_img" src={doc.image} alt="" />
                                                                <h3>{doc.displayName}</h3>
                                                            </div>
                                                            <div class="card-body">

                                                                <tr>
                                                                    <th width="30%">User ID</th>
                                                                    <td width="2%">:</td>
                                                                    <td>{doc.uid?.substr(0, 10).toUpperCase()}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th width="30%">Age</th>
                                                                    <td width="2%">:</td>
                                                                    <td>{calculate_age(new Date(doc.birth))}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th width="30%">Gender</th>
                                                                    <td width="2%">:</td>
                                                                    <td>{doc.gender}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th width="30%">Location</th>
                                                                    <td width="2%">:</td>
                                                                    <td>{doc.city}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th width="30%">Number</th>
                                                                    <td width="2%">:</td>
                                                                    <td>{doc.number}</td>
                                                                </tr>
                                                                <button onClick={() => getUser(doc.uid)} style={{ width: "100%", padding: "2px", borderRadius: "12px", background: '#8b5c7e', color: "white", border: "1px solid #aeaeae" }}>Button</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </header>
                                        <div class="agileits-box-body clearfix">
                                            <div id="hero-area"></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </section>
                <div class="footer">
          <div class="wthree-copyright">
            <p>© 2022 Visitors. All rights reserved | Design by sumit jambharkar</p>
          </div>
    </div>
            </section>

        </>
    )
}

export default Home