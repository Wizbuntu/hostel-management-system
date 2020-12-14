import React, {useEffect, useState} from 'react'



// NavBar
import StudentNavbar from '../Components/StudentNavbar'

// Sidebar
import StudentSidebar from '../Components/StudentSidebar'

// firebase app
import app from '../utils/firebaseConfig'

// react router dom
import {useHistory} from 'react-router-dom'



const StudentDashboardDetails = (props) => {

    const clearanceUid = props.match.params.uid

    // init useHistory
    const history = useHistory()

    // init clearance request details state
    const [clearanceRequestDetails, setClearanceRequestDetails] = useState({})

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
          if(!user) {

              // return to login
              return history.push({pathname: '/student/login'}) 
          } else {

            // get current authenticated student details
            app.database().ref().child(`ClearanceRequest/${clearanceUid}`).on("value", (snapshot) => {
              if(snapshot.val()) {

                // update clearance request details
                setClearanceRequestDetails(snapshot.val())

                console.log(snapshot.val())
                
              }
            })   

          }
        })
        
  }, [])

    return (
        <React.Fragment>
            <StudentNavbar/>
            <StudentSidebar/>

            <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <h2 class="h3 mb-4 page-title">My Clearance Request Details</h2>
              <div class="my-4">
               
                <div class="list-group mb-5 shadow">
                 
                    {clearanceRequestDetails? 
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <strong class="mb-2">Clearance Status: </strong>
                        {clearanceRequestDetails.status === "Pending" ? 
                             <span class="badge badge-pill badge-warning ml-2" style={{fontSize: 12}}>Pending</span>
                             :
                             clearanceRequestDetails.status === "Rejected" ? 
                             <span class="badge badge-pill badge-danger ml-2" style={{fontSize: 12}}>Declined</span> :
                             clearanceRequestDetails.status === "Cleared" ?
                             <span class="badge badge-pill badge-success ml-2" style={{fontSize: 12}}>Cleared</span> :
                             <span class="badge badge-pill badge-primary ml-2" style={{fontSize: 12}}>Loading...</span>
                    }
                       
                      </div> 
                      <div class="col-auto">
                        <button data-toggle="modal" data-target=".modal-full" class="btn btn-primary btn-sm">Print</button>
                      </div>
                    </div>
                  </div> 
                  :
                  
                    <div>Loading...</div>
                    }
                  
                </div> 
                <h5 class="mb-0">Personal Documents</h5>
                <p>List of personal documents uploaded.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>File Link</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {clearanceRequestDetails.personalDocuments? 
                  clearanceRequestDetails.personalDocuments.map((clearance_request, index) => {
                    return <React.Fragment key={index}>

                    <tr>
                      <th scope="col">{index+1}</th>
                      <td><a href={clearance_request}>{`Personal Document ${index+1}`}</a></td>
                    </tr>
  
                    </React.Fragment>
                  })
                  
                     :
                    <div className="text-center">Loading...</div>
                  
                  }
                    
            
                  </tbody>
                </table>



                <h5 class="mb-0 mt-5">Reciept Documents</h5>
                <p>List of reciept documents uploaded.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>File Link</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {clearanceRequestDetails.recieptDocuments? 
                  clearanceRequestDetails.recieptDocuments.map((reciept, index) => {
                    return <React.Fragment key={index}>

                    <tr>
                      <th scope="col">{index+1}</th>
                      <td><a href={reciept}>{`Reciept ${index+1}`}</a></td>
                    </tr>
                    </React.Fragment>

                        })
                                          
                        :
                        <div className="text-center">Loading...</div>

                        }
                   
                  </tbody>
                </table>



                <h5 class="mb-0 mt-5">Course Form Documents</h5>
                <p>List of course form documents uploaded.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>File Link</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {clearanceRequestDetails.courseFormDocuments? 
                  clearanceRequestDetails.courseFormDocuments.map((courseForm, index) => {
                    return <React.Fragment key={index}>
                      <tr>
                      <th scope="col">{index+1}</th>
                      <td><a href={courseForm}>{`Course Form ${index+1}`}</a></td>
                    </tr>
                    </React.Fragment>
                   

                  })
                                          
                  :
                  <div className="text-center">Loading...</div>

                  }
            
                  </tbody>
                </table>

                
               
              </div> 
            </div> 
          </div> 
        </div> 



        <div class="modal fade modal-full" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <button aria-label="" type="button" class="close px-2" data-dismiss="modal" aria-hidden="true">
                          <span aria-hidden="true">×</span>
              </button>
      
        <div class="container-fluid mt-5">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <div class="row align-items-center mb-4">
                <div class="col">
                  <h2 class="h5 page-title"><small class="text-muted text-uppercase">Generated Print Out</small></h2>
                </div>
                <div class="col-auto">
                  <button onClick={() => window.print()} type="button" class="btn btn-secondary">Print</button>
                 
                </div>
              </div>

              <div class="card shadow">
                <div class="card-body p-5">
                  <div class="row mb-5">
                    <div class="col-12 text-center mb-4">
                      <img src="/assets/images/eua-logo.png" style={{width: 80, height: 80}} class="navbar-brand-img brand-sm mx-auto mb-4" alt="..." />
                      <h2 class="mb-0 text-uppercase">EVANGEL UNIVERSITY AKAEZE</h2>
                      <p class="text-muted" style={{fontSize: 18}}>Graduating Students Clearance</p>
                    </div>
                    <div class="col-md-7">
                      
                      <p class="mb-4"><strong>FIRST NAME:</strong></p>
                      <p class="mb-4"><strong>LAST NAME (Surname): </strong></p>
                      <p class="mb-4"><strong>REGISTRATION NUMBER: </strong></p>
                      <p class="mb-4"><strong>COURSE: </strong></p>
                      <p class="mb-4"><strong>DEPARTMENT: </strong></p>
                      <p class="mb-4"><strong>STATUS: </strong></p>
                     
                    </div>
                    <div class="col-md-5">
                     
                      <p class="mb-4">
                        <strong>{`${clearanceRequestDetails.studentFirstName}`}</strong></p>
                      

                      <p class="mb-4">
                        <strong>{`${clearanceRequestDetails.studentLastName}`}</strong></p>


                        <p class="mb-4">
                        <strong>{`${clearanceRequestDetails.studentRegNo}`}</strong></p>

                        <p class="mb-4">
                        <strong>{`${clearanceRequestDetails.studentCourse}`}</strong></p>

                        <p class="mb-4">
                        <strong>{`${clearanceRequestDetails.studentDepartment}`}</strong></p>

                        <p class="mb-4">
                        <strong style={{fontSize: 20}}>{`${clearanceRequestDetails.status}`}</strong></p>


                     
                    </div>
                  </div> 
                  </div>
                  </div>

              </div>
              </div>
              </div>
             
                        
        </div>
       
       
      </main> 
            
        </React.Fragment>
    )
}

export default StudentDashboardDetails
