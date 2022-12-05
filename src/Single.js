import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db,storage,auth} from './firebase'
import Nav from './Nav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const Single = () => {
    const navigate  = useNavigate()
    const user = useParams()
    const [img, setImg] = useState('')
    const [data, setData] = useState("")
    const [show,setShow] = useState(true)
    const [editUpdate,setEditUpdate] = useState({
    aboutFamily: "",
    address: "",
    brother: "",
    sister: "",
    familyLive: "",
    fatherWork: "",
    motherWork: "",
    horoscope: "",
    manglik: "",
    about: "",
    email: "",
    income: "",
    displayName: "",
    maritalStatus: "",
    height: "",
    number: "",
    gender: "",
    birth: "",
    diet: "",
    work: "",
    qaulification: "",
    collage: "",
    family: "",
    city: "",
    state: "",
    religion: "",
    tounge: "",
    community: "",
    country: ""

    })

    function calculate_age(dob) {
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms);

      return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

    const handleChange = (e) => {
        setEditUpdate({...editUpdate,[e.target.name]:e.target.value})
       console.log(editUpdate);
    }
    

    useEffect(() => {
        db.collection("users").doc(user.id)
            .onSnapshot(snapshot => {
                setData(snapshot.data())
            })

    }, [])

    const uploadImg = async () => {
      const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`)
      try {
        const snap = await uploadBytes(imgRef, img)
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        await updateDoc(doc(db, "users",user.id), {
          image: url,
          avatarPath: snap.ref.fullPath
        })
        console.log(url)
      }
      catch (err) {
        console.log(err.message);
      }
    }

    const editData = () => {
        let text = "Reset Data";
        if (window.confirm(text) === true) {
            text = "You pressed OK!";
            db.doc(`users/${user.id}`).set({
                displayName: data.displayName, email: data.email, uid: data.uid,
                profile: data.profile, gender: data.gender, createdAt: data.createdAt, number: data.number,
                birth: data.birth, isOnline: true,
                about: "", aboutFamily: "", address: "", brother: "", sister: "", city: "", collage: "",
                community: "", country: "", family: "", familyLive: "", fatherWork: "", height: "", horoscope: "",
                income: "", manglik: "", maritalStatus: "", motherWork: "", qaulification: "", religion: "",
                state: "", tounge: "", work: ""
            })
        } else {
            text = "You canceled!";
        }
    }

    const deleteData = () => {
        let text = "Delete Data";
        if (window.confirm(text) === true) {
            text = "You pressed OK!";
            db.collection("users").doc(user.id).delete()
            navigate({pathname:"/"})
            toast.success('Data Delete Succefully!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
        } else {
            text = "You canceled!";
        }
    }

    const updateData = (data)=> {
    setShow(false)
    setEditUpdate(data)
    }

    const updateProfile = () => {
        db.collection("users").doc(user.id).update({
        aboutFamily:editUpdate.aboutFamily,
        address:editUpdate.address,
        brother:editUpdate.brother,
        sister:editUpdate.sister,
        familyLive:editUpdate.familyLive,
        fatherWork:editUpdate.fatherWork,
        motherWork:editUpdate.motherWork,
        horoscope: editUpdate.horoscope,
        manglik: editUpdate.manglik,
        about: editUpdate.about,
        email:editUpdate.email,
        income:editUpdate.income,
        displayName:editUpdate.displayName,
        maritalStatus:editUpdate.maritalStatus,
        height:editUpdate.height,
        number:editUpdate.number,
        gender:editUpdate.gender,
        birth:editUpdate.birth,
        diet: editUpdate.diet,
        work:editUpdate.work,
        qaulification:editUpdate.qaulification,
        collage:editUpdate.collage,
        family:editUpdate.family,
        city: editUpdate.city,
        state: editUpdate.state,
        religion:editUpdate.religion,
        tounge:editUpdate.tounge,
        community:editUpdate.community,
        country:editUpdate.country})
        uploadImg()
        toast.success('Data Update Succefully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setShow(true)

    }

    const handleImg = (e) => {
      setImg(e.target.files[0])
    }

    return (
        <>
            <Nav />
            <ToastContainer/>
            {show?
             <>
                <section id="main-content">
                <section class="wrapper">
                    <div class="student-profile py-4">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="card shadow-sm">
                                        <div class="card-header bg-transparent text-center">
                                            <img class="profile_img" src={data.image} alt="" />
                                            <h3>{data.displayName?.toUpperCase()} <e>{data.isOnline ? <span style={{ color: "red", fontSize: "50px" }}>.<span style={{ fontSize: "14px", color: "black", fontWeight: "400" }}>offline</span></span> : <span style={{ color: "#32936f", fontSize: "50px" }}>.<span style={{ fontSize: "14px", color: "black", fontWeight: "400" }}>online</span></span>}</e></h3>
                                        </div>
                                        <div class="card-body">
                                            <tr>
                                                <th width="30%">Profile For</th>
                                                <td width="2%">:</td>
                                                <td>{data.profile}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">User ID</th>
                                                <td width="2%">:</td>
                                                <td>{data.uid?.substr(0, 10).toUpperCase()}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Age</th>
                                                <td width="2%">:</td>
                                                <td>{calculate_age(new Date(data.birth))}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Manglik</th>
                                                <td width="2%">:</td>
                                                <td>{data.manglik}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">MaritalStatus</th>
                                                <td width="2%">:</td>
                                                <td>{data.maritalStatus}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Family</th>
                                                <td width="2%">:</td>
                                                <td>{data.family}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Date</th>
                                                <td width="2%">:</td>
                                                <td>{data.createdAt?.toDate().toString().substr(0, 21)}</td>
                                            </tr>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">About Your Self</strong></p>
                                            <p class="mb-0">{data.about}</p>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">About Your Family</strong></p>
                                            <p class="mb-0">{data.aboutFamily}</p>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">Live Family</strong></p>
                                            <p class="mb-0">{data.familyLive}</p>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">Father Occupation</strong></p>
                                            <p class="mb-0">{data.fatherWork}</p>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">Mother Occupation</strong></p>
                                            <p class="mb-0">{data.motherWork}</p>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">Brother</strong></p>
                                            <p class="mb-0">{data.brother}</p>
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-0"><strong class="pr-1">Sister</strong></p>
                                            <p class="mb-0">{data.sister}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-8">
                                    <div class="card shadow-sm">
                                        <div class="card-header card_h bg-transparent border-0">
                                            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
                                            <div>
                                            <button style={{ borderRadius: "24px", border: "1px solid #aeaeae" }} onClick={()=>updateData(data)}>Update Data</button>
                                            <button style={{ borderRadius: "24px", border: "1px solid #aeaeae" }} onClick={editData}>Reset Data</button>
                                            <button style={{ borderRadius: "24px", border: "1px solid #aeaeae" }} onClick={deleteData}>Delete User</button>
                                            </div>
                                        </div>
                                        <div class="card-body pt-0">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <th width="30%">Name</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.displayName}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Date Of Birth	</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.birth}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Gender</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.gender}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Height</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.height}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Email</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.email}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Number</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.number}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Religion</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.religion}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Mother Tounge</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.tounge}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Caste</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.community}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Country</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.country}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">State</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.state}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">City</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.city}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Address</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.address}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Qualification</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.qaulification}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Collage Of University</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.collage}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Occupation</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.work}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Income</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.income}</td>
                                                </tr>
                                                <tr>
                                                    <th width="30%">Horoscope</th>
                                                    <td width="2%">:</td>
                                                    <td>{data.horoscope}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="footer">
                    <div class="wthree-copyright">
                        <p>© 2017 Visitors. All rights reserved | Design by <a href="http://w3layouts.com">W3layouts</a></p>
                    </div>
                </div>
            </section>
            </>: 
            <>
            <section id="main-content">
                
        <section class="wrapper"> 
        <header class="panel-heading">
                    <h3>Update Profile </h3>
                  </header>
          <div class="form-w3layouts">
            <div class="row">
              <div class="col-lg-12">   
                <section class="panel">
                  <div class="panel-body">
                    <div class="form">
                      
                        <div className="row">
                          <div className="col-6">
                            
                            <div class="form-group ">
                              <label for="firstname" class="control-label">Full Name</label>
                              <div class="">
                                <input value={editUpdate.displayName} onChange={handleChange}  class="  form-control" id="firstname" name="displayName"  type="text"/>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Email</label>
                              <div class="">
                                <input value={editUpdate.email} onChange={handleChange} class=" form-control" id="lastname" name="email"  type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="username" class="control-label">Gender</label>
                              <div class="">
                                <input value={editUpdate.gender} onChange={handleChange} class="form-control " name="gender" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="confirm_password" class="control-label">University</label>
                              <div class="">
                                <input value={editUpdate.collage} onChange={handleChange} name="collage"  class="form-control "/>
                
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Caste</label>
                              <div class="">
                                <input value={editUpdate.community} onChange={handleChange} name="community"  class="form-control "/>
                                
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Family Type</label>
                              <div class="">
                                <input value={editUpdate.family} onChange={handleChange} name="family"  required class="form-control "/>
                                
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">FamilyLive</label>
                              <div class="">
                                <input value={editUpdate.familyLive} onChange={handleChange} name="familyLive" class="form-control" />
                                
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Height</label>
                              <div class="">
                                <input value={editUpdate.height} onChange={handleChange} name="height"  class="form-control "/>
                                  
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="confirm_password" class="control-label">Father Work</label>
                              <div class="">
                                <input value={editUpdate.fatherWork} onChange={handleChange} name="fatherWork" required class="form-control "/>
                                  
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Mother Work</label>
                              <div class="">
                                <input value={editUpdate.motherWork} onChange={handleChange} name="motherWork"  required class="form-control "/>
                                 
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Horoscope</label>
                              <div class="">
                                <input  value={editUpdate.horoscope} onChange={handleChange} name="horoscope"  required class="form-control "/>
                                 
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Income</label>
                              <div class="">
                                <input value={editUpdate.income} onChange={handleChange} name="income"  class="form-control "/>
                                  
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Manglik</label>
                              <div class="">
                                <input value={editUpdate.manglik} onChange={handleChange} name="manglik"  required class="form-control "/>
                                  
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">City</label>
                              <div class="">
                              <input value={editUpdate.city} onChange={handleChange} name="city"  class="form-control "/>
                                 
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">UpdateProfile</label>
                              <div class="">
                              <input name="file" onChange={handleImg} class=" form-control" id="lastname" type="file" />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div class="form-group ">
                              <label for="firstname" class="control-label">Date Of Birth</label>
                              <div class="">
                                <input value={editUpdate.birth} onChange={handleChange} class=" form-control" id="firstname" name="birth"  type="date" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Mobile Number</label>
                              <div class="">
                                <input value={editUpdate.number} onChange={handleChange} class=" form-control" id="lastname"  name="number" type="number" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="username" class="control-label">About</label>
                              <div class="">
                                <input value={editUpdate.about} onChange={handleChange} class="form-control "  id="username" name="about" type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="password" class="control-label">About Family</label>
                              <div class="">
                                <input value={editUpdate.aboutFamily} onChange={handleChange} class="form-control " id="password" name="aboutFamily"  type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="confirm_password" class="control-label">Address</label>
                              <div class="">
                                <input value={editUpdate.address} onChange={handleChange} class="form-control " id="confirm_password" name="address"  type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Brother</label>
                              <div class="">
                                <input value={editUpdate.brother} onChange={handleChange} name="brother"  required class="form-control "/>
                                 
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Sister</label>
                              <div class="">
                                <input value={editUpdate.sister} onChange={handleChange} name="sister"  required class="form-control "/>
                                  
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Country</label>
                              <div class="">
                                <input value={editUpdate.country} onChange={handleChange} name="country"  class="form-control "/>
                                  
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">State</label>
                              <div class="">
                                <input value={editUpdate.state} onChange={handleChange} name="state"  class="form-control "/>
                                 
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Marital Status</label>
                              <div class="">
                                <input value={editUpdate.maritalStatus} onChange={handleChange} name="maritalStatus" required class="form-control "/>
                                  
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Mother Tounge</label>
                              <div class="">
                                <input value={editUpdate.tounge} onChange={handleChange} name="tounge"  class="form-control "/>
                                  
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Occupation</label>
                              <div class="">
                                <input value={editUpdate.work} onChange={handleChange} name="work"  required class="form-control "/>
                                
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Religion</label>
                              <div class="">
                                <input value={editUpdate.religion} onChange={handleChange} name="religion"  class="form-control "/>
                                 
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Qualification</label>
                              <div class="">
                                <input value={editUpdate.qaulification} onChange={handleChange} name="qaulification"  class="form-control "/>
                                 
                                  
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Diet</label>
                              <div class="">
                                <input value={editUpdate.diet} onChange={handleChange} name="diet" class="form-control "/>
                                  
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label"></label>
                              <div class="">
                                <button class="btn btn-primary" onClick={updateProfile}>UpdateProfile</button>
                              </div>
                            </div>

                          </div>
                        </div>
                      
                    </div>
                  </div>
                </section>
              </div>
            </div>

          </div>
        </section>

        <div class="footer">
          <div class="wthree-copyright">
            <p>© 2022 Visitors. All rights reserved | Design by sumit jambharkar<a href="http://w3layouts.com">W3layouts</a></p>
          </div>
        </div>

            </section>
            </>
            }
        </>
    )
}

export default Single