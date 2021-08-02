import { Avatar, Flex, Icon, Text, Textarea } from "@chakra-ui/react";
import { FaComment, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import React, { useState } from "react";

import Message from "./Message";

function Post({ value }) {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  function likeHandler() {
    if (!like) {
      const like = document.getElementById("like");
      like.style.color = "blue";
      setLike(true);
      const dislike = document.getElementById("dislike");
      dislike.style.color = "black";
      setDislike(false);
      console.log("hello1");
    } else {
      const like = document.getElementById("like");
      like.style.color = "black";
      console.log("hello");
      setLike(false);
    }
    console.log(like);
  }

  function dislikeHandler() {
    if (!dislike) {
      const dislike = document.getElementById("dislike");
      dislike.style.color = "blue";
      setDislike(true);
      const like = document.getElementById("like");
      like.style.color = "black";
      setLike(false);
    } else {
      const dislike = document.getElementById("dislike");
      dislike.style.color = "black";
      setDislike(false);
    }
  }
  return (
    <div class="post">
      {value.map((values) => (
        <div
          className="post-preview"
          key={values.id}
          style={{
            marginBottom: "10px",
            width: "900px",
            paddingLeft: "20px",
            paddingTop: "20px",
            paddingBottom: "30px",
            marginLeft: "35%",
            marginTop: "10%",
            boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
          }}
        >
          <Flex display="flex">
            <Avatar src="https://i.ibb.co/qBmhLK4/12.jpg"></Avatar>
            <Text ml={5}>
              Yash Shinde<Text fontSize={12}>7:00pm</Text>
            </Text>
          </Flex>
          <Text ml="70px" mt={5}>
            {values.caption}
          </Text>
          <Textarea
            width="750px"
            height="420px"
            readOnly
            resize="none"
            mt={5}
            ml="70px"
          >
            {values.editorValue}
          </Textarea>
          <Flex display="flex" ml="70px" mt={5}>
            <Icon
              as={FaThumbsUp}
              id="like"
              cursor="pointer"
              onClick={likeHandler}
            ></Icon>
            <Icon
              as={FaThumbsDown}
              id="dislike"
              onClick={dislikeHandler}
              ml={5}
              cursor="pointer"
            ></Icon>
            <Icon
              as={FaComment}
              ml={5}
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault();
                setShow(!show);
                const showMessage = { show };
                fetch(`http://localhost:8000/post/${values.id}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(showMessage),
                }).then(() => {
                  console.log("Data Added");
                });
              }}
            ></Icon>
          </Flex>

          {show && <Message value={values.id} />}
          {values.comment.map((cmt) => {
            if (!show) {
              return;
            }
            return (
              <div key={cmt.id}>
                <div
                  className="comments-preview"
                  style={{ marginBottom: "30px", marginTop: "10px" }}
                >
                  <Flex display="flex" ml="70px">
                    <Avatar src="https://i.ibb.co/Xyh9k50/1.jpg"></Avatar>
                    <Text ml={5}>
                      Yashraj More<Text fontSize="12px">8:00pm</Text>
                    </Text>
                  </Flex>
                  <Text ml="135px">{cmt.message}</Text>
                  <Flex display="flex" ml="135px" mt={3}>
                    <Icon as={FaThumbsUp} cursor="pointer"></Icon>
                    <Icon as={FaThumbsDown} cursor="pointer" ml={5}></Icon>
                  </Flex>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Post;
