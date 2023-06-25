import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAg2JAsnwtq0GfolIaB7Y1ZjRqIg15KzY8",
  authDomain: "uptbase-ffa44.firebaseapp.com",
  projectId: "uptbase-ffa44",
  storageBucket: "uptbase-ffa44.appspot.com",
  messagingSenderId: "205388749948",
  appId: "1:205388749948:web:b5dab6dca69b8e969dbdf9",
  measurementId: "G-Y0F8PGGRFJ",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
