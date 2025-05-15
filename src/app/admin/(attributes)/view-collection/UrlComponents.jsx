import React, { useRef } from "react";
import Link from "next/link";
import { baseUrl } from "@/Http/helper";

const UrlComponents = ({ item }) => {
  const spanRef = useRef(null);

  const copyToClipboard = () => {
    const textToCopy = `${baseUrl}deals/${item.slug}`;

    // Highlight the span text
    const range = document.createRange();
    range.selectNodeContents(spanRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Optional: Clear the selection after a delay
        setTimeout(() => {
          selection.removeAllRanges();
        }, 500);

        // alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <td>
    <div  title="Copy"  onClick={(e) => { e.preventDefault(); copyToClipboard(); }}>
      <span ref={spanRef}>{baseUrl}deals/{item.slug}</span>{" "}
      <Link href="#">
        <i className="far fa-copy" style={{ cursor: "pointer" }}></i>
      </Link>
      </div>
    </td>
  );
};

export default UrlComponents;
