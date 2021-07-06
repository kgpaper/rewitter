import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyReweets = async () => {
    const reweets = await dbService.collection("reweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
    console.log(reweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyReweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
