import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
 

const firebaseConfig = {
  apiKey: "AIzaSyBp_y6wYbdcxpg2tUhud1SAA-LHbUuZUDI",
  authDomain: "videovibe-78ddb.firebaseapp.com",
  databaseURL:"https://videovibe-78ddb-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "videovibe-78ddb",
  storageBucket: "videovibe-78ddb.appspot.com",
  messagingSenderId: "279583705221",
  appId: "1:279583705221:web:86f901f995c1d04e6741ec",
};



const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { database, auth, storage };
