import React, { useState } from "react";
import { auth, createUserCollecton, db, storage } from "./firebase";
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import Nav from "./Nav";
import { cas, cit, cou, edu, hei, inc, mot, rel, sta } from './data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProfile = () => {
  const navigate =useNavigate()
  const [img, setImg] = useState('')
  const [data, setData] = useState({
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
    password: "",
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
  });

  const handleChange = (e) => {
    console.log(data);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleImg = (e) => {
    setImg(e.target.files[0])
  }
  const register = async (e) => {
    console.log(data);
    e.preventDefault();
    const {
      aboutFamily,
      country,
      address,
      brother,
      sister,
      familyLive,
      fatherWork,
      motherWork,
      horoscope,
     manglik,
      about,
      email,
      income,
      password,
      displayName,
      maritalStatus,
      height,
      number,
      gender,
      birth,
      diet,
      work,
      qaulification,
      collage,
      family,
      city,
      state,
      religion,
      tounge,
      community
    } = data
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({
        displayName: displayName,
        phoneNumber: user.number,
        isOnline: true,
      });
      await createUserCollecton(user, {
        aboutFamily,
        address,
        country,
        brother,
        sister,
        familyLive,
        fatherWork,
        motherWork,
        horoscope,
        manglik,
        about,
        email,
        income,
        password,
        displayName,
        maritalStatus,
        height,
        number,
        gender,
        birth,
        diet,
        work,
        qaulification,
        collage,
        family,
        city,
        state,
        community,
        religion,
        tounge,
      });
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
      setData("")
      navigate({pathname:"/"})
    } catch (err) {
      console.log(err);
    }


  };
  const uploadImg = async () => {
    const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`)
    try {
      const snap = await uploadBytes(imgRef, img)
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        image: url,
        avatarPath: snap.ref.fullPath
      })
      console.log(url)
    }
    catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <Nav />
      <ToastContainer/>
      <section id="main-content">
        <section class="wrapper">
          <div class="form-w3layouts">
            <div class="row">
              <div class="col-lg-12">
                <section class="panel">
                  <header class="panel-heading">
                    Create New Profile
                    <span class="tools pull-right">
                      <a class="fa fa-chevron-down" href="javascript:;"></a>
                      <a class="fa fa-cog" href="javascript:;"></a>
                      <a class="fa fa-times" href="javascript:;"></a>
                    </span>
                  </header>
                  <div class="panel-body">
                    <div class="form">
                      <form onSubmit={register} class="cmxform form-horizontal " id="signupForm">
                        <div className="row">
                          <div className="col-6">
                            <div class="form-group ">
                              <label for="firstname" class="control-label">Full Name</label>
                              <div class="">
                                <input class=" form-control" id="firstname" name="displayName" value={data.displayName} onChange={handleChange} type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Email</label>
                              <div class="">
                                <input class=" form-control" id="lastname" name="email" value={data.email} onChange={handleChange} type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="username" class="control-label">Gender</label>
                              <div class="">
                                <select class="form-control " name="gender" value={data.gender} onChange={handleChange}>
                                  <option value="" >Select</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="password" class="control-label">Password</label>
                              <div class="">
                                <input class="form-control " id="password" name="password" value={data.password} onChange={handleChange} type="password" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="confirm_password" class="control-label">University</label>
                              <div class="">
                                <select name="collage" value={data.collage} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {sta.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Caste</label>
                              <div class="">
                                <select name="community" value={data.community} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {cas.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Family Type</label>
                              <div class="">
                                <select name="family" value={data.family} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Joint Family</option>
                                  <option>Nuclear Family</option>
                                  <option>Other</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">FamilyLive</label>
                              <div class="">
                                <select class="form-control " name="familyLive" value={data.familyLive} onChange={handleChange}>
                                  <option>Select</option>
                                  {sta.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Height</label>
                              <div class="">
                                <select name="height" value={data.height} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {hei.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="confirm_password" class="control-label">Father Work</label>
                              <div class="">
                                <select name="fatherWork" value={data.fatherWork} onChange={handleChange} required class="form-control " >
                                  <option value="" disabled>Select</option>
                                  <option>Business/Enterprenur</option>
                                  <option>Service/Private</option>
                                  <option>Service/Govt/PSU</option>
                                  <option>Army/Armed Forces</option>
                                  <option>Civil Services</option>
                                  <option>Retired</option>
                                  <option>Not Employed</option>
                                  <option>Expired</option>
                                  <option>Other</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Mother Work</label>
                              <div class="">
                                <select name="motherWork" value={data.motherWork} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Housewife</option>
                                  <option>Business/Enterprenur</option>
                                  <option>Service-private</option>
                                  <option>Service Govt/PSU</option>
                                  <option>Army/Armed Forces</option>
                                  <option>Civil Services</option>
                                  <option>Retired</option>
                                  <option>Not Employed</option>
                                  <option>Expired</option>
                                  <option>Teacher</option>
                                  <option>Other</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Horoscope</label>
                              <div class="">
                                <select name="horoscope" value={data.horoscope} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Income</label>
                              <div class="">
                                <select name="income" value={data.income} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {inc.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Manglik</label>
                              <div class="">
                                <select name="manglik" value={data.manglik} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Manglik</option>
                                  <option>Non-Manglik</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">City</label>
                              <div class="">
                              <select name="city" value={data.city} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {cit.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
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
                                <input class=" form-control" id="firstname" name="birth" value={data.birth} onChange={handleChange} type="date" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Mobile Number</label>
                              <div class="">
                                <input class=" form-control" id="lastname" value={data.number} onChange={handleChange} name="number" type="number" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="username" class="control-label">About</label>
                              <div class="">
                                <input class="form-control " value={data.about} onChange={handleChange} id="username" name="about" type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="password" class="control-label">About Family</label>
                              <div class="">
                                <input class="form-control " id="password" name="aboutFamily" onChange={handleChange} value={data.aboutFamily} type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="confirm_password" class="control-label">Address</label>
                              <div class="">
                                <input class="form-control " id="confirm_password" name="address" onChange={handleChange} value={data.address} type="text" />
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Brother</label>
                              <div class="">
                                <select name="brother" value={data.brother} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3+</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Sister</label>
                              <div class="">
                                <select name="sister" value={data.sister} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3+</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Country</label>
                              <div class="">
                                <select name="country" value={data.country} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {cou.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">State</label>
                              <div class="">
                                <select name="state" value={data.state} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {sta.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Marital Status</label>
                              <div class="">
                                <select name="maritalStatus" value={data.maritalStatus} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Married</option>
                                  <option>Never Married</option>
                                  <option>Divorce</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Mother Tounge</label>
                              <div class="">
                                <select name="tounge" value={data.tounge} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {mot.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Occupation</label>
                              <div class="">
                                <select name="work" value={data.work} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Private Sector</option>
                                  <option>Govt/Public Sector</option>
                                  <option>Defense</option>
                                  <option>Business/Self Employee</option>
                                  <option>Looking For Job</option>
                                  <option>Not Working</option>
                                  <option>Retired</option>
                                  <option>Student</option>
                                </select>
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="lastname" class="control-label">Religion</label>
                              <div class="">
                                <select name="religion" value={data.religion} onChange={handleChange} class="form-control ">
                                  <option>Select</option>
                                  {rel.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label">Qualification</label>
                              <div class="">
                                <select name="qaulification" value={data.qaulification} onChange={handleChange} class="form-control ">
                                 
                                  {edu.map((doc) => (
                                    <option>{doc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="email" class="control-label">Diet</label>
                              <div class="">
                                <select name="diet"  value={data.diet} onChange={handleChange} required class="form-control ">
                                  <option value="" disabled>Select</option>
                                  <option>Veg</option>
                                  <option>Non-Veg</option>
                                  <option>Veg - Non-Veg</option>
                                  
                                </select>
                              </div>
                            </div>
                            <div class="form-group ">
                              <label for="lastname" class="control-label"></label>
                              <div class="">
                                <button class="btn btn-primary" type="submit">Register</button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
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
  );
};

export default AddProfile;
