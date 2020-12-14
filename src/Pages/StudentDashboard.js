import React, {useEffect, useState} from 'react'


// NavBar
import StudentNavbar from '../Components/StudentNavbar'

// Sidebar
import StudentSidebar from '../Components/StudentSidebar'

// firebase app
import app from '../utils/firebaseConfig'

// react router dom
import {useHistory, Link} from 'react-router-dom'



const StudentDashboard = () => {


    // init userAuthenticated
  const [userAuthenticated, setUserAuthenticated] = useState(null)

  // init clearance Request state
  const [clearanceRequest, setClearanceRequest] = useState({})

  // init student data state
  const [studentData, setStudentData] = useState({})

  // init history
  const history = useHistory()


  useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
          if(!user) {

              // return to login
              return history.push({pathname: '/student/login'}) 
          } else {

            // get current authenticated student details
            app.database().ref().child(`Student/${user.uid}`).on("value", (snapshot) => {
              if(snapshot.val()) {

                // update studentData
                setStudentData(snapshot.val())

                // // set user id
                // setUserAuthenticated(user.uid) 

                // fetch clearance request for user id
                // Find student with registration number
                app.database().ref('ClearanceRequest').orderByChild('studentUid').equalTo(user.uid).on("value", (snapshot) => {
                  if(snapshot.val()) {
                    // update clearance request
                    setClearanceRequest(snapshot.val())

                    console.log(snapshot.val())
                  }
                })
              }
            })


            

          }
        })


    
        
  }, [])


     



    return (
        <React.Fragment>
            <StudentNavbar/>
            <StudentSidebar/>
            <div class="wrapper">

            <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="row align-items-center my-4">
                <div class="col">
                  <h2 class="h3 mb-0 page-title">My Clearance Request</h2>
                </div>
               
              </div>
             
              <div class="card shadow">
                <div class="card-body">
                  <table class="table table-borderless table-hover">
                    <thead>
                      <tr>
                       
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Reg No</th>
                        <th>Course</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clearanceRequest? 

                      Object.keys(clearanceRequest).map((key, index) => {
                       return <tr>
                          <td>
                              {index+1}
                          </td>
                          <td>
                          <p class="mb-0 text-muted"><Link to={`/student/dashboard/${key}`}><strong>{`${studentData? studentData.firstName: "Nil"} ${studentData? studentData.lastName: "Nil"}`}</strong></Link></p>
                          </td>
                          <td>
                            <p class="mb-0 text-muted"><strong>{studentData? studentData.regNo : "Nil"}</strong></p>
                          
                          </td>
                          <td>
                            <p class="mb-0 text-muted">{studentData? studentData.course : "Nil"}</p>
                            
                          </td>
                          <td>
                            <small class="mb-0 text-muted">{clearanceRequest[key].message? clearanceRequest[key].message : "None"}</small>
                          </td>
                          <td class="text-muted">{clearanceRequest[key].createdAt? clearanceRequest[key].createdAt : "None"}</td>
                          {clearanceRequest[key].status === "Pending" ?  <td><span class="badge badge-warning">Pending</span></td> : 
                              clearanceRequest[key].status === "Rejected" ? <td><span class="badge badge-danger">Declined</span></td> : 
                              <td><span class="badge badge-success">Cleared</span></td>
                          }
                         
                      </tr>
                      })
                    
                     
                      :
                      <div>Loading...</div>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
             
            </div>
          </div> 
        </div>
       
       
        
      </main> 
     
            </div> 

            
        </React.Fragment>
    )
}

export default StudentDashboard
