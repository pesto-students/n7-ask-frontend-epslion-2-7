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

const Editor = ({ user , questionId, selectedButton, setanswerOrCommClicked, answerOrCommClicked}) => {

  const [textInput, setTextInput]= useState("");

  function handleTextChange(e) {
    setTextInput(e.target.value);   
  }

 

  const onAnswerSubmit = async () => {
    if(selectedButton=="answers"){
      await axios.post(
        "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/answer",
        { answer: textInput, questionId: questionId  },
        { headers: { Authorization: `${user.token}` } }
      ).then(res => {
        if(res.data.success){
          setTextInput("")
          if(answerOrCommClicked){
            setanswerOrCommClicked(false)
          }
          else{
            setanswerOrCommClicked(true)
          }
          
        }
      })

    }
    else{
      await axios.post(
        "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/comment",
        { type: "question", typeId: questionId , comment:textInput },
        { headers: { Authorization: `${user.token}` } }
      ).then(res => {
        if(res.data.success){
          setTextInput("")
          if(answerOrCommClicked){
            setanswerOrCommClicked(false)
          }
          else{
            setanswerOrCommClicked(true)
          }
          
          
        }
      })

    }
    
  

   //post request
 };


  return(
  <>
    <Form.Item>
      <TextArea rows={4} 
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
      {selectedButton=="answers" ? "Answer" : "Comment"}
      </Button>
    </Form.Item>
  </>
  )
};

