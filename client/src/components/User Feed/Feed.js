import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Post from "./Post";
import Profile from "./Profile";

function Feed() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/post")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setValue(data);
      });
  }, []);

  return (
    <div className="feed">
      <Nav />
      <Profile />
      {value && <Post value={value} />}
    </div>
  );
}

export default Feed;
