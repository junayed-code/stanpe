import { AuthContext } from "@/provider/AuthProvider";
import { User } from "firebase/auth";
import { useContext } from "react";

/**
 * @typedef {object} Auth
 * @property {boolean} loading
 * @property {User} currentUser
 * @property {(displayName:string, email:string, password:string) => Promise<User>} createNewUser
 * @property {(email:string, password:string) => Promise<User>} logInUser
 * @property {() => Promise<void>} logOutUser
 * @property {() => Promise<User>} logInWithGoogle
 */

/**@returns { Auth } */
export default function useAuth() {
  return useContext(AuthContext);
}
