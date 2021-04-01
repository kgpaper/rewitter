import React from "react";

const Reweet = ({ reweetObj, isOwner }) => (
  <div>
    <h4>{reweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Reweet</button>
        <button>Edit Reweet</button>
      </>
    )}
  </div>
);

export default Reweet;
