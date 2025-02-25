"use client";

import axios from "axios";
import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      company,
      ideaTitle,
      ideaDescription,
      files,
    };
    console.log(formData);
    setLoading(true);

    try {
      const response = await axios.post("/api/generate", formData, {
        headers: {
          "Content-Type": "object",
        },
      });

      const data = response.data;

      if (response.status === 200) {
        console.log(data);
        alert(data);

        // Redirect to results page with the data
        // window.location.href = `/result?data=${encodeURIComponent(JSON.stringify(data))}`;
      } else {
        throw new Error(data.error || "Failed to get feedback");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
          Your Name
        </label>
        <input
          type='text'
          value={name}
          id='name'
          name='name'
          onChange={(e) => setName(e.target.value)}
          required
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='company' className='block text-sm font-medium text-gray-300'>
          Company Name
        </label>
        <input
          type='text'
          id='company'
          name='company'
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          required
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='ideaTitle' className='block text-sm font-medium text-gray-300'>
          Idea Title
        </label>
        <input
          type='text'
          id='ideaTitle'
          name='ideaTitle'
          value={ideaTitle}
          onChange={(e) => {
            setIdeaTitle(e.target.value);
          }}
          required
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='ideaDescription' className='block text-sm font-medium text-gray-300'>
          Idea Description
        </label>
        <textarea
          id='ideaDescription'
          name='ideaDescription'
          rows={4}
          value={ideaDescription}
          onChange={(e) => {
            setIdeaDescription(e.target.value);
          }}
          required
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='file' className='block text-sm font-medium text-gray-300'>
          Attach Files (Optional)
        </label>
        <input
          type='file'
          id='file'
          name='file'
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files));
            }
          }}
          className='mt-1 block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600'
        />
      </div>

      <div>
        <button
          type='submit'
          style={{ backgroundColor: "indigo" }}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 !important focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
      </div>
    </form>
  );
}
