import React, {
  createElement,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Comment, Tooltip, Avatar, Divider, Button, Tag } from "antd";
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
import { Redirect, Link } from "react-router-dom";
import { PresetColorTypes } from "antd/lib/_util/colors";

const labelColors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const InterestsFields1 = [
  "343",
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

const Feed = ({
  whatToShow,
  onFeedClick,
  user,
  sort,
  toSort,
  searchQuery,
  selectedInterests,
}) => {
  const [currentFeed, setCurrentFeed] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [feeds, updateFeed] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFeed, setModalFeed] = useState([]);

  const observer = useRef();
  const lastFeedElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if(hasMore){
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const ClickForModal = (feed) => {
    if (user) {
      setIsModalVisible(true);
      setModalFeed(feed);
    } else {
      <Redirect to="/login" />;
    }
  };

  const onActionClicked = async (type, feed) => {
    await axios.post(
      "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/viewcount",
      { typeId: feed.id, type: "question" },
      {
        headers: user ? { Authorization: `${user.token}` } : null,
      }
    );
    if (user != null) {
      setCurrentFeed(feed);

      let feedsCopy = feeds;

      if (type == "like") {
        let response;
        if (feed.isUserLiked) {
          response = await axios.post(
            "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like",
            { typeId: feed.id, type: "question", like: 0 },
            {
              headers: { Authorization: `${user.token}` },
            }
          );
        } else if (!feed.isUserLiked) {
          response = await axios.post(
            "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like",
            { typeId: feed.id, type: "question", like: 1 },
            {
              headers: { Authorization: `${user.token}` },
            }
          );
        }
        if (response.data.success && feed.isUserLiked) {
          feedsCopy.map((value) => {
            if (value.id == feed.id) {
              value.likes = value.likes - 1;
              value.isUserLiked = false;
            }
          });
          setCurrentFeed({ ...feed, liked: false });
          console.log(feedsCopy);
          updateFeed(feedsCopy);
        } else if (response.data.success && !feed.isUserLiked) {
          feedsCopy.map((value) => {
            if (value.id == feed.id) {
              value.likes = value.likes + 1;
              value.isUserLiked = true;
            }
          });
          setCurrentFeed({ ...feed, liked: true });
          console.log("liked");
          updateFeed(feedsCopy);
        }
      }
    }
  };

  useEffect(async () => {
    window.scrollTo(0, 0)
    updateFeed([]);
    setPageNumber(1);
    

    if (whatToShow == "home") {
      let response;
      let checkedList = selectedInterests.map((value) =>
        InterestsFields1.indexOf(value)
      );
      console.log("userFeed");
      response = await axios.get(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed?page=1&filter=random&interests=${checkedList}`,
          user ? {headers: { Authorization: `${user.token}` } } : ''
      );

      if (response && response.data.success === true) {
        if (response.data.data.length == 0) setHasMore(false); else setHasMore(true);
        updateFeed(response.data.data);
      }
    }
    else if(whatToShow=="search"){
      let cancel;
    axios({
      method: "GET",
      url: `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/search`,
      params: { page: 1, q: searchQuery },
      headers: user ? { Authorization: `${user.token}` } : "",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        if (response.data.data.length == 0) setHasMore(false); else setHasMore(true);
        updateFeed(response.data.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
    }

    
  }, [whatToShow, user, selectedInterests,searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0)
    if (sort) {
      let newData = [...feeds]
        .sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0))
        .reverse();
      updateFeed(newData);
      toSort(false);
    }
  }, [sort]);

  useEffect(async () => {
    if (whatToShow == "home") {
      let checkedList = selectedInterests.map((value) =>
        InterestsFields1.indexOf(value)
      );

      let response = await axios.get(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed?page=${pageNumber}&filter=random&interests=${checkedList}`,

        user ? { headers: { Authorization: `${user.token}` } } : ""
      );

      if (response && response.data.success) {
        if (response.data.data.length == 0) setHasMore(false); else setHasMore(true);
        updateFeed((prevFeedData) => {
          return [...new Set([...prevFeedData, ...response.data.data])];
        });
      }
    } else if (whatToShow == "search") {
      let cancel;
      axios({
        method: "GET",
        url: `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/search`,
        params: { page: pageNumber, q: searchQuery },
        headers: user ? { Authorization: `${user.token}` } : "",
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((response) => {
          if (response.data.data.length == 0) setHasMore(false); else setHasMore(true);
          updateFeed((prevFeedData) => {
            return [...new Set([...prevFeedData, ...response.data.data])];
          });
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
      return () => cancel();
    }
  }, [pageNumber]);

  //search Query
  // useEffect(async () => {
  //   window.scrollTo(0, 0)
  //   updateFeed([]);
  //   setPageNumber(1);
    
  // }, [searchQuery]);

  const actions = (feed) => {
    let FeedActions = [
      <Tooltip key="comment-basic-like" title="Answer">
        <span
          onClick={() => ClickForModal(feed)}
          style={{ fontSize: "16px", color: "black" }}
        >
          <EditFilled style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.answers}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="Like">
        <span
          onClick={() => onActionClicked("like", feed)}
          style={{ fontSize: "16px" }}
        >
          {createElement(feed.isUserLiked ? HeartFilled : HeartOutlined, {
            style: { color: "black" },
          })}
          <span className="comment-action iconPositon">{feed.likes}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="Comment">
        <Link to={"question/" + feed.id}>
          <span style={{ fontSize: "16px", color: "black" }}>
            <CommentOutlined style={{ fontSize: "16px" }} />
            <span className="comment-action iconPositon">{feed.comments}</span>
          </span>
        </Link>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span style={{ fontSize: "16px", color: "black" }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.views}</span>
        </span>
      </Tooltip>,
      <Tooltip title="Click to Copy">
        <ShareAltOutlined
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.host + "/question/" + feed.id
            );
          }}
          style={{ fontSize: "16px", paddingTop: "6px", color: "black" }}
        />
      </Tooltip>,
    ];

    if (whatToShow == "answers") {
      FeedActions.splice(0, 1);
    }
    return FeedActions;
  };

  return (
    <>
      <AnswerModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        feed={modalFeed}
        user={user}
        updateFeed={updateFeed}
        feeds={feeds}
        setCurrentFeed={setCurrentFeed}
      />
      {feeds.map((feed, index) => {
        if (feeds.length === index + 1) {
          console.log("no of times you are here");
          return (
            <div key={index} ref={lastFeedElementRef}>
              <Comment
                //className="contentWrap"
                actions={actions(feed)}
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
                    src={feed.profilePic ? feed.profilePic : "/profile.png"}
                    alt="Han Solo"
                  />
                }
                content={
                  <Link style={{ color: "black" }} to={"question/" + feed.id}>
                    <p
                      style={{ fontSize: "16px", color: "black" }}
                      onClick={async () => {
                        await axios.post(
                          "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/viewcount",
                          { typeId: feed.id, type: "question" },
                          {
                            headers: user
                              ? { Authorization: `${user.token}` }
                              : null,
                          }
                        );
                      }}
                    >
                      {feed.question}
                    </p>
                  </Link>
                }
              />
              {feed.interests.map((interest, index) => (
                <Tag color={labelColors[index % 11]}>{interest.name}</Tag>
              ))}
              <Divider />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <Comment
                className="contentWrap"
                actions={actions(feed)}
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
                content={
                  <Link to={"question/" + feed.id}>
                    <p
                      style={{ fontSize: "16px" }}
                      onClick={async () => {
                        await axios.post(
                          "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/viewcount",
                          { typeId: feed.id, type: "question" },
                          {
                            headers: user
                              ? { Authorization: `${user.token}` }
                              : null,
                          }
                        );
                      }}
                    >
                      {feed.question}
                    </p>
                  </Link>
                }
              />
              {feed.interests.map((interest, index) => (
                <Tag color={labelColors[index % 11]}>{interest.name}</Tag>
              ))}
              <Divider />
            </div>
          );
        }
      })}
    </>
  );
};
export default Feed;
