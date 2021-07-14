import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Reweet from "components/Reweet";
import ReweetFactory from "components/ReweetFactory";

const Home = ({ userObj }) => {
  const [reweets, setReweets] = useState([]);

  useEffect(() => {
    dbService.collection("reweets").onSnapshot((snapshot) => {
      const reweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReweets(reweetArray);
    });
  }, []);

  return (
    <div className="container">
      <ReweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {reweets.map((reweet) => (
          <Reweet key={reweet.id} reweetObj={reweet} isOwner={reweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
