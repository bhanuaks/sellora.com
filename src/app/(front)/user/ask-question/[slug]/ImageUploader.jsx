"use client";

import { useEffect, useRef, useState } from "react"; 
export default function ImageUploader({selectedFiles, setSelectedFiles, errors, setErrors}) {

  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null); 

  const acceptedFileTypes = [
    "pdf", "jpg", "gif", "jpeg", "bmp", "tif", "tiff", "png", "xps", 
    "doc", "docx", "fax", "wmp", "ico", "txt", "cs", "rtf", "xls", "xlsx"
  ];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let validFiles = [];
    let errorText = "";

    files.forEach((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (acceptedFileTypes.includes(fileExtension)) {
        validFiles.push(file);
        setErrors((preData)=>({
          ...preData,
          files:""
        })) 
      } else {
        errorText = "We cannot accept this file type at this time.";
      }
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }

    setErrorMessage(errorText);
  };


  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    // refile from input
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file)); 
    fileInputRef.current.files = dataTransfer.files;
  };

 

  return (
    <div className="file-uploader">
      <div className="file-uploader__message-area">
        <p>{selectedFiles.length > 0 ? "File List:" : "Please select a file."}</p>
      </div>

      <ul className="file-list">
        {selectedFiles.map((file, index) => (
          <li key={index}>
            <span className="file-list__name">{file.name}</span>
            <button  type="button" className="removal-button" onClick={() => removeFile(index)}></button>
          </li>
        ))}
      </ul>

      <div className="file-chooser">
        <input
          className="file-chooser__input"
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>

      {errors?.files && <p className="error_message" style={{color:"red"}}> &nbsp;{errors?.files}</p>}
      {errorMessage && <p className="error-message" style={{color:"red"}}>&nbsp;{errorMessage}</p>}
      
     
    </div>
  );
}
