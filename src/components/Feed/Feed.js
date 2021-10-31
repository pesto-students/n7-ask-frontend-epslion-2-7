import React, {
  createElement,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
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
import { Redirect,Link } from "react-router-dom";

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

const Feed = ({ whatToShow, onFeedClick, user, sort, toSort, searchQuery,selectedInterests}) => {
  const [currentFeed, setCurrentFeed] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [feeds, updateFeed] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFeed, setModalFeed] = useState([]);

  const observer = useRef();
  const lastFeedElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

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
     
      if (type == "like") {
        let response
        if(feed.isUserLiked){
          response = await axios.post(
            "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like",{ typeId: feed.id, type: "question", like: 0 },
            {
              
              headers: { Authorization: `${user.token}` }
            }
          )


        }
        else if(!feed.isUserLiked){
          response = await axios.post(
            "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like",{ typeId: feed.id, type: "question", like: 1 },
            {
            
              headers: { Authorization: `${user.token}` }
            }
          )

        }
        if(response.data.success && feed.isUserLiked){
          feedsCopy.map((value) => {
            if (value.id == feed.id) {
              value.likes = value.likes - 1;
              value.isUserLiked = false;
            }
          });
          setCurrentFeed({ ...feed, liked: false });
          console.log(feedsCopy);
          updateFeed(feedsCopy);

        }
        else if(response.data.success && !feed.isUserLiked){
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
    updateFeed([]);
    setPageNumber(1);
    let response;
    if (user) {
      
      if (whatToShow == "home") {
        console.log("userFeed")
        response = await axios.get(
          `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed?page=1&filter=random&interests=`,
          {
            headers: { Authorization: `${user.token}` },
          }
        );
      } else if (whatToShow == "questions") {
      } else if (whatToShow == "answers") {
      } else if (whatToShow == "random") {
      } else if (whatToShow == "trending") {
      }
      else if(whatToShow=="interestsList"){
        let checkedList = selectedInterests.map(value =>InterestsFields1.indexOf(value))
        
        response = await axios.get(
          `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed?page=1&filter=random&interests=${checkedList}`,
          {
            headers: { Authorization: `${user.token}` },
          }
         
        )
       
        
      }
    } else {
      console.log("normalFeed")
      if (whatToShow == "home") {
        response = await axios.get(
          `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed`,
          { params: { page: 1 } }
        );
      }
      else if(whatToShow=="interestsList"){
        let checkedList = selectedInterests.map(value =>InterestsFields1.indexOf(value))
        
        response = await axios.post(
          `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed?page=1&filter=random&interests=${checkedList}`
        )
        
      }
      else if (whatToShow == "questions") {
      } else if (whatToShow == "answers") {
      } else if (whatToShow == "random") {
      } else if (whatToShow == "trending") {
      }
    }
    if (response && response.data.success === true) {
      updateFeed(response.data.data);
    }
  }, [whatToShow, user, selectedInterests]);

  useEffect(() => {
    if (sort) {
      let newData = [...feeds]
        .sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0))
        .reverse();
      updateFeed(newData);
      toSort(false);
    }
  }, [sort]);

  useEffect(async () => {
    let response;
    if (user) {
      if (whatToShow == "home") {
        console.log("when user is logged in " + user.token);
        response = await axios.get(
          `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed?page=${pageNumber}&filter=random&interests=`,
          {
            headers: { Authorization: `${user.token}` },
          }
        );
      }
    } else {
      if (whatToShow == "search") {
        let cancel;
        axios({
          method: "GET",
          url: `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/search`,
          params: { page: pageNumber, q: searchQuery },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
          .then((response) => {
            updateFeed((prevFeedData) => {
              return [...new Set([...prevFeedData, ...response.data.data])];
            });
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        return () => cancel();
      }
      response = await axios.get(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/feed`,
        { params: { page: pageNumber } }
      );
    }

    if (response && response.data.success === true && whatToShow != "search") {
      updateFeed((prevFeedData) => {
        return [...new Set([...prevFeedData, ...response.data.data])];
      });
    }

    // const response = await axios.get(`http://localhost:3000/${whatToShow}`);

    // updateFeed(response.data);
    // console.log(feeds);

    console.log("mounted");

    return () => console.log("unmounting...");
  }, [pageNumber]);

  //search Query
  useEffect(async () => {
    updateFeed([]);

    let cancel;
    axios({
      method: "GET",
      url: `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/search`,
      params: { page: 1, q: searchQuery },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        updateFeed(response.data.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [searchQuery]);

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
        <span
          onClick={onActionClicked}
          style={{ fontSize: "16px", color: "black" }}
        >
          <CommentOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.comments}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span
          onClick={onActionClicked}
          style={{ fontSize: "16px", color: "black" }}
        >
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.viewCount}</span>
        </span>
      </Tooltip>,

      <ShareAltOutlined
        style={{ fontSize: "16px", paddingTop: "6px", color: "black" }}
      />,
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
      />
      {feeds.map((feed, index) => {
        if (feeds.length === index + 1) {
          console.log("no of times you are here")
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
                  <Link style={{color:"black"}} to={'question/'+feed.id}>
                  <p
                    style={{ fontSize: "16px", color:"black" }}
                    // onClick={() => onFeedClick(feed)}
                  >
                    {feed.question}
                  </p>
                  </Link>
                }
              />
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
                  <Link to={'question/'+feed.id}>
                    <p
                    style={{ fontSize: "16px" }}
                    // onClick={() => onFeedClick(feed)}
                  >
                    {feed.question}
                  </p>
                  
                  </Link>
                  
                }
              />
              <Divider />
            </div>
          );
        }
      })}
    </>
  );
};
export default Feed;
