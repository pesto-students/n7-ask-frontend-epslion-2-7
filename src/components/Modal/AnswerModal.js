import React, { useEffect, useState } from 'react';
import { Modal, Button, Comment, Avatar,Input,Form } from 'antd';
const { TextArea } = Input;


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
   
      <TextArea   value={value} />
    
  
  </>
);







const AnswerModal = ({setIsModalVisible, isModalVisible, feed ,user}) => {
    

  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
     
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Comment
              className="contentWrap"
              author={ <h3 style={{ color: "black" }}>
              <b>{feed.userName}</b>
            </h3>}
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
          content={
            <Editor
              
            />
          }
        />
        
      </Modal>
    </>
  );
};
export default AnswerModal;