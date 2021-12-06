import React, { useState } from "react";
import { Select } from "antd";
import "./AskQuestion.css";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { userContext } from "../userContext/userContext";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;

// nature: 1,
//       technology: 2,
//       movies: 3,
//       space: 4,
//       business: 5,
//       travel: 6,
//       health: 9,
//       books: 10,
//       science: 11,
//       fashion: 12,

 const Interests = {
  
  Nature:1,
  Technology:2,
  Movies:3,
  Space:4,
  Business:5,
  Travel:6,
  Health:9,
  Books:10,
  Science:11,
  Fashion:12
};
const InterestsList = Object.keys(Interests).map((val, index) => (
  
  <Option key={Interests[val]}>{val}</Option>
));

const Editor = ({ submitting, value ,user, updateQuestionAskedToggle}, questionAskedToggle) => {
  const [questionAsked, setQuestionAsked] = useState("");
  const [selectedInterestsList, setSelectedInterestList] = useState([]);
  // const [selectedInterestsListCopy, setSelectedInterestListCopy] = useState([]);

  function handleTextChange(e) {
    setQuestionAsked(e.target.value);   
  }

  function handleChange(value) {
    console.log("selectedValue",value)
    // const newVal = value.map(val=>Interests[val])
    // setSelectedInterestListCopy(newVal)
    setSelectedInterestList(value);
    // console.log(newVal)
    //console.log(`selected ${value}`)
  }

  const onSubmit = async () => {
    await axios.post(
     'https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/question',
     { question: questionAsked, interest: selectedInterestsList, expertId: "" },
     { headers: { Authorization: `${user.token}` } }
   ).then(res => {
     if(res.data.success){
       setQuestionAsked("")
       setSelectedInterestList([])
       if(questionAskedToggle==true){
         updateQuestionAskedToggle(false)
       }
       else{
         updateQuestionAskedToggle(true)
       }
  
     }
   })
  

   //post request
 };

  return (
    <>
      <Form.Item>
        <TextArea
          rows={4}
          style={{ width: "100%", marginLeft: "-10px" }}
          onChange={handleTextChange}
          value={questionAsked}
        />
      </Form.Item>
      <Form.Item>
        <Select
          className="QuestionInterestDomain"
          mode="multiple"
          allowClear
          style={{ width: "80%" }}
          placeholder="Please Select atleast one Interest"
          value={selectedInterestsList}
          onChange={handleChange}
        >
          {InterestsList}
        </Select>
        <Button
          disabled={
            !(questionAsked.length > 0 && selectedInterestsList.length > 0)
          }
          className="askQuestionButton"
          loading={submitting}
          onClick={onSubmit}
          htmlType="submit"
        >
          Ask Question
        </Button>
      </Form.Item>
    </>
  );
};

function AskQuestion({ user, updateQuestionAskedToggle,questionAskedToggle }) {
  
  return (
    <userContext.Consumer>
      {({ user, setUser }) => {
        console.log(user);
        return (
          <div className="askQuestion">
            <Comment
              avatar={
                <Avatar
                  src={user.profilePic ? user.ProfilePic : "./Avatar 3.png"}
                  size={{
                    lg: 80,
                    md: 80,
                    sm: 80,
                    xs: 50,
                    xl: 80,
                    xxl: 80,
                  }}
                  alt="Han Solo"
                />
              }
              content={<Editor user={user} updateQuestionAskedToggle={updateQuestionAskedToggle} questionAskedToggle={questionAskedToggle}/>}
            />
          </div>
        );
      }}
    </userContext.Consumer>
  );
}

export default AskQuestion;
