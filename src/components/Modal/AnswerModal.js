import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button, Comment, Avatar, Input, Form } from "antd";
import { Redirect } from "react-router";
const { TextArea } = Input;


const Editor = ({ user, questionId,setIsModalVisible }) => {
  const [textInput, setTextInput] = useState("");

  function handleTextChange(e) {
    setTextInput(e.target.value);
  }

  const onAnswerSubmit = async () => {
    await axios
      .post(
        "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/answer",
        { answer: textInput, questionId: questionId },
        { headers: { Authorization: `${user.token}` } }
      )
      .then((res) => {
        if (res.data.success) {
          setTextInput("");
          setIsModalVisible(false)
        }
      });
      

    //post request
  };

  return (
    <>
      <Form.Item>
        <TextArea
          rows={4}
          style={{ width: "100%", marginLeft: "-10px" }}
          onChange={handleTextChange}
          value={textInput}
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={!(textInput.length > 0)}
          size="large"
          className="answerBtn"
          htmlType="submit"
          onClick={onAnswerSubmit}
        >
          Answer
        </Button>
      </Form.Item>
    </>
  );
};

const AnswerModal = ({ setIsModalVisible, isModalVisible, feed, user }) => {
  const showModal = () => {
    setIsModalVisible(true);
  };

  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Answer"
        visible={isModalVisible}

        onCancel={handleCancel}

        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
         
        ]}
      >
        <Comment
          className="contentWrap"
          author={
            <h3 style={{ color: "black" }}>
              <b>{feed.userName}</b>
            </h3>
          }
          avatar={
            <Avatar
              size={{
                lg: 80,
                md: 80,
                sm: 80,
                xs: 50,
                xl: 80,
                xxl: 80,
              }}
              src="/profile.png"
              alt="Han Solo"
            />
          }
          content={<p>{feed.question}</p>}
        />

        <Comment
          avatar={
            <Avatar
              size={{
                lg: 80,
                md: 80,
                sm: 80,
                xs: 50,
                xl: 80,
                xxl: 80,
              }}
              src={user}
              alt="Han Solo"
            />
          }
          content={<Editor user={user} questionId={feed.id} setIsModalVisible={setIsModalVisible}/>}
        />
      </Modal>
    </>
  );
};
export default AnswerModal;