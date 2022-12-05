import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import styled from 'styled-components';



const View = () => {

  const { profileId } = useParams();
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    db.collection("users")
      .doc(profileId)
      .onSnapshot((snapshot) => {
        setData(snapshot.data());
      });
  }, []);



 
  return (
    <>
     <Section2>

     <ProfileSection>
        <ImageSection>
          <CardImage>
            <img src={data.image}/>
          </CardImage>
          <ImageDetails>
            <h3 style={{ textTransform: 'capitalize' }}>{data.displayName}</h3>
            <hr></hr>
            <Section>
              <Firsts>
                <li>Gender</li>
                <li>Mobile Number</li>
                <li>Email</li>
                <li>Location</li>
              </Firsts>
              <Firsts>
              <li>{data.gender}</li>
              <li>{data.number}</li>
              <li>{data.email}</li>
              <li>Lives in {data.city}</li>
               </Firsts>
            </Section>

          </ImageDetails> 
        </ImageSection>
      </ProfileSection>
      <AllDetails>
        <Details className='container'>
          <h1 style={{marginTop:"15px"}}>Details of Profile</h1>
          <div class="fancy2"> <hr></hr></div>
          <Box>
            <h3>About</h3>
            <span>{data.about}</span>
          </Box><hr></hr>
          <Box>
            <h3>Basic Info</h3>
            <Agent>
              <First>
                <li>Gender :</li>
                <li>{data.gender}</li>
              </First>
              <First>
                <li>Date Of Birth :</li>
                <li>{data.birth}</li>

              </First>
            </Agent>
            <Agent>
              <First>
                <li>Religion :</li>
                <li>{data.religion}</li>
              </First>
              <First>
                <li>Mother Tounge :</li>
                <li>{data.tounge}</li>
              </First>
            </Agent>
            <Agent>
              <First>
                <li>Birth Location :</li>
                <li>{data.born_location}</li>
              </First>
              <First>
                <li>Birth Time :</li>
                <li>{data.born_time}</li>
              </First>
            </Agent>

          </Box>
          <hr></hr>
          <Box><h3>Lifestyle and Intrests</h3>
            <Agent>
              <First>
                <li>Eating Habit :</li>
                <li>{data.diet}</li>
              </First>
              <First>
                <li>Height :</li>
                <li>{data.height}</li>
              </First>
            </Agent>

          </Box>
          <hr></hr>
          <Box><h3>Education and profession</h3>
            <Agent>
              <First>
                <li>Qaulification :</li>
                <li>{data.qaulification}</li>
              </First>
              <First>
                <li>University :</li>
                <li>{data.collage}</li>
              </First>
            </Agent>

          </Box>
          <hr></hr>
          <Box><h3>Family Details</h3>
            <Agent>
              <First>
                <li>Live in Family :</li>
                <li>{data.family}</li>
              </First>
              <First>
                <li>Members :</li>
                <li>Not Specified</li>
              </First>
            </Agent>
          </Box>
          <hr></hr>
          <Box><h3>Location</h3>
            <Agent>
              <First>
                <li>Live in :</li>
                <li>{data.city}</li>
              </First>
              <First>
                <li>State :</li>
                <li>{data.state}</li>
              </First>
            </Agent>
          </Box>
          
        </Details>
      </AllDetails>

     </Section2>
      
     </>
  )
}

export default View;
const Section2 = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
width: 100%;

`

const ProfileSection = styled.div`
display:flex;
justify-content:center;
background-color:white;`
const ImageSection = styled.div`
display: flex;
justify-content:center;
flex-wrap:wrap;
`
const CardImage = styled.div`
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
background-color:#eee;
padding:12px;
margin:12px;
border: 1px solid #c2c2c2;

> img {
    width:200px;
}`
const ImageDetails = styled.div`
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
width:450px;
border: 1px solid #c2c2c2;
padding:12px;
background-color:#eee;
> h3 {
  font-size: 1.2rem;
    font-weight: bold;
    font-family: ui-serif;
    color:#564343;
}
> p {
  display:flex;
  justify-content:space-around;
  font-size: 15px;
  color: #666;
}
@media (max-width:600px) {
    width:230px;
  }
`
const Section = styled.div`
display:flex;
justify-content:space-around;`
const Firsts = styled.div`
> li {
  list-style:none;
  font-size:15px;
  color: #666;
  margin:4px;
}
> li > a {
  text-decoration: none;
  font-size: 15px;
  color: #666;
}`
const AllDetails = styled.div`
display:flex;

justify-content:start;
padding:30px;
background-color:white;`
const Details = styled.div`
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
background-color:#eee;
width: 100%;
border: 1px solid #c2c2c2;

>h1 {
  font-size: 1.8rem;
    font-weight: bold;
    font-family: auto;
    color:#FFA500;
}
@media (max-width:600px) {
    width:100%;
  }
> h1 {
  text-align:center;
}`
const Box = styled.div`
padding:24px;
>h3 {
  font-size: 1rem;
    font-weight: 600;
    font-family: auto;
}
`
const Agent = styled.div`
display:flex;
justify-content:space-around;
`
const First = styled.div`
display: flex;
padding-left:8px;
margin:4px;
> li {
  list-style:none;
  width:130px;
  font-size: 15px;
  color: #666;
  
}
`
const Second = styled.div`
width: 100%;
text-align: center;
> li{
  width: 33%; 
  display: flex;
  float: left;
  flex-direction: column;
  flex-direction: column;
 align-items: center;
 margin-top: 5px;
 > a button{
    width:60px;
    height:60px;
    border-radius:50%;
    line-height: 50px;
    color: #ffa500;
    font-size: 18px;
    border: 1px solid #ffa500;
  
    >.MuiSvgIcon-root {
  font-size:35px;
  color:#FFA500;
}
}
 

}
`