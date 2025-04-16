"use client";

import { useState } from "react";
import Image from "next/image";

export default function AquaticLifeClassifier() {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleClassify = () => {
    setOutput("Dolphin"); // Placeholder
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl h-2/5 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8 flex justify-between text-black">

        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Upload an aquatic life image</h2>

          <div
            className="w-full h-40 border-2 border-dashed border-black/30 flex items-center justify-center rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition relative"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <p className="text-black z-10 text-center">
              Drag & Drop an image here
              <br />
              or click to upload
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <button
            onClick={handleClassify}
            className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-md font-semibold shadow-md text-white"
          >
            Classify
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          {image && (
          <div className="mt-3">
           <Image
             src={image}
             alt="Uploaded aquatic life"
             width={250}
             height={180}
             className="rounded-md shadow-md"
           />
         </div>
          )}
          {output && (
         <div className="mt-6 p-1.5 w-56 h-10 bg-white/20 backdrop-blur-md rounded-lg text-center shadow-md flex items-center justify-center">
            <p className="text-m font-medium text-white">Detected: {output}</p>
         </div>
          )}
        </div>
      </div>
    </div>
  );
}
