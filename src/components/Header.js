import React,{useState} from 'react';

//Importing all related components
import Authentication from './Authentication';

//Importing CSS
import './Header.css';
function Header(props){
    //State variable to user the name of the signin user
    const [user,setUser]=useState('');
    //callback function to get username from authentication component
    const callbackFunction=(username)=>{
        setUser(username);
    }
    //Sending username back to App.js component
    const sendData=()=>{
        props.appCallback(user);
    }
    return(
        <div className="app_header">
            {/* Instagram LoGo */}
            <img className="app_header_image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt="">
            </img>
            {/*Calling the authentication component for signin and signup buttons*/}
            <Authentication parentCallback={callbackFunction} setToken={props.setToken} token={props.token}></Authentication>
            {/* calling senData function to send the username back to app.js */}
            {sendData()}
        </div>
    );
}
export default Header;