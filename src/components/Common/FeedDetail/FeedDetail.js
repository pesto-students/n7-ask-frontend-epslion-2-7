import React, { createElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./FeedDetail.css";
import axios from "axios";
import { Comment, Tooltip, Avatar, Form, Input, Button, Divider } from "antd";
import moment from "moment";
import {
  CommentOutlined,
  ShareAltOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  EditFilled,
} from "@ant-design/icons";
const { TextArea } = Input;

const Editor = ({ onChange, onAnswerSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        size="large"
        className="answerBtn"
        htmlType="submit"
        loading={submitting}
        onClick={() => onAnswerSubmit(value)}
      >
        Answer
      </Button>
    </Form.Item>
  </>
);

function FeedDetail({ setShowDetailFeed, feedContent, user }) {
  let { id } = useParams();
  const [ questionDetails, setQuestionDetails ] = useState([{}]);
  const [answers, setAnswers]= useState([{}]);
  const [comments, setComments]= useState([{}]);

  useEffect( () => {
   
   async function fetchData(){
    const questionReq = await axios.get(
      `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/question/${id}`
    );
    if (questionReq && questionReq.data.success) {
      console.log(questionReq.data.data)
      setQuestionDetails(questionReq.data.data);
    }
    const answerReq = await axios.get(
      `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/answers/${id}`
    );
    if(answerReq.data.success){
      setAnswers(answerReq.data.data)

    }
    // const commentsReq = await axios.get(
    //   `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/comments/${id}`
    // );
    // if(commentsReq.data.success){
    //   setComments(commentsReq.data.data)

    // }

   }
   fetchData();
    

    

    
  },[id]);
  

  

  const onActionClicked = (type, feed) => {};

  const onAnswerSubmit = (value) => {
    //user to submit their answer.
  };

  /*const onActionClicked = async (type, feed) => {
    if (user != null) {
      //setCurrentFeed(feed);

      let feedsCopy = feeds;
      //send the http request
      if (type == "like") {
        /*production
      const response = await axios.post("https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like", {typeId:feed.id, type:"question", like:1});
      console.log(response)
      if(response.success){

      }
        if (feed.liked) {
          const response = true;
          if (response) {
            feedsCopy.map((value) => {
              if (value.id == feed.id) {
                value.likes = value.likes - 1;
                value.liked = false;
              }
            });
           // setCurrentFeed({ ...feed, liked: false });
            console.log(feedsCopy);
            updateFeed(feedsCopy);
          }
        } else if (!feed.liked) {
          const response = true;
          if (response) {
            feedsCopy.map((value) => {
              if (value.id == feed.id) {
                value.likes = value.likes + 1;
                value.liked = true;
              }
            });
           // setCurrentFeed({ ...feed, liked: true });
            console.log("liked");
            updateFeed(feedsCopy);
          }
        }
      }
    }
  };*/

  const actionForFeedContent = (feed) => {
    return [
      <Tooltip key="comment-basic-like" title="Like">
        <span
          // onClick={() => onActionClicked("like")}
          style={{ fontSize: "16px" }}
        >
          {createElement(feed.liked ? HeartFilled : HeartOutlined)}
          <span className="comment-action iconPositon">{feed.likes}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="Comment">
        <span onClick={onActionClicked} style={{ fontSize: "16px" }}>
          <CommentOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.comments}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span onClick={onActionClicked} style={{ fontSize: "16px" }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.views}</span>
        </span>
      </Tooltip>,

      <ShareAltOutlined style={{ fontSize: "16px" }} />,
    ];
  };

  const actions = () => {
    return [
      <Button
      role="tab"
        className="FeedDetailBtn"
        
      >
        {questionDetails[0].answers} Answers
      </Button>,
      <Button
      role="tab"
        className="FeedDetailBtn"
        // nClick={() => onActionClicked("comments")}
      >
        {questionDetails[0].comments} Comments
      </Button>,

      <Tooltip key="comment-basic-like" title="Like">
        <span
          // onClick={() => onActionClicked("like")}
          style={{ fontSize: "16px" }}
        >
          {createElement(true ? HeartFilled : HeartOutlined)}
          <span className="comment-action iconPositon">{questionDetails[0].likes}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span style={{ fontSize: "16px" }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action">{questionDetails[0].viewCount}</span>
        </span>
      </Tooltip>,

      <ShareAltOutlined style={{ fontSize: "16px", paddingTop: "6px" }} />,
    ];
  };

  return (


    <div className="FeedContainer">
      <div id="FeedContent">
        {questionDetails.map((item, index)=>(
          <Comment
          key={index}
          actions={actions()}
          
          author={ <h3 style={{ color: "black" }}>
                   
          <b>{item.userName}</b>
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
              src={item.profilePic ? item.profilePic : "/profile.png"}
              alt="Han Solo"
            />
          }
          content={<p style={{ fontSize: "16px" }}>{item.question}</p>}
        />

        ))}
      
        

        {/* Answer portal hidden based on user logged in*/}
        <div>
          <Comment
            hidden={user ? true : false}
            avatar={<Avatar
              src={user}
              size={{
                lg: 80,
                md: 80,
                sm: 80,
                xs: 50,
                xl: 80,
                xxl: 80,
              }}
              alt="Han Solo"
            />}
            content={<Editor onAnswerSubmit={onAnswerSubmit} />}
          />
        </div>

        {/*Comments And Answers for each feed */}
        {answers.map((feed, index) => {
          return (
            <div key={"answer" + index}>
              <Comment
                 actions={actionForFeedContent(feed)}
                author={<a>{feed.userName}</a>}
                avatar={
                  <Avatar
                    size="large"
                    src="https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
                    alt="Han Solo"
                  />
                }
                content={<p>{feed.answer}</p>}
              />

              <Divider />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedDetail;
