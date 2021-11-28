import React, { useState } from "react";
import { Select } from "antd";
import "./AskQuestion.css";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { userContext } from "../userContext/userContext";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;

const Interests = [
  
  "Nature",
  "Technology",
  "Movies",
  "Space",
  "Business",
  "Travel",
  "Health",
  "Books",
  "Science",
  "Fashion",
];
const InterestsList = Interests.map((val, index) => (
  
  <Option key={val}>{val}</Option>
));

const Editor = ({ submitting, value ,user}) => {
  const [questionAsked, setQuestionAsked] = useState("");
  const [selectedInterestsList, setSelectedInterestList] = useState([]);
  const [selectedInterestsListCopy, setSelectedInterestListCopy] = useState([]);

  function handleTextChange(e) {
    setQuestionAsked(e.target.value);   
  }

  function handleChange(value) {
    console.log("selectedValue",value)
    const newVal = value.map(val=>Interests.indexOf(val)+1)
    setSelectedInterestListCopy(newVal)
    setSelectedInterestList(value);
    // console.log(newVal)
    //console.log(`selected ${value}`)
  }

  const onSubmit = async () => {
    await axios.post(
     "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/question",
     { question: questionAsked, interest: selectedInterestsListCopy, expertId: "" },
     { headers: { Authorization: `${user.token}` } }
   ).then(res => {
     if(res.data.success){
       setQuestionAsked("")
       setSelectedInterestList([])
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

function AskQuestion({ user }) {
  
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
              content={<Editor user={user}/>}
            />
          </div>
        );
      }}
    </userContext.Consumer>
  );
}

export default AskQuestion;
