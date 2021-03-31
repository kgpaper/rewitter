import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [reweet, setReweet] = useState("");
  const [reweets, setReweets] = useState([]);
  const getReweets = async () => {
    const dbReweets = await dbService.collection("reweets").get();
    dbReweets.forEach((document) => {
      const reweetObject = {
        ...document.data(),
        id: document.id,
      };
      setReweets((prev) => [reweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getReweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("reweets").add({
      reweet,
      createdAt: Date.now(),
    });
    setReweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReweet(value);
  };
  console.log(reweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={reweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="reweet" />
      </form>
      <div key={reweet.id}>
        {reweets.map(reweet => <div>
          <h4>{reweet.reweet}</h4>
        </div>)}
      </div>
    </div>
  );
};

export default Home;
