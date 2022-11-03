import axios from "axios";

const API_KEY = "AIzaSyDLWyw9LL5Frczj9bi9V6MipjfPLZHi0Uc";

export async function createUser(email, password) {
  await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    { email: email, password: password, returnSecureToken: true }
  );
}
