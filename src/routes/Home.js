import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [reweet, setReweet] = useState("");

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
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={reweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="reweet" />
      </form>
    </div>
  );
};

export default Home;
