import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectUser } from "../features/user/userSlice";
import { auth } from "../firebase";
import Nav from "../components/Nav";
import "./ProfileSceen.css";

function ProfileSceen() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="profileSceen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <button
                onClick={() => navigate(-1)}
                className="profileScreen__continue"
              >
                Continue
              </button>
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSceen;
