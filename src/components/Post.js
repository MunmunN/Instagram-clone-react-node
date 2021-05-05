//create the function component
import React, {useState} from 'react';
//Style sheet
import './Post.css';
//Profile avatar of the user
import Avatar from '@material-ui/core/Avatar';
//Importing axios for the requests to the node API
import axios from "axios";

function Post({signedinUser,postId,username,caption,imageurl,comments}){
    //State Varaibles
    const[comment,setComment]=useState('');//single comment...ans setcomment is responsible to change the comment variable
    const[likeButtonActive,setlikeButtonActive]=useState(false);
    const[commentButtonActive,setcommentButtonActive]=useState(false);

    //Function to save comments to the database
    const postComment=(e)=>{
        e.preventDefault();
        const newcomment={
            username:username,
            postId:postId,//which post user enters the comment in
            text:comment
        }
        //Sending the post request to the node API to store the new comment in the database
        axios.post('http://localhost:4000/comments',newcomment)
        setComment('');//Clear the comment input box
    }
    // Function to delete the comment
    const handleDelete=(e)=>{
        e.preventDefault();
        const commentId=e.target.dataset.id;//getting the id from comment
        //Sending the post request to delete the comment having commenID from the mongo DB
        axios.post('http://localhost:4000/delete',{commentId:commentId})
        .then(()=>{
            console.log("Comment Deleted");
        })
        .catch((error)=>{
            console.log("error");
        })
    }
    return(
        //Post Template
        <div className="post">
            {/* Username section */}
            <div className="post_header">
            <Avatar className="post_avatar"alt={username} src="image.jpg" />
                <h1>{username}</h1>
            </div>
            {/* post image section */}
            <img className="post_image" src={imageurl} alt="post_image"></img>
            {/* like button and comment button */}
            {/* If user signed in , show the like and comment button */}
            {signedinUser?(
            <div className="container">
                <i className={`${likeButtonActive? "fas fa-heart": "far fa-heart"} heartIcon `} 
                onClick={()=>{setlikeButtonActive(!likeButtonActive);}}>
                </i>
                <i class="far fa-comment commentIcon" onClick={()=>setcommentButtonActive(!commentButtonActive)}></i>
            </div>
            ):("")}
            {/* caption section */}
            <h3 className="post_caption">{username} :<span className="post_text">{caption}</span></h3>
            {/* Comments */}
            <div className="post_comments">
                {comments.map((c)=>(//c is each comment
                    <p className="single_comment">
                        <div><strong>{c.username}</strong> : {c.text}</div>
                        {/* if user signin in, only show the delete button in front of signin user's comment and when user clicks on delete button
                        pass the comment id to the handle delete function*/}
                        {signedinUser?
                            ((c.username===signedinUser)?
                                (<button className="delete_button" data-id={c.commentId} onClick={handleDelete}>X</button>)
                            :(""))
                        :("")}
                    </p>
                ))}
            </div>
            {/* post comments */}
            {commentButtonActive && signedinUser?(
                <form className="post_commentbox">
                    <input type="text"
                            className="post_input"
                            placeholder="Add Comments.."
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                    ></input>
                    <button className="post_button"
                            type="submit"
                            onClick={postComment}
                    >Post</button>
                </form>
            ):("")}
        </div>
    )
}
export default Post;