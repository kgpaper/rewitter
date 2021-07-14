import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Reweet = ({ reweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newReweet, setNewReweet] = useState(reweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this reweet?");
    if (ok) {
      await dbService.doc(`reweets/${reweetObj.id}`).delete();
      await storageService.refFromURL(reweetObj.attachmentUrl).delete();
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
    <div className="reweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container reweetEdit">
                <input type="text" autoFocus className="formInput" placeholder="edit your reweet" value={newReweet} required onChange={onChange} />
                <input type="submit" value="Update Reweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{reweetObj.text}</h4>
          {reweetObj.attachmentUrl && <img src={reweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="reweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reweet;
