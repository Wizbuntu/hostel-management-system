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



const StaffViewClearanceRequest = () => {


     // init userAuthenticated
   const [userAuthenticated, setUserAuthenticated] = useState(false)

   // users state
   const [clearanceRequests, setClearanceRequests] = useState({})

   // init student data state
   const [studentData, setStudentData] = useState({})


   // init history
   const history = useHistory()


  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if(!user) {

          // return to login
          return history.push({pathname: '/staff/login'}) 
      } else {
         
         setUserAuthenticated(true)

       //   Fetch all users
       app.database().ref().child("ClearanceRequest").on("value", (snapshot) => {
           if(snapshot.val()) {
               // update setUser list 
               setClearanceRequests(snapshot.val())

               console.log(snapshot.val())
           }
       })

      }
  })
  }, [])


        // handle delete user
        const deleteClearanceRequest = (uid) => {
            app.database().ref().child(`ClearanceRequest/${uid}`).remove((error) => {
              if(error) {
                console.log(error)
                return toast.error("Oops! An error has occured")
              }

              return toast.success("Clearance request deleted successfully")
            })
        }


         // Filter clearance request function
      const filterClearanceRequest = (filterText) => {
        if(filterText) {
            // Filter clearance request by status
            app.database().ref('ClearanceRequest').orderByChild('status').equalTo(filterText).on("value", (snapshot) => {
              if(snapshot.val()) {
                
                // Update clearance request
                setClearanceRequests(snapshot.val())
              } else {
                    // update clearance request with empty object
                    setClearanceRequests({})
              }
            })
        } else {
          // update clearance request with empty object
          //   Fetch all users
            app.database().ref().child("ClearanceRequest").on("value", (snapshot) => {
              if(snapshot.val()) {
                  // update setUser list 
                  setClearanceRequests(snapshot.val())

                  console.log(snapshot.val())
              }
          })
        }
       
    }


    // init filter clearance request by department
    const filterDepartment = (filterText) => {

      if(filterText) {
        // Filter clearance request by status
        app.database().ref('ClearanceRequest').orderByChild('studentDepartment').equalTo(filterText).on("value", (snapshot) => {
          if(snapshot.val()) {
            
            // Update clearance request
            setClearanceRequests(snapshot.val())
          } else {
                // update clearance request with empty object
                setClearanceRequests({})
          }
        })
    } else {
      // update clearance request with empty object
      //   Fetch all users
        app.database().ref().child("ClearanceRequest").on("value", (snapshot) => {
          if(snapshot.val()) {
              // update setUser list 
              setClearanceRequests(snapshot.val())

              console.log(snapshot.val())
          }
      })
    }

    }



    // search clearance request
    const searchClearanceRequest = (searchText) => {

      if(searchText) {

          // Filter clearance request by status
          app.database().ref('ClearanceRequest').orderByChild('studentRegNo').equalTo(searchText).on("value", (snapshot) => {
            if(snapshot.val()) {
              
              // Update clearance request
              setClearanceRequests(snapshot.val())
  
            } else {
                  // update clearance request with empty object
                  setClearanceRequests({})
            }
          })

      } else {

         // update clearance request with empty object
          //   Fetch all users
          app.database().ref().child("ClearanceRequest").on("value", (snapshot) => {
            if(snapshot.val()) {
                // update setUser list 
                setClearanceRequests(snapshot.val())

                console.log(snapshot.val())
            }
        })

      }

       

    }


    

    return (
        <React.Fragment>
            <NavBar/>
            <ToastContainer/>
            <StaffSidebar/>

            <div class="wrapper">

            <main role="main" class="main-content">
            <div class="container-fluid">
            <div class="row justify-content-center">
            <div class="col-12">
              <div class="row align-items-center my-4">
                <div class="col">
                  <h2 class="h3 mb-0 page-title">Clearance Requests</h2>
                </div>
              
              </div>
            
              <div class="card shadow">
                <div class="card-body">
                <div class="toolbar">
                        <form class="form">
                          <div class="form-row">
                            <div class="form-group col-auto mr-auto">
                              <label class="my-1 mr-2 sr-only" for="inlineFormCustomSelectPref1">Show</label>
                              <select onChange={(e) => filterClearanceRequest(e.target.value)} class="custom-select mr-sm-2" id="inlineFormCustomSelectPref1">
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Cleared">Cleared</option>
                                <option value="Rejected">Declined</option>
                               
                              </select>
                            </div>

                            <div class="form-group col-auto mr-auto">
                              <label class="my-1 mr-2 sr-only" for="inlineFormCustomSelectPref1">Show</label>
                              <select onChange={(e) => filterDepartment(e.target.value)} class="custom-select mr-sm-2" id="inlineFormCustomSelectPref1">
                                <option value="">Select Department</option>
                                <option value="Computer Science &amp; Mathematics">Computer Science &amp; Mathematics</option>
                               
                              </select>
                            </div>
                            
                            <div class="form-group col-auto">
                             
                              <input type="text" onChange={(e) => searchClearanceRequest(e.target.value)} class="form-control" id="search1" placeholder="Search By Reg No"/>
                            </div>
                          </div>
                        </form>
                      </div>
      <table class="table table-borderless table-hover">
        <thead>
          <tr>
           
            <th>S/N</th>
            <th>Name</th>
            <th>Reg No</th>
            <th>Course</th>
            <th>Department</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clearanceRequests? 

          Object.keys(clearanceRequests).map((key, index) => {
           return <tr key={key}>
              <td>
                  {index+1}
              </td>
              <td>
              <p class="mb-0 text-muted"><Link to={`/staff/view/clearance/details/${key}`}><strong>{`${clearanceRequests[key].studentFirstName? clearanceRequests[key].studentFirstName: "Nil"} ${clearanceRequests[key].studentLastName? clearanceRequests[key].studentLastName: "Nil"}`}</strong></Link></p>
              </td>
              <td>
                <p class="mb-0 text-muted"><strong>{clearanceRequests[key].studentRegNo? clearanceRequests[key].studentRegNo : "Nil"}</strong></p>
              
              </td>
              <td>
                <p class="mb-0 text-muted">{clearanceRequests[key].studentCourse? clearanceRequests[key].studentCourse : "Nil"}</p>
                
              </td>
              <td>
                <p class="mb-0 text-muted">{clearanceRequests[key].studentDepartment? clearanceRequests[key].studentDepartment : "Nil"}</p>
                
              </td>
              <td>
                <small class="mb-0 text-muted">{clearanceRequests[key].message? clearanceRequests[key].message : "None"}</small>
              </td>
              <td class="text-muted">{clearanceRequests[key].createdAt? clearanceRequests[key].createdAt : "None"}</td>
              {clearanceRequests[key].status === "Pending" ?  <td><span class="badge badge-warning">Pending</span></td> : 
                  clearanceRequests[key].status === "Rejected" ? <td><span class="badge badge-danger">Declined</span></td> : 
                  <td><span class="badge badge-success">Cleared</span></td>
              }

                <td><button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="text-muted sr-only">Action</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                            <a onClick={() => deleteClearanceRequest(key)} class="dropdown-item" href="#">Remove</a>
                    </div>
                </td>
             
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

export default StaffViewClearanceRequest
