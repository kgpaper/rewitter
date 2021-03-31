import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [reweet, setReweet] = useState("");
  const [reweets, setReweets] = useState([]);

  useEffect(() => {
    dbService.collection("reweets").onSnapshot((snapshot) => {
      const reweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReweets(reweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("reweets").add({
      text: reweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setReweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReweet(value);
  };
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={reweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="reweet" />
      </form>
      <div>
        {reweets.map((reweet) => (
          <div key={reweet.id}>
            <h4>{reweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
