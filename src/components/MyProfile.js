import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetMyProfile } from '../services/user';

const MyProfile = () => {
  const myProfile = useSelector((state) => state.userSlice.myProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    GetMyProfile(dispatch);
  }, []);

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

export default MyProfile;