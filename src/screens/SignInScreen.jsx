import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignInScreen.css";

function SignInScreen() {
  const emialRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emialRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emialRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signInScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emialRef} placeholder="Email" type="email" />
        <small>
          Test email: <b>test@testmail.com</b>
        </small>
        <input ref={passwordRef} placeholder="Password" type="password" />
        <small>
          Test password: <b>123456</b>
        </small>
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signInScreen__gray">New to Netflix? </span>
          <span className="signInScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
        <small>
          To Sign up, enter your credentials and click <i>Sign Up now</i>.
        </small>
      </form>
    </div>
  );
}

export default SignInScreen;
