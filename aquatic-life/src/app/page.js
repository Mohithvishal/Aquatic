"use client";

import { useState } from "react";
import Image from "next/image";

export default function AquaticLifeClassifier() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [output, setOutput] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setSelectedFile(file); // Store file for API upload
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      
    if (res.ok) {
      const confidence = data.confidence;
      const prediction = data.prediction;
      const percentage = (confidence * 100).toFixed(2);

      if (confidence >= 0.9) {
        setOutput(`✅ Confidently predicted: ${prediction} (${percentage}%)`);
      } else if (confidence >= 0.7) {
        setOutput(`⚠️ Likely: ${prediction} (${percentage}%)\n(But not very confident)`);
      } else {
        setOutput("❌ The given image is not confidently identified as an aquatic animal.");
      }
    } else {
      setOutput("Error: " + data.error);
    }

    } catch (err) {
      console.error("Prediction error:", err);
      setOutput("Prediction failed.");
    }
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
          {imagePreview && (
            <div className="mt-3">
              <Image
                src={imagePreview}
                alt="Uploaded aquatic life"
                width={250}
                height={180}
                className="rounded-md shadow-md"
              />
            </div>
          )}
          {output && (
            <div className="mt-6 p-1.5 w-64 h-12 bg-white/20 backdrop-blur-md rounded-lg text-center shadow-md flex items-center justify-center">
              <p className="text-m font-medium text-white">{output}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