function FeedDetail({ setShowDetailFeed, feedContent, user }) {
  let { id } = useParams();
  const [selectedButton, setSelectedButton ]  = useState("answers")
  const [ questionDetails, setQuestionDetails ] = useState([{}]);
  const [answers, setAnswers]= useState([{}]);
  const [comments, setComments]= useState([{}]);
  const [answerOrCommClicked, setanswerOrCommClicked]= useState(false)
  const [likeToggle, setLikeToggle] = useState(false)
  const [IconColor, setColorIcon] = useState("grey")
 
  useEffect(()=>{
    if(user){
      setColorIcon("black")
    }

  },[user])

  useEffect( () => {
   
   async function fetchData(){
     
      const questionReq = await axios.get(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/question/${id}`,
        {
          headers: user ? { Authorization: `${user.token}` } : ""
        }
      );
      if (questionReq && questionReq.data.success) {
        console.log(questionReq.data.data)
        setQuestionDetails(questionReq.data.data);
      }
      const answerReq = await axios.get(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/answers/${id}`,
        {
          headers: user ? { Authorization: `${user.token}` } : ""
        }
      );
      if(answerReq.data.success){
        setAnswers(answerReq.data.data)
  
      }
      const commentsReq = await axios.get(
        `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/comments/${id}/question`,
        {
          headers: user ? { Authorization: `${user.token}` } : ""
        }
      );
      if(commentsReq.data.success){
        setComments(commentsReq.data.data)
  
      }
    //  else{
    //   const questionReq = await axios.get(
    //     `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/question/${id}`
    //   );
    //   if (questionReq && questionReq.data.success) {
    //     console.log(questionReq.data.data)
    //     setQuestionDetails(questionReq.data.data);
    //   }
    //   const answerReq = await axios.get(
    //     `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/answers/${id}`
    //   );
    //   if(answerReq.data.success){
    //     setAnswers(answerReq.data.data)
  
    //   }
    //   const commentsReq = await axios.get(
    //     `https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/comments/${id}/question`
    //   );
    //   if(commentsReq.data.success){
    //     setComments(commentsReq.data.data)
  
    //   }

    //  }
   }
   fetchData();
    

    

    
  },[id,answerOrCommClicked,likeToggle]);
  

  

  const onActionClicked = async(type, feed,feedType) => {
    await axios.post(
      "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/viewcount",
      { typeId: feed.id, type: feedType },
      {
        headers: user ? { Authorization: `${user.token}` } : null,
      }
    );
    console.log("onActionCLicked")
    if(user){
      console.log("onActionCLicked")
      if(user){

        if(type=="like"){
          let likeRes = await axios.post("https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/like", {typeId:feed.id, type:feedType, like: feed.isUserLiked ? 0 : 1},
          {
            headers: { Authorization: `${user.token}` }
          }
          
          )
          if(likeRes && likeRes.data.success){
            if(likeToggle){
              setLikeToggle(false)
            }else{
              setLikeToggle(true)
            }
            console.log("like succesfully added");
          }
        }
      }
      

    }
   


    
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

  const actionForFeedContent = (feed,feedType) => {
    return [
      <Tooltip key="comment-basic-like" title="Like">
        <span
          onClick={() => onActionClicked("like",feed,feedType)}
          style={{ fontSize: "16px", color: `${IconColor}` }}
        >
          {createElement(feed.isUserLiked ? HeartFilled : HeartOutlined)}
          <span className="comment-action iconPositon">{feed.likes}</span>
        </span>
      </Tooltip>,

      // <Tooltip key="comment-basic-like" title="Comment">
      //   <span onClick={onActionClicked} style={{ fontSize: "16px" }}>
      //     <CommentOutlined style={{ fontSize: "16px" }} />
      //     <span className="comment-action iconPositon">{feed.comments}</span>
      //   </span>
      // </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span style={{ fontSize: "16px", color: `${IconColor}` }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action iconPositon">{feed.views}</span>
        </span>
      </Tooltip>,
      <Tooltip title="Click to Copy">
        <ShareAltOutlined style={{ fontSize: "16px", color: `${IconColor}` }} onClick={() => {navigator.clipboard.writeText(window.location.host + "/question/" + feed.questionId)}} />
      </Tooltip>
      ,
    ];
  };

  const actions = () => {
    return [
      <Button
        role="tab"
        className="FeedDetailBtn"
        onClick={() => setSelectedButton("answers")}
      >
        {questionDetails[0].answers} Answers
      </Button>,
      <Button
      role="tab"
        className="FeedDetailBtn"
         onClick={() => setSelectedButton("comments")}
      >
        {questionDetails[0].comments} Comments
      </Button>,

      <Tooltip key="comment-basic-like" title="Like">
        <span
          onClick={() => onActionClicked("like",questionDetails[0],"question")}
          style={{ fontSize: "16px", color: `${IconColor}` }}
        >
          {createElement( questionDetails[0].isUserLiked ? HeartFilled : HeartOutlined)}
          <span className="comment-action iconPositon">{questionDetails[0].likes}</span>
        </span>
      </Tooltip>,

      <Tooltip key="comment-basic-like" title="View Count">
        <span style={{ fontSize: "16px", color: `${IconColor}` }}>
          <EyeOutlined style={{ fontSize: "16px" }} />
          <span className="comment-action">{questionDetails[0].views}</span>
        </span>
      </Tooltip>,
      <Tooltip title="Click to copy">
        <ShareAltOutlined style={{ fontSize: "16px", paddingTop: "6px",color: `${IconColor}` }} onClick={() => {navigator.clipboard.writeText(window.location.host + "/question/" + questionDetails[0].id)}} />
      </Tooltip>
      ,
    ];
  };

  return (


    <div className="FeedContainer">
      <div id="FeedContent">
        {
        questionDetails.map((item, index)=>(
          <div key={index}>
            <Comment actions={actions()} author={ <h3 style={{ color: "black" }}> <b>{item.userName}</b></h3> }
                avatar={
                <Avatar
                  size={{lg: 80,md: 80, sm: 80, xs: 50, xl: 80,xxl: 80}}
                  src={item.profilePic ? item.profilePic : "/profile.png"}
                />
                }
                content={<p style={{ fontSize: "16px" }}>{item.question}</p>}
             />

           {/* Answer portal hidden based on user logged in*/}
         <div>
          <Comment
            hidden={!user ? true : false}
            avatar={
              <Avatar
                src={user}
                size={{ lg: 80,md: 80,sm: 80,xs: 50,xl: 80, xxl: 80,}}
                alt="Han Solo"
              />
            }
            content={<Editor user={user} questionId={item.id} selectedButton={selectedButton} setanswerOrCommClicked={setanswerOrCommClicked} answerOrCommClicked={answerOrCommClicked}/>}
          />
        </div>
       </div>

        ))}
      
        

       

        {/*Comments And Answers for each feed */}
        { selectedButton=="answers" ? answers.map((feed, index) => {
          return (
            <div key={"answer" + index}>
              <Comment
                 actions={actionForFeedContent(feed,"answer")}
                author={<a>{feed.userName}</a>}
                avatar={
                  <Avatar
                    size="large"
                    src={`/Avatar ${index % 7}.png`}
                    alt="Han Solo"
                  />
                }
                content={<p onClick={async()=>{
                  await axios.post(
                    "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/viewcount",
                    { typeId: feed.id, type: "answer" },
                    {
                      headers: user ? { Authorization: `${user.token}` } : null,
                    }
                  );
                }}>{feed.answer}</p>}
              />

              <Divider />
            </div>
          );
        }) : 
        comments.map((feed, index)=>{
          return(
            <div key={"comment" + index}>
              <Comment
                 actions={actionForFeedContent(feed,"comment")}
                author={<a>{feed.userName}</a>}
                avatar={
                  <Avatar
                    size="large"
                    src="https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
                    alt="Han Solo"
                  />
                }
                content={<p
                  onClick={async()=>{
                    await axios.post(
                      "https://nu47h3l3z6.execute-api.ap-south-1.amazonaws.com/viewcount",
                      { typeId: feed.id, type: "comment" },
                      {
                        headers: user ? { Authorization: `${user.token}` } : null,
                      }
                    );
                  }}>{feed.comment}</p>}
              />

              <Divider />
            </div>

          )
        })}
      </div>
    </div>
  );
}

export default FeedDetail;
