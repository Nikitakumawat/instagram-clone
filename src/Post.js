import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import './Post.css';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user && user.displayName ? user.displayName : null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setComment('');
  }

  return (
    <div className='post'>
      {/* header -> avatar + username */}
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      {/* image */}
      <img className='post__image' src={imageUrl} alt="" />
      {/* username + caption */}
      <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
      <div className='post__comments'>
        {
          comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))
        }

      </div>
         <form className='post__commentBox'>
         <input
           className='post__input'
           type='text'
           placeholder='Add a comment..'
           value={comment}
           onChange={(e) => setComment(e.target.value)}
         />
         <button
           className='post__button'
           disabled={!comment}
           type='submit'
           onClick={postComment}
         >
           Post
         </button>
        </form> 
    </div>
  )
}

export default Post;
