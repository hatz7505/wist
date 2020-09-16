import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./dashboard.css";
import WistApi from "./api";
import AddItemModal from "./AddItemModal";
import WistItem from "./WistItem";
import { Row, Col } from "reactstrap";

function Dashboard() {
  let [user, setUser] = useState("");
  let [formData, setFormData] = useState({ link: "" });
  let [formErrors, setFormErrors] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [wistItems, setWistItems] = useState([]);

  useEffect(function getUserData() {
    async function getCurrentUser() {
      let username = localStorage.getItem("username");
      let userData = await WistApi.getCurrentUser(username);
      setUser(userData);
    }
    async function getUserItems() {
      let username = localStorage.getItem("username");
      let result = await WistApi.getUsersItems(username);
      setWistItems(result);
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
        <div className="add-item-container">
          <h2>Looking good, {user.first_name}!</h2>
          <AddItemModal
            show={showModal}
            link={formData.link}
            handleClose={handleClose}
          />
          <form onSubmit={handleSubmit}>
            <h4>add a new item</h4>
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
        <Row>
          {wistItems.length
            ? wistItems.map((item) => (
                <Col key={item.link} sm="4">
                  <WistItem item={item} key={item.id} />{" "}
                </Col>
              ))
            : null}
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
