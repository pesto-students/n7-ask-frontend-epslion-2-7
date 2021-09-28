import React, { createElement, useEffect, useState } from "react";
import "./FeedDetail.css";
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
      <TextArea rows={4}  value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={()=>onAnswerSubmit(value)}
        type="primary"
      >
        Answer
      </Button>
    </Form.Item>
  </>
);

function FeedDetail({ setShowDetailFeed, feedContent, user }) {
  useEffect(async () => {
    console.log("mounted");

    return () => setShowDetailFeed(false), console.log("unmounting...");
  }, []);




  const onActionClicked= (type, feed)=>{

  }

  const onAnswerSubmit =( value) =>{
    //user to submit their answer.
  }




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
          onClick={() => onActionClicked("like", feed)}
          style={{ fontSize: "16px" }}
        >
          {createElement(feed.liked ? HeartFilled : HeartOutlined)}
          <span className="comment-action" style={{ fontSize: "12px" }}>
            {feed.likes}
          </span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="Comment">
        <span onClick={onActionClicked} style={{ fontSize: "16px" }}>
          <CommentOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action" style={{ fontSize: "12px" }}>
            {feed.comments}
          </span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span onClick={onActionClicked} style={{ fontSize: "16px" }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action" style={{ fontSize: "12px" }}>
            {feed.viewCount}
          </span>
        </span>
      </Tooltip>,

      <ShareAltOutlined style={{ fontSize: "16px" }} />,
    ];

   
   
  };




















  const actions = (feed) => {
    return [
      <Button className="FeedDetailBtn">{feed.answers} Answers</Button>,
      <Button className="FeedDetailBtn">{feed.comments} Comments</Button>,

      <Tooltip key="comment-basic-like" title="Like">
        <HeartOutlined style={{ fontSize: "16px" }} />
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span onClick={"Dfsdf"} style={{ fontSize: "16px" }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action" style={{ fontSize: "12px" }}>
            {feed.viewCount}
          </span>
        </span>
      </Tooltip>,

      <ShareAltOutlined style={{ fontSize: "16px" }} />,
    ];
  };

  return (
    <div className="FeedContainer">
      <div id="FeedContent">
        <Comment
          actions={actions(feedContent)}
          author={<a>{feedContent.name}</a>}
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
          content={<p style={{ fontSize: "16px" }}>{feedContent.userPost}</p>}
        />



        {/* Answer portal hidden based on user logged in*/}
        <div>
          <Comment hidden={user!=null ? false : true}
            avatar={<Avatar src={user} alt="Han Solo" />}
            content={<Editor onAnswerSubmit={onAnswerSubmit} />}
          />
        </div>
        

        {/*Comments And Answers for each feed */}
        {feedContent.details.map((feed, index) => {
          return (
            <div key={"feed" + index}>
              <Comment
                actions={actionForFeedContent(feed)}
                author={<a>{feed.name}</a>}
                avatar={
                  <Avatar
                    size="large"
                    src="https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
                    alt="Han Solo"
                  />
                }
                content={<p>{feed.userPost}</p>}
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
