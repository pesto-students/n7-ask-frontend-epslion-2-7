import React, { createElement, useState, useEffect } from "react";
import { Comment, Tooltip, Avatar, Divider, Button } from "antd";
import axios from "axios";
import moment from "moment";
import "./Feed.css";
import {
  CommentOutlined,
  ShareAltOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  EditFilled,
} from "@ant-design/icons";
import AnswerModal from "../Modal/AnswerModal";
import { Redirect } from "react-router-dom";

const Feed = ({ whatToShow, onFeedClick, user, sort }) => {
  const [currentFeed, setCurrentFeed] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [feeds, updateFeed] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFeed, setModalFeed] = useState([]);

  const ClickForModal = (feed) => {
    if (user != null) {
      setIsModalVisible(true);
      setModalFeed(feed);
    } else {
      <Redirect to="/login" />;
    }
  };

  const onActionClicked = async (type, feed) => {
    if (user != null) {
      setCurrentFeed(feed);

      let feedsCopy = feeds;
      //send the http request
      if (type == "like") {
        /*production
      const response = await axios.post("https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like", {typeId:feed.id, type:"question", like:1});
      console.log(response)
      if(response.success){

      }*/
        if (feed.liked) {
          const response = true;
          if (response) {
            feedsCopy.map((value) => {
              if (value.id == feed.id) {
                value.likes = value.likes - 1;
                value.liked = false;
              }
            });
            setCurrentFeed({ ...feed, liked: false });
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
            setCurrentFeed({ ...feed, liked: true });
            console.log("liked");
            updateFeed(feedsCopy);
          }
        }
      }
    }
  };

  useEffect(async () => {
    /*production
    if (sort) {
      let newData = [...feeds]
        .sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0))
        .reverse();
      updateFeed(newData);
    }
    else{
    const response = await axios.get(
      `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed`,
      { params: { page: 1 } }
    );
    console.log(response.data);
    if (response.data.success === true) {
      updateFeed(response.data.data);
    }
    }*/

    if (sort) {
      let newData = [...feeds]
        .sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0))
        .reverse();
      updateFeed(newData);
    } else {
      const response = await axios.get(`http://localhost:3000/${whatToShow}`);
      updateFeed(response.data);
      console.log(feeds);
    }

    console.log("mounted");

    return () => console.log("unmounting...");
  }, [whatToShow, sort]);

  const actions = (feed) => {
    let FeedActions = [
      <Tooltip key="comment-basic-like" title="Answer">
        <span onClick={() => ClickForModal(feed)} style={{ fontSize: "16px" }}>
          <EditFilled style={{ fontSize: "16px" }} />
          <span className="comment-action" style={{ fontSize: "12px" }}>
            {feed.answers}
          </span>
        </span>
      </Tooltip>,

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

    if (whatToShow == "answers") {
      FeedActions.splice(0, 1);
    }
    return FeedActions;
  };

  return (
    <>
      {feeds.map((feed, index) => {
        return (
          <div key={feed.id}>
            <AnswerModal
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
              feed={modalFeed}
              user={user}
            />

            <Comment
              className="contentWrap"
              actions={actions(feed)}
              author={
                <h3 style={{ color: "black" }}>
                  <b>{feed.name}</b>
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
              content={
                <p
                  style={{ fontSize: "16px" }}
                  onClick={() => onFeedClick(feed)}
                >
                  {feed.userPost}
                </p>
              }
            />
            <Divider />
          </div>
        );
      })}
    </>
  );
};
export default Feed;
