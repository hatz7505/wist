import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./dashboard.css";
import WistApi from "./api";
import AddItemModal from "./AddItemModal";

function Dashboard() {
  let [user, setUser] = useState("");
  let [formData, setFormData] = useState({ link: "" });
  let [formErrors, setFormErrors] = useState([]);
  let [showModal, setShowModal] = useState(false);

  useEffect(function getUserData() {
    async function getCurrentUser() {
      let username = localStorage.getItem("username");
      let userData = await WistApi.getCurrentUser(username);
      setUser(userData);
    }
    async function getUserItems() {
      let username = localStorage.getItem("username");
      let result = await WistApi.getUsersItems(username);
      console.log({result});
    }

    getCurrentUser();
    getUserItems();
  }, []);


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  function handleClose() {
    setShowModal(false);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    for (let field in formData) {
      if (!formData[field].length) {
        setFormErrors(["Please provide a link to the wist item"]);
        return;
      }
    }
    setShowModal(true);
  }

  return (
    <div>
      <Header />
      <div className="dashboard-background">
        <p>Hi {user.first_name}!</p>
        <AddItemModal show={showModal} link={formData.link} handleClose={handleClose}/>
        <form onSubmit={handleSubmit}>
          <h3>add a new item</h3>
          <label>item link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.username}
            onChange={handleChange}
          ></input>
          <button>add item!</button>
          {formErrors.length
            ? formErrors.map((error) => (
                <p className="error" key={error}>
                  {error}
                </p>
              ))
            : null}
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
