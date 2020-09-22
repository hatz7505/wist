import React, { useState } from "react";
import WistApi from "./api";

function AddProConModal({ show, itemId, handleClose }) {
  const [formData, setFormData] = useState({
    comment: "",
    procon: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const showHideClassName = show ? "modal show-modal" : "modal hide-modal";

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setFormErrors([]);
    for (let field in formData) {
      if (!formData[field].length) {
        setFormErrors(["All fields are required"]);
        return;
      }
    }
    try {
      await WistApi.addProCon({ ...formData, itemId });
      closeModal();
    } catch (err) {
      setFormErrors([err]);
    }
  }

  function closeModal() {
    handleClose();
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2 className="modal-header">add a pro/con to this item</h2>
        <form onSubmit={handleSubmit} className="add-item-form">
          <label>comment</label>
          <input
            type="text"
            id="name"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></input>
          <label>pro or con?</label>
          <select
            type="text"
            id="link"
            name="procon"
            value={formData.procon}
            onChange={handleChange}
          >
            <option value="pro">pro</option>
            <option value="con">con</option>
          </select>
          <button className="login">add pro/con</button>
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

export default AddProConModal;
