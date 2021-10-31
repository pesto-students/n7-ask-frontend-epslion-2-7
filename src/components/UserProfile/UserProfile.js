import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

import { Avatar, Divider, Button, List, Typography, Upload } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    //message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    //message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}





function UserProfile({ user }) {
  const [userData, setUserData] = useState([]);
  const [posts, updatePost] = useState([]);
  const [type, setType]= useState("question");

  const [questions, setQuestions]= useState([])
  const [answers, setAnswers]= useState([])
  const [comments, setComments]= useState([])

  useEffect(async () => {
    const questions = await axios.get("https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/userQuestions", {
      headers: { Authorization: `${user.token}` },
    });
    if(questions.data.success){
      setQuestions(questions.data.data);
    }

    const answers = await axios.get("https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/userAnswers", {
      headers: { Authorization: `${user.token}` },
    });
    if(answers.data.success){
      setAnswers(answers.data.data)
    }

    const comments = await axios.get("https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/userComments", {
      headers: { Authorization: `${user.token}` },
    });
    if(comments.data.data){
      setComments(comments.data.data)
    }

    
    

    console.log("mounted");

    return () => console.log("unmounting...");
  }, []);

  const onButtonClick = (type) => {
    if (type === "questions") {
      setType("question")
      updatePost(questions);
    } else if (type === "answers") {
      setType("answer")
     updatePost(answers);
    } 
    else if (type === "reputation") {
      setType("reputation")
     updatePost(answers);
    }else {
      setType("comment")
      updatePost(comments);
    }
  };


  const  handleChange = info => {
    if (info.file.status === 'uploading') {
     // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
     // getBase64(info.file.originFileObj, imageUrl =>
      
        //setUserData({...userData, profilePic:imageUrl})
     // );
    }
  };
 
  
  return (
    <div className="container">
      <br/>
      <br/>
      <div id="UserPersonalInfo">
        <Divider />
        <h1>{user.name}</h1>
        <div className="editIcon">
        <Avatar
          src={userData.profilePic ? userData.profilePic : './logo512.png'}
          size={{ xs: 100, sm: 150, md: 150, lg: 150, xl: 150, xxl: 150 }}
          icon={<UserOutlined />}
        />
        <Upload onChange={handleChange} showUploadList={false} ><EditOutlined style={{float:"right"}}/></Upload>
        
       </div>
      </div>

      <div id="summary">
        <Button
         block
          className="userProfileButtons"
          onClick={() => onButtonClick("questions")
        }       
        >
          Summary
        </Button>
      </div>

      <div id="questions">
        <Button
        block
          className="userProfileButtons"
          onClick={() => onButtonClick("questions")}
         
          
        >
          Questions
        </Button>
      </div>

      <div id="answers">
        <Button
        block
          className="userProfileButtons"
          onClick={() => onButtonClick("answers")}
         
        >
          Answers
        </Button>
      </div>

      <div id="comments">
        <Button
        block
          className="userProfileButtons"
          onClick={() => onButtonClick("comments")}
          
        >
          Comments
        </Button>
      </div>

      <div id="reputation">
        <Button
          block
          className="userProfileButtons"
          onClick={() => onButtonClick("reputation")}
        >
          Reputation
        </Button>
      </div>
      <div id="posts" >
      {type=="reputation" ? <div style={{textAlign:"center", marginTop:"50px", fontSize:"60px"}}>{user.reputation}</div> : 
        <>
        <Divider />
        <List
          size="large"
          bordered
          dataSource={posts}
          renderItem={(item) => <List.Item>{ item[`${type}`]}</List.Item>}
        />
        </>
     
      }
       </div>
      
    </div>
  );
}

export default UserProfile;
