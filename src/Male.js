import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from './firebase'
import Nav from './Nav'

const Male = () => {
    
    const navigate = useNavigate()
    const [data, setData] = useState([])
   const [search,setSearch] = useState("")
    useEffect(() => {
        db.collection("users")
        .orderBy("createdAt","desc")
        .onSnapshot(snapshot=>{
          setData(snapshot.docs.map((doc)=>doc.data()))
        })

    }, [])
    const male = data.filter((doc)=>doc.gender==="Male")
    
    const getUser = (doc)=> {
        navigate({pathname:`/single/${doc.uid}`})
        
   }

  return (
    <>
    <Nav/>
    <section id="main-content">
	<section class="wrapper">
		<div class="table-agile-info">
 <div class="panel panel-default">
    <div class="panel-heading">
    <h3>Male table({male.length})<input value={search}
    onChange={(e) => setSearch(e.target.value)} type="text" class=" search" placeholder=" Search"/></h3>
    </div>
    <div>
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
        <thead>
          <tr>
            <th data-breakpoints="xs">ID</th>
            <th data-breakpoints="xs">Photo</th>
            <th data-breakpoints="xs">Full Name</th>
            <th data-breakpoints="xs">Contact Number</th>
            <th data-breakpoints="xs">Location</th>
            
            <th data-breakpoints="xs">Date</th>
          </tr>
        </thead>
        <tbody>
          {male
          .filter(
            (doc) =>
                doc.displayName
                    .toLowerCase()
                    .indexOf(search.toLowerCase()) !== -1
        )
          .map((doc,i)=>(
            <>
            <tr onClick={()=>getUser(doc)} style={{lineHeight:"50px",cursor:"pointer"}} data-expanded="true">
            <td>{i+1}</td>
            <td>{doc.image?<img style={{width:"50px",borderRadius:"50%",height:"50px"}} src={doc.image}/>:
            <img style={{width:"50px",borderRadius:"50%",height:"50px"}} src="https://img.icons8.com/fluency/48/null/person-male.png"/>}
            </td>
            <td>{doc.displayName}</td>
            <td>{doc.number}</td>
            <td>{doc.city}</td>
            <td>{doc.createdAt.toDate().toString().substr(0,21)}</td>
          </tr>   
            </>
          ))}
        </tbody>
      </table>
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

export default Male