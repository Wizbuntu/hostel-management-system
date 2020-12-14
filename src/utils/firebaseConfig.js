 // Firebase
 import firebase from 'firebase/app'

 // firebase auth
 import 'firebase/auth'

 // firebase database
 import 'firebase/database'

 // firebase config
 const firebaseConfig = {
     apiKey: "AIzaSyD_UfMtqz0U_nmz1uGWOeqZIHcp-x5LN0g",
     authDomain: "online-clearance-system-cfc62.firebaseapp.com",
     databaseURL: "https://online-clearance-system-cfc62-default-rtdb.firebaseio.com",
     projectId: "online-clearance-system-cfc62",
     storageBucket: "online-clearance-system-cfc62.appspot.com",
     messagingSenderId: "655660634239",
     appId: "1:655660634239:web:c8a472fe930002821baf4a"

 };


 // init firebase
 const app = firebase.initializeApp(firebaseConfig)

 app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)



 // export 
 export default app