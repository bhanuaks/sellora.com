// "use client";  

// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";
// import { FormatPainter } from "ckeditor5-premium-features";

// import "ckeditor5/ckeditor5.css";
// import "ckeditor5-premium-features/ckeditor5-premium-features.css";

// const Description = ({ formData, setFormData, name }) => {
//   return (
//     <CKEditor
//       editor={ClassicEditor}
//       config={{
//         licenseKey:
//           "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDQ3NjE1OTksImp0aSI6IjNkZWQ3MmEwLTJhNjAtNDg2NS1hYzdmLTc5NjBkOTMwZTJhMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijc2NTRlYWQwIn0.IAJmIm7GYHXUH0a9PaEzULlVE6zJE4hIU38kccUDzYTKdY_yf1rf9KeC2gXHRc5LbL9J229jZdcYn-4k5Mrung", // Or 'GPL'.
//         removePlugins: [
//           "EasyImage",
//           "CloudServices",
//           "ExportPdf",
//           "ExportWord",
//         ], // Remove license-restricted plugins
//         plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
//         toolbar: [
//           "undo",
//           "redo",
//           "|",
//           "bold",
//           "italic",
//           "|",
//           "bulletedList",
//           "numberedList",
//         ],
//       }}
//       data={formData[name]}
//       onChange={(event, editor) => {
//         const data = editor.getData();
//         setFormData((prev) => ({ ...prev, [name]: data }));
//       }}
//       onReady={(editor) => {
//         // 🔹 Ensure CKEditor is not in read-only mode
//         editor.disableReadOnlyMode("myLock");
//         console.log("Editor is ready:", editor);
//       }}
//     />
//   );
// };

// export default Description;


'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Dynamically import CKEditor to prevent SSR issues
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor), { ssr: false });

const Description = ({ formData:data, setFormData:setData, name:nameAttr }) => {
  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(async (file) => {
        const formData = new FormData();
        formData.append('upload', file);

        try {
          const response = await fetch('/api/upload-ckeditor-image', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const resData = await response.json();
          return { default: resData.url };
        } catch (error) {
          console.error('Image upload failed:', error);
          throw error;
        }
      });
    }

    abort() {
      // Handle abort (if needed)
    }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new MyUploadAdapter(loader);
  }

  return (
    <div className="w-full">
      <CKEditor
        editor={ClassicEditor}
        data={data[nameAttr] || ''}
        config={{
          licenseKey:
          "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDQ3NjE1OTksImp0aSI6IjNkZWQ3MmEwLTJhNjAtNDg2NS1hYzdmLTc5NjBkOTMwZTJhMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijc2NTRlYWQwIn0.IAJmIm7GYHXUH0a9PaEzULlVE6zJE4hIU38kccUDzYTKdY_yf1rf9KeC2gXHRc5LbL9J229jZdcYn-4k5Mrung", // Or 'GPL'.
        
          extraPlugins: [MyCustomUploadAdapterPlugin],
          
        }}
        onChange={(event, editor) => {
          const value = editor.getData();
          setData((prevData) => ({
            ...prevData,
            [nameAttr]: value,
          }));
        }}
      />
    </div>
  );
};

export default Description;

