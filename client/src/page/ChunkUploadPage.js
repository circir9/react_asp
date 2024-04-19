import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {

  // const handleFileChange = (e) => {
  //   setFile(e.target.file.files[0]);
  // };

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    const CHUNK_SIZE = 1024*1024 ; // 1MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const formData = new FormData();
      const start = chunkIndex * CHUNK_SIZE;
      var chunk = file.slice(start, start + CHUNK_SIZE);
      formData.append("chunkFile", chunk);

      // Make API call to upload chunk
      try {

        await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/api/Chunk?index=${chunkIndex}&filename=${file.name}`, formData,{
            headers: {
            "Content-Type": "multipart/form-data",
            }
        });

        // Handle response if needed
        console.log(`Chunk ${chunkIndex + 1}/${totalChunks} uploaded.`);
      } catch (error) {
        console.error('Error uploading chunk:', error);
      }
    }

    // Notify server to merge chunks
    // Example: fetch('YOUR_BACKEND_MERGE_ENDPOINT', { method: 'POST' });
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="file"/>
        <input type="submit" value="上傳" />
      </form>
    </div>
  );
};

export default FileUpload;