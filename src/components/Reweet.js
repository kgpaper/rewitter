import { dbService } from "fbase";
import React, { useState } from "react";

const Reweet = ({ reweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newReweet, setNewReweet] = useState(reweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this reweet?");
    if (ok) {
      await dbService.doc(`reweets/${reweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(reweetObj, newReweet);
    await dbService.doc(`reweets/${reweetObj.id}`).update({
      text: newReweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewReweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
        {isOwner && (
          <>
            <form onSubmit={onSubmit}>
              <input type="text" placeholder="edit your reweet" value={newReweet} required onChange={onChange} />
              <input type="submit" value="update Reweet" />
            </form>
            <button onClick={toggleEditing}>Cancle</button>
          </>
        )}
        </>
      ) : (
        <>
          <h4>{reweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Reweet</button>
              <button onClick={toggleEditing}>Edit Reweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Reweet;
