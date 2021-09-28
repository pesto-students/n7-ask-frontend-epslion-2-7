import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

import { Avatar, Divider, Button, List, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

function UserProfile({ user }) {
  const [userData, setUserData] = useState([]);
  const [posts, updatePost] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:3000/userData", {});

    setUserData(response.data);
    console.log(userData);

    console.log("mounted");

    return () => console.log("unmounting...");
  }, []);

  const onButtonClick = (type) => {
    if (type === "questions") {
      updatePost(userData.questions);
    } else if (type === "answers") {
      updatePost(userData.answers);
    } else {
      updatePost(userData.comments);
    }
  };

  return (
    <div className="container">
      
      <div id="UserPersonalInfo">
        <Divider />
        <h1>{userData.name}</h1>
        <Avatar
          src={user}
          size={{ xs: 100, sm: 150, md: 150, lg: 150, xl: 150, xxl: 150 }}
          icon={<UserOutlined />}
        />
      </div>

      <div id="summary">
        <Button
          className="userProfileButtons"
          onClick={() => onButtonClick("questions")}
         
          
        >
          Summary
        </Button>
      </div>

      <div id="questions">
        <Button
          className="userProfileButtons"
          onClick={() => onButtonClick("questions")}
         
          
        >
          Questions
        </Button>
      </div>

      <div id="answers">
        <Button
          className="userProfileButtons"
          onClick={() => onButtonClick("answers")}
         
        >
          Answers
        </Button>
      </div>

      <div id="comments">
        <Button
          className="userProfileButtons"
          onClick={() => onButtonClick("comments")}
          
        >
          Comments
        </Button>
      </div>

      <div id="reputation">
        <Button
          className="userProfileButtons"
          onClick={() => onButtonClick("questions")}
         
        >
          Reputation
        </Button>
      </div>

      <div id="posts">
        <Divider />
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={posts}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
}

export default UserProfile;
