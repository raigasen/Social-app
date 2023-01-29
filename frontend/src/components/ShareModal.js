import React from "react";

function ShareModal({ modalVisible, shareData, handleClose }) {
  return (
    <>
      <div className={`${"share-modal"} ${modalVisible ? "opened" : "closed"}`}>
       
      </div>
    </>
  );
}

export default ShareModal;