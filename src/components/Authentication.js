import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
//Importing all the components required
import Signinmodal from './Signinmodal';
import Signupmodal2 from './Signupmodal2'
import ImageUpload from './ImageUpload';
//Importing CSS
import './Authentication.css';
function Authentication(props){
    //State variable to store sign in user
    const [user,setUser]=useState(null);
    //State variable to store the image upload button state:open or close
    const[openImageUpload,setopenImageUpload]=useState(false);
    //Send data function to send the username to parent component(Hearder.js)
    const sendData=()=>{
        props.parentCallback(user);
    }
    //function to open image upload box
    const handleImageButton=(e)=>{
        //If image upload modal is closed open it, If its open close it
        setopenImageUpload(!openImageUpload);
    }
    //Logout Button
    const logout=(e)=>{
        //clear the token
       props.setToken("")
    }
    return(
        <div>
            {/* if user signedin and click on image upload button the open image upload modal */}
            {(user && props.token)? (//if user is signed in and token available
               openImageUpload && //and click on the image upload button
                <ImageUpload username={user}openImageUpload={openImageUpload} setopenImageUpload={setopenImageUpload}></ImageUpload>  //then show me the images
            ):(
              <h3>you need to login to upload</h3>
            )}
            {/* if user logged in, show logout and imageupload button, else show signin and signup button */}
            {(user&&props.token)?(
                <div className="container">
                    {/* SIGNED IN USER AVATAR */}
                    <Avatar style={{height: '50px', width: '50px'}} className="post_avatar"alt={user} src="image.jpg" />
                    {/* image upload button */}
                    <i class="far fa-images imageIcon" onClick={handleImageButton}></i>
                    {/* logout button */}
                    <Button variant="outlined" onClick={logout}>logout</Button>
                </div>
                ):(
                <div className="app_logincontainer">
                    <Signinmodal user={user} setUser={setUser} setToken={props.setToken}></Signinmodal>
                    <Signupmodal2 user={user} setUser={setUser}></Signupmodal2>
                 </div>
            )}
            {/* calling send data */}
            {sendData()} 
        </div>
    )
}
export default Authentication;