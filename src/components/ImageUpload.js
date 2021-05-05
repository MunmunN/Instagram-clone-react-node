import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import {storage} from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ImageUpload.css';
import axios from "axios";

//funtion to set the modal at the center
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  //style for the Modal
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  




function ImageUpload({username,openImageUpload,setopenImageUpload}){//getting login username from authentication.js
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState('');


    //CONST for MODAL
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //these are my form variables and they are empty
    const [modalStyle] = useState(getModalStyle);
   // const [openImageUpload,setopenImageUpload]=useState(false)//sign in modal variable


    //while we are selecting image files
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    //when you click the upload button, push the image inside firebase storage

    const handleUpload=(e)=>{

        setopenImageUpload(false);//close the image upload modal
        //uploading files in firebase
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",(snapshot)=>{

            },
            (error)=>{
                //error while uploading
                console.log(error);
            },
            ()=>{
                //if no errors, go get the uploading image

                //Getting the URL of the image from firebase
                storage.ref("images").child(image.name).getDownloadURL()//get me the url of the uploaded image
                .then(url=>{
                    
                    //save post inside database
                    const newpost={
                        
                        username:username,
                        caption:caption,
                        imageurl:url

                    }
                    //db.collection("posts").add(newpost)//adding post into the firebase
                    axios.post('http://localhost:4000/upload', newpost)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    })

                    setCaption("");
                    setImage(null);
                })
            }
        )
    }
    return(
        <div>
            <Modal
            open={openImageUpload}
            onClose={()=>setopenImageUpload(false)}>
                 <div style={modalStyle} className={classes.paper}>
                    <center>
                    <img className="app_header_image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                         alt="Instagram Logo">
                    </img>
                </center>
                <h3>Make a new post.</h3>
                <input className="caption_input" type="text" 
                placeholder="Enter the caption" 
                onChange={event=>setCaption(event.target.value)}>
                </input>
                <input className="file_input" type="file" onChange={handleChange}></input>
                <Button onClick={handleUpload}>Upload</Button>
                </div>
                
                
            </Modal>
            </div>
          
          
    )
}

export default ImageUpload;