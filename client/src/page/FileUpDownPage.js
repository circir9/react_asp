import React, { useState, useEffect } from "react";
import Axios from "axios";

const ProjectFilePage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/UploadDownload/Files`).then((response) => {
        setFiles(response.data);
    });
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);

    try {
    const response = await Axios.post(`${process.env.REACT_APP_API_SERVER_URL}/api/UploadDownload/UploadFile`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    setFiles([...files, response.data]);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleDelete = async (file) => {
    try {
      await Axios.delete(`${process.env.REACT_APP_API_SERVER_URL}/api/UploadDownload/DeleteFile?ID=${file.id}`);
      const updatedFiles = files.filter((file_n) => file_n.id !== file.id);
      setFiles(updatedFiles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>文件上傳下載</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" id="project-image-file"/>
        <input type="submit" value="上傳" />
      </form>
      <div>
        {
            files.map((file, index) => (
              <div key={file.id} className="project-files-list">
                <a
                style={{ cursor: 'pointer' }}
                href={`${process.env.REACT_APP_API_SERVER_URL}/api/UploadDownload/DownloadFile?ID=${file.id}`}
                >
                {`${file.file_name}     ---    ${file.upload_time}`}
                </a>
                <button onClick={() => handleDelete(file)}>刪除</button>
                <br />
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default ProjectFilePage;