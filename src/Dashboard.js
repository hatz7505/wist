import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./dashboard.css";
import WistApi from "./api";

function Dashboard() {
  let [user, setUser] = useState("");
  useEffect(function getUserData() {
    async function getCurrentUser() {
      let username = localStorage.getItem("username");
      let userData = await WistApi.getCurrentUser(username);
      setUser(userData);
    }

    getCurrentUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="dashboard-background">
        <p>Hi {user.first_name}!</p>
      </div>
    </div>
  );
}

export default Dashboard;
