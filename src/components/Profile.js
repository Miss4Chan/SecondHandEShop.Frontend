import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfile } from '../services/user';
import { useParams } from 'react-router-dom';
import { setProfile } from '../app/userSlice'; // Import the setMyProfile action

const Profile = () => {
  const { username } = useParams();
  console.log(username);
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.userSlice.profile); // Declare myProfile using useSelector
  console.log("myProfile")
console.log(myProfile)

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            console.log('useEffect called with username:', username);
          const profileData = await GetProfile(dispatch, username); // Rename 'myProfile' to 'profileData'
          dispatch(setProfile(profileData));
          console.log("ProfileData")
          console.log(profileData)
        } catch (error) {
          console.log("Error fetching profile", error);
        }
      };
  
      fetchProfile();
  }, [dispatch, username]);

  return (
    <div>
      {myProfile && (
        <div>
          <h2>Username : {myProfile.username}</h2>
          <p>Name: {myProfile.name}</p>
          <p>Surname: {myProfile.surname}</p>
          <p>Email: {myProfile.email}</p>
          <p>Phone: {myProfile.phone}</p>
          <p>Address: {myProfile.address}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
