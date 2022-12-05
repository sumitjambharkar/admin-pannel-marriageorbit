import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from './firebase'
import Nav from './Nav'

const Total = () => {
    const navigate =  useNavigate()
    const [data, setData] = useState([])
    const [search,setSearch] = useState("")

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
    
    const getUser = (uid) => {
        navigate({ pathname: `/single/${uid}` })
    }

  return (
    <>
    <Nav/>
    <section id="main-content">
                <section class="wrapper"></section>
                            <div class="panel-body">
                            <div class="col-md-12 w3ls-graph">

                                <div class="agileinfo-grap">
                                    <div class="agileits-box">
                                        <header class="agileits-box-header clearfix">
                                            
                                            <h3>Total Users({data.length}) <input value={search}
                                onChange={(e) => setSearch(e.target.value)} type="text" class=" search" placeholder=" Search"/></h3>
                                            <div class="row">

                                                {data
                                                .filter(
                                                    (doc) =>
                                                        doc.displayName
                                                            .toLowerCase()
                                                            .indexOf(search.toLowerCase()) !== -1
                                                )
                                                .map((doc) => (
                                                    <div class="col-lg-4 mt-4">
                                                        <div class="card shadow-sm">
                                                            <div class="card-header bg-transparent text-center">
                                                                <img class="profile_img" src={doc.image} />
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
                                                                <tr>
                                                                    <th width="30%">Date</th>
                                                                    <td width="2%">:</td>
                                                                    <td>{doc.createdAt?.toDate().toString().substr(0, 21)}</td>
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
                        <div class="footer">
          <div class="wthree-copyright">
            <p>© 2022 Visitors. All rights reserved | Design by sumit jambharkar</p>
          </div>
    </div>
    </section>
                        
    </>
  )
}

export default Total