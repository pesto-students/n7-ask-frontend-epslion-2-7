import React from "react";
import "./AskQuestion.css";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { userContext } from "../userContext/userContext";
const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
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

function AskQuestion() {

  const onSubmit =()=>{
     //post request 

  }
  return (
    <userContext.Consumer>
      {({user, setUser}) => {
        console.log(user)
          return (
            <div className="askQuestion">
              <Comment
                avatar={<Avatar src={user}  size={{
                  lg: 80,
                  md: 80,
                  sm: 80,
                  xs: 50,
                  xl: 80,
                  xxl: 80,
                }} alt="Han Solo" />}
                content={<Editor />}
              />
            </div>
          );
        
      }}
    </userContext.Consumer>
  );
}

export default AskQuestion;
