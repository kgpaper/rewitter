import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Reweet from "components/Reweet";

const Home = ({ userObj }) => {
  const [reweet, setReweet] = useState("");
  const [reweets, setReweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection("reweets").onSnapshot((snapshot) => {
      const reweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReweets(reweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment !== ""){
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const reweetObj = {
      text: reweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("reweets").add(reweetObj);
    setReweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={reweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="reweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {reweets.map((reweet) => (
          <Reweet key={reweet.id} reweetObj={reweet} isOwner={reweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
