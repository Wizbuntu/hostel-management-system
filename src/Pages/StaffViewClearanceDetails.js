import React, {useState, useEffect} from 'react'

// NavBar
import NavBar from '../Components/NavBar'

// Sidebar
import StaffSidebar from '../Components/StaffSidebar'

// react router dom
import {useHistory, Link} from 'react-router-dom'

// firebase app
import app from '../utils/firebaseConfig'



// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const StaffViewClearanceDetails = (props) => {

    const clearanceUid = props.match.params.uid

    
    // init useHistory
    const history = useHistory()


     // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

   // users state
   const [clearanceDetails, setClearanceDetails] = useState({})


   useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if(!user) {

          // return to login
          return history.push({pathname: '/student/login'}) 
      } else {

        // set authenticated user to true
        setUserAuthenticated(true)

        // get current authenticated student details
        app.database().ref().child(`ClearanceRequest/${clearanceUid}`).on("value", (snapshot) => {
          if(snapshot.val()) {

            // update clearance request details
            setClearanceDetails(snapshot.val())

            console.log(snapshot.val())
            
          }
        })   

      }
    })
    
}, [])


        // init clearanceStatus state
        const [clearanceStatus, setClearanceStatus] = useState(null)

        // init clearance Message state
        const [clearanceMessage, setClearanceMessage] = useState(null)

        // init MessageBox visibility state
        const [messageBoxVisibility, setMessageBoxVisibility] = useState(false)


        // change clearance status function
        const changeClearanceStatus = (status) => {
           if(status) {
               if(status === "Rejected") {
                    // set message box visiblity to true
                    setMessageBoxVisibility(true)

                    // init status data
                    const statusData = {
                        status: status
                    }

                    // update clearance request database
                    app.database().ref().child(`ClearanceRequest/${clearanceUid}`).update(statusData, (error) => {
                        if(error) {
                            console.log(error.message)
                            return toast.error("Oops! An error has occured")
                        }

                        // return success
                        return toast.success("Status updated successfully")
                    })
               } else {
                   setMessageBoxVisibility(false)

                   // init status data
                   const statusData = {
                        status: status
                    }

                    // update clearance request database
                    app.database().ref().child(`ClearanceRequest/${clearanceUid}`).update(statusData, (error) => {
                        if(error) {
                            console.log(error.message)
                            return toast.error("Oops! An error has occured")
                        }

                        // return success
                        return toast.success("Status updated successfully")
                    })
                   
               }
           }
        }

        // handle Clearance Message func
        const handleClearanceMessage = (message) => {
            
            setClearanceMessage(message)
           
        }


        // handle Submit message
        const handleSubmitMessage = () => {
            if(!clearanceMessage) {
                return toast.error("Please enter message")
            }

            // get message data
            const messageData = {
                message: clearanceMessage
            }


             // update clearance request database
            app.database().ref().child(`ClearanceRequest/${clearanceUid}`).update(messageData, (error) => {
                if(error) {
                    console.log(error.message)
                    return toast.error("Oops! An error has occured")
                }

                // return success
                return toast.success("Message Sent successfully")
            })
        }



    return (
        <React.Fragment>
            <NavBar/>
            <ToastContainer/>
            <StaffSidebar/>

            <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <h2 class="h3 mb-4 page-title">Clearance Request Details</h2>
              <div class="my-4">
               
                <div class="list-group mb-5 shadow">
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <strong class="mb-2">Update Clearance Status</strong>
                        
                      </div> 
                      <div class="col-auto">
                        {/* Clearance Status */}
                        <div class="form-row">
                        <div class="form-group">
                        
                        <select onChange={(e) => changeClearanceStatus(e.target.value)} class="form-control" id="clearance_status">
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Cleared">Cleared</option>
                          <option value="Rejected">Rejected</option>
                         
                        </select>
                        </div>
                        </div>
                      </div> 
                    </div> 
                  </div>

                    {messageBoxVisibility? <React.Fragment>
                        <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <strong class="mb-2">Send message to student</strong>
                        <div className="form-group">
                      
                            <input value={clearanceMessage} name="message" onChange={(e) => handleClearanceMessage(e.target.value)} type="text"  className="form-control form-control-lg" placeholder="Message" required="" />
                        </div>
                      </div> 
                      <div class="col-auto">
                        {/* Send Button */}
                        <button onClick={() => handleSubmitMessage()} className="btn btn-primary btn-sm">Send</button>
                      </div> 
                    </div> 
                  </div> 
                    </React.Fragment> : 
                    null
                    }
                   
                    {clearanceDetails? 
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col">
                        <strong class="mb-2">Clearance Status: </strong>
                        {clearanceDetails.status === "Pending" ? 
                             <span class="badge badge-pill badge-warning ml-2" style={{fontSize: 12}}>Pending</span>
                             :
                             clearanceDetails.status === "Rejected" ? 
                             <span class="badge badge-pill badge-danger ml-2" style={{fontSize: 12}}>Declined</span> :
                             clearanceDetails.status === "Cleared" ? 
                             <span class="badge badge-pill badge-success ml-2" style={{fontSize: 12}}>Cleared</span> :
                             <span class="badge badge-pill badge-primary ml-2" style={{fontSize: 12}}>Loading...</span>
                    }
                       
                      </div> 
                     
                    </div>
                  </div> 
                  :
                  
                    <div>Loading...</div>
                    }
                    
                    {clearanceDetails? 
                    <div class="list-group-item">
                        <div class="row align-items-center">
                        <div class="col">
                            <strong class="mb-2">Message</strong>
                            <p class="text-muted mb-0">{clearanceDetails.message}</p>
                        </div> 
                        
                        </div> 
                    </div> : 
                    "None"
                        }
                  
                </div> 
                <h5 class="mb-0">Student Personal Documents</h5>
                <p>List of uploaded student personal documents.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>File Link</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {clearanceDetails.personalDocuments? 
                  clearanceDetails.personalDocuments.map((clearance_request, index) => {
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



                <h5 class="mb-0 mt-5">Student Reciept Documents</h5>
                <p>List of uploaded student reciept documents.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>File Link</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {clearanceDetails.recieptDocuments? 
                  clearanceDetails.recieptDocuments.map((reciept, index) => {
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



                <h5 class="mb-0 mt-5">Student Course Form Documents</h5>
                <p>List of uploaded student course form documents.</p>
                <table class="table border bg-white">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>File Link</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {clearanceDetails.courseFormDocuments? 
                  clearanceDetails.courseFormDocuments.map((courseForm, index) => {
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
       
       
      </main> 
            
        </React.Fragment>
    )
}

export default StaffViewClearanceDetails
