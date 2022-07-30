import React, { useState } from 'react';
import { Button } from '@mui/material';
import firebase from 'firebase/compat/app';
import { storage, db } from './firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './ImageUpload.css';

function ImageUpload({username}) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  
  const handleChange = (e) => {
     if (e.target.files[0]) {
       setImage(e.target.files[0]);
     }
  };

  const handleUploadFile = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ..
        const progress = Math.round(
          (snapshot.bytesTransferred /snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function...
        storage.ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username,     
          });

          setProgress(0);
          setCaption('');
          setImage(null);
        })
      }
    )
  };

  return (
    <div className='imageupload'>
      {/* I want to have... */}
      {/* Caption input */}
      {/* File picker */}
      {/* Post button */}
       
      <progress className='imageupload__progress' value={progress} max='100' />
      <input type="text" placeholder='Enter a caption...'/>
      <input type="file" onChange={handleChange} />
      <Button className='imageupload__button' onClick={handleUploadFile}>
          Upload
       </Button>
    </div>
  )
}

export default ImageUpload;
