"use client";
import { Mail, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

function ShareButton() {
  const [open, setOpen] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedurl = decodeURIComponent(url);
  console.log("encodeurl", encodedurl);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <div className="relative " ref={ref}>
      <button onClick={() => setOpen(!open)} className="cursor-pointer">
        <Share2 size={24} />
      </button>
      {open && (
        <div className="absolute border-gray-200 flex gap-2 mt-2 z-50 shadow-lg rounded-lg bg-white p-2">
          <a
            className="block px-4 py-2 hover:bg-gray-100"
            href={`https://api.whatsapp.com/send?text=${encodedurl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={24} className="text-green-500" />
          </a>
          <a
            className="block px-4 py-2 hover:bg-gray-100"
            href={`mailto:?body=${encodedurl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="text-blue-500" size={24} />
          </a>
        </div>
      )}
    </div>
  );
}

export default ShareButton;
