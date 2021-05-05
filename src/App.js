import{useState,useEffect} from 'react';
import axios from 'axios';

//Importing CSS
import './App.css';

//Importing all related components
import Header from './components/Header'
import Post from './components/Post';

//Creating App function component
function App() {
  //tokenstring for storing the session
  const tokenString=sessionStorage.getItem("token")
  //storing the toekenstring inside local state variable token using useState hooks 
  const [token, setToken] = useState(tokenString);
  //Initial_posts array to store all the posts
  const[posts,setPosts]=useState([]);     
  //State var to store signin username
  const [user,setUser]=useState('')
  //Using useEffect hook for getting all the data about posts from the database using
  //node API http://localhost:4000/ .
  useEffect(()=>{
    // creating Async function to wait untill we get all the data from the server
    async function getData(){
      const res=await axios.get('http://localhost:4000/')
      //setting the posts
      setPosts(res);
    }
    //Calling the async function
    getData();
  },[posts])//This useEffect will be called everytime something changed with posts
  //end of useEffect
  //callback function to get username from header.js
  const callbackFunction=(username)=>{
    setUser(username);
  }
  //If there is no token, it means user did'nt sign in. If there is no user or token, ask user to sign in first
  if(!token) {
    //if no token, only show the header
    return <Header setToken={setToken} appCallback={callbackFunction} />
  }
  else{ 
    //if there is token available, show all the posts

    //Store the token inside session storage
    sessionStorage.setItem("token",token)
    return (
    <div className="App">
      {/* using Header component */}
      <Header appCallback={callbackFunction} setToken={setToken}token={token}/>     
      <h1>welcome to instagram clonning </h1>
      {/* using Post component*/}
      <div className="all_posts">
      {
        posts.length<=0?(""):
        (posts.data.map((post)=>(
          <Post signedinUser={user} postId={post._id} key={post._id} username={post.username} caption={post.caption} imageurl={post.imageurl} comments={post.comments}/>
        )))
      }
      </div>
    </div>
    );
  }
}
export default App;
