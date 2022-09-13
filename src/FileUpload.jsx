import axios from 'axios';
import React, { useState } from 'react'

const FileUpload = () => {

    const [file, setFile] = useState();
    const [downloadFile, setDownloadFile] = useState({});
    
    const handleChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.fileName);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const url = 'https:v2.convertapi.com/upload';

        axios.post(url, formData, config).then(response=>{
            console.log(response.data);
            const file = {...downloadFile};
            file.fileName = response.data.fileName;
            file.url = response.data.Url;
            setDownloadFile(file);
        })
    }

    return (
        <div>
            <h1>React File Upload</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange}/>
                    <button type='submit'>Upload</button>
                </form>
            </div>
            <div style={{margin: '30px', cursor: 'pointer'}}>
                <div>File: {downloadFile.fileName}</div>
                <a href={downloadFile.url} download>
                    Download the file
                </a>
                <img src={downloadFile.url} alt="" />
            </div>
        </div>
    )
}

export default FileUpload