import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery  } from "react-query";
import PostItem from "../../components/PostItem";
import UserItem from "../../components/UserItem";
import ChangePassword from "../../components/ChangePassword";
import MyInfo from "../../components/MyInfo";
import Profile from "../../components/Profile";
import { useHashtags } from "../../contexts/HashtagContext";
import { useFriend } from "../../contexts/FriendContext";
import { jwtDecode } from "jwt-decode";
import "./style.css"

function MyProfile() {
    const {user,updateUser} = useAuth();
    const {handleHashtags} = useHashtags();
    const {handleRemoveFriend} = useFriend();
    const storedToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(storedToken);
    const [activeButton, setActiveButton] = useState("Posts");

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };
    
    const { data, isLoading, error } = useQuery(
      ['posts',decodedToken,user], () => 
      axios.get(`https://meowblog.onrender.com/posts/user/${decodedToken.userId}`)
      .then((response) => response.data)
    );
    useEffect(()=>{
      updateUser()
    },[user,data]);
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error fetching posts: {error.message}</p>;
    }

    if (user == null || user.friendRequests == null) {
      return <p>No results found1.</p>;
    }
    return (
        <div>
           <div className="btn-group mt-3 d-flex justify-content-center" role="group" aria-label="Vertical button group">
              <button
                type="button"
                className={`buttonswitch ${activeButton === "Posts" ? 'active' : ''}`}
                onClick={() => handleButtonClick("Posts")}>
                Post
              </button>
              <button
                type="button"
                className={`buttonswitch ${activeButton === "List Friend" ? 'active' : ''}`}
                onClick={() => handleButtonClick("List Friend")}>
                List Friend
              </button>
              <button
                type="button"
                className={`buttonswitch ${activeButton === "My Info" ? 'active' : ''}`}
                onClick={() => handleButtonClick("My Info")}>
                My Info
              </button>
              <button
                type="button"
                className={`buttonswitch ${activeButton === "Change Password" ? 'active' : ''}`}
                onClick={() => handleButtonClick("Change Password")}>
                Change PassWord
              </button>
            </div>
        <div className="row mt-3 d-flex justify-content-evenly my-profile-container">
          <div className="col-4 mt-3">
            <Profile user={user}/>
          </div>
          {activeButton=="List Friend" && (
          <div className="col-7 friend-container mt-3">
            <h2 className="text-center title-item">Friends</h2>
            <ul>
              {user.friend.map((friend)=>(
                <UserItem key={friend._id} user={friend}
                isFriend={user.friend && user.friend.some((user) => user._id === friend._id)}
                onRemoveFriend={() => {handleRemoveFriend(friend._id)}}/>
              ))}
            </ul>
          </div> 
          )}
          {activeButton=="Posts" && (
            <div className="col-7 friend-container mt-3">
            <h2 className="text-center title-item">Posts</h2>
            <ul>
              {data.data.length==0 
              ?<h4 className="text-center mt-5">You Don't Have Any Post !!!</h4> 
              :(
                data.data.map((post) => (
                  <PostItem key={post._id} post={post} handleHashtags={handleHashtags}/>
                  ))
              )}
            </ul>
        </div>
          )}
          {activeButton=="Change Password" &&(
            <div className="col-7 friend-container mt-3">
              <h2 className="text-center title-item">Change Password</h2>
              <ChangePassword userId={user._id}/>
            </div>
          )}
          {activeButton == "My Info" && (
              <div className="col-7 friend-container mt-3">
              <h2 className="text-center title-item">My Info</h2>
              <MyInfo userId={user._id}/>
              </div>
          )}
        </div>
      </div>
    )
}

export default MyProfile;