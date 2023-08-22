import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfile } from '../services/unauthorized';
import { useParams } from 'react-router-dom';
import { setProfile } from '../app/userSlice';
import { Col, Row } from 'react-bootstrap';

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.userSlice.profile);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await GetProfile(dispatch, username);
        dispatch(setProfile(profileData));
      } catch (error) {
        console.log("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, username]);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <p>Loading...</p>
        </div>
      ) : myProfile ? (
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
      ) : (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column' }}>
          <h2 className='text-center'>A user with username {username} does not exist !</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
