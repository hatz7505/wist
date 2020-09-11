import React, { useEffect, useState } from "react";
import "./addItemModal.css";
import WistApi from "./api";

function AddItemModal({ show, link, handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    link: "",
    price: "",
    category: ""
  });
  const [formErrors, setFormErrors] = useState([]);
  const showHideClassName = show ? "modal show-modal" : "modal hide-modal";

  useEffect(
    function () {
      async function tryLink(link) {
        try {
          let result = await WistApi.getItemData(link);
          console.log(result);
        } catch {
          console.log("in catch");
        }
      }
      if (show) {
        tryLink(link);
      }
    },
    [link, show]
  );

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    for (let field in formData) {
      if (!formData[field].length) {
        setFormErrors(["All fields are required"]);
        return;
      }
    }
    let username = localStorage.getItem("username");
    await WistApi.addItem({...formData, username});
  }

  function closeModal() {
    handleClose();
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2 className="modal-header">add a new item to your wist!</h2>
        <form onSubmit={handleSubmit} className="add-item-form">
          <label>item name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          ></input>
          <label>link to item</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          ></input>
          <label>picture link</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
          ></input>
          <label>price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          ></input>
          <label>category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          ></input>
          <button className="login">add item</button>
          {formErrors.length
            ? formErrors.map((error) => (
                <p className="error" key={error}>
                  {error}
                </p>
              ))
            : null}
        </form>
        <button onClick={closeModal} className="cancel">
          cancel
        </button>
      </section>
    </div>
  );
}

export default AddItemModal;
