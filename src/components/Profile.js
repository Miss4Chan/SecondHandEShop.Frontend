import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfile } from '../services/user';
import { useParams } from 'react-router-dom';
import { setProfile } from '../app/userSlice'; 
import { Col, Row } from 'react-bootstrap';

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.userSlice.profile); 
  console.log(myProfile)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await GetProfile(dispatch, username); 
        dispatch(setProfile(profileData));
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
          <h2>Username: {myProfile.username}</h2>
          <p>Name: {myProfile.name}</p>
          <p>Surname: {myProfile.surname}</p>
          <p>Email: {myProfile.email}</p>
          <p>Phone: {myProfile.phone}</p>
          <p>Address: {myProfile.address}</p>

          {/* Display rating and rating count */}
          <p>Rating: {myProfile.rating}</p>
          <p>Rating Count: {myProfile.ratingCount}</p>

          {/* Display comments */}
          <h5>Comments:</h5>
          {myProfile.comments && myProfile.comments.length > 0 ? (
            myProfile.comments.map((comment) => (
              <div key={comment.id}>
                <p>Content: {comment.content}</p>
                <p>Date: {comment.commentDate}</p>
                <p>Commenter: {comment.commenterUsername}</p>
                {/* Add receiver username if needed */}
              </div>
            ))
          ) : (
            <p>No comments found.</p>
          )}
        </div>
      )}

      <h5>{myProfile.username}`s products</h5>
      {myProfile && myProfile.products && myProfile.products.length > 0 ? (
        myProfile.products.map((item) => (
          <Row key={item.id} style={{ marginBottom: '2rem' }}>
            <Col>{item.productName}</Col>
            <Col>{item.productPrice}</Col>
          </Row>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Profile;
