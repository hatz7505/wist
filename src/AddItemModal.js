import React from "react";
import "./addItemModal.css";

function AddItemModal({ show, link }) {
  const showHideClassName = show ? "modal show-modal" : "modal hide-modal";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">heyyyy</section>
    </div>
  );
}

export default AddItemModal;

//  try {
//    let result = await WistApi.getItemData(formData.link);
//    console.log(result);
//  } catch {
//    console.log("in catch");
//  }
