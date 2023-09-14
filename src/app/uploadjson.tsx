'use client'
import React, { useState, useRef, useEffect } from 'react';
import CodeBlock from '@/utils/codeblock';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

type Props = {};

const Uploadjson = (props: Props) => {
  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [Error,setError] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (jsonFileInputRef.current) {
      jsonFileInputRef.current.addEventListener('change', handleFileChange);

      return () => {
        jsonFileInputRef.current?.removeEventListener('change', handleFileChange);
      };
    }
  }, []);

  const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const fileContent = await file.text();
      try {
        const parsedData = JSON.parse(fileContent);
        setJsonContent(JSON.stringify(parsedData, null, 2)); // Convert parsed data to a formatted JSON string
        console.log('Parsed JSON data:', parsedData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        toast.error('Error parsing JSON file. Please ensure the JSON format is correct.');
        setJsonContent(null);
        console.log(jsonContent)
        setError(true)
      }
    }
  };

  const PostQuiz = async () => {
    try {
      if (!jsonContent) {
        toast.error('No JSON content to post.');
        return;
      }

      const parsedJsonContent = JSON.parse(jsonContent);
      if (!Array.isArray(parsedJsonContent)) {
        toast.error('Invalid JSON content. Expected an array of questions.');
        return;
      }

      const totalQuestions = parsedJsonContent.length;
      let uploadedQuestions = 0;

      await Promise.all(
        parsedJsonContent.map(async (questionData: any) => {
          try {
            const response = await axios.post('/api/addquiz3', {
              subject: questionData.subject,
              question: questionData.question,
              Class:questionData.class,
              questionImage:questionData.questionImage,
              chapter:questionData.chapter,
              chapterName:questionData.chapterName,
              options: questionData.options,
              answer: questionData.answer,
              explaination: questionData.explanation,
              startDate: questionData.startDate,
              endDate: questionData.endDate,
              images: questionData.images,
            });

            uploadedQuestions++;
            setUploadProgress((uploadedQuestions / totalQuestions) * 100);

            toast.info(`Uploaded ${uploadedQuestions} of ${totalQuestions} questions`);
            setJsonContent(null);
          } catch (error) {
            console.error('Error saving form data:', error);
            toast.error('Error uploading data');
          }
        })
      );

      toast.success('All questions uploaded successfully!');
    } catch (error) {
      console.error('Error saving form data:', error);
      toast.error('An error occurred while processing the JSON content.');
    }
  };

  useEffect(() => {
    if (Error === true) {
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Delay of one second (1000 milliseconds)
    }
  }, [Error]);
  return (
    <div className='mt-2'>
      <input
        className="absolute right-0 px-4 py-3 bg-pink-500 font-medium text-sm text-white rounded-lg opacity-0 cursor-pointer"
        type="file"
        name="jsonFile"
        id="jsonFileInput"
        ref={jsonFileInputRef}
        accept=".json"
      />
      <span className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 ${jsonContent !== null ? 'hidden':""} `}>
        <label
          className={`px-4 py-3 bg-purple-500 font-medium text-sm text-white rounded-lg cursor-pointer`}
          htmlFor="jsonFileInput"
        >
          Upload JSON File
        </label>
      </span>
      <div>
        {jsonContent !== null && (
          <CodeBlock code={jsonContent} language="json" />
        )}
      </div>
      {jsonContent && (
        <span onClick={PostQuiz} className={`px-5 py-3 text-white cursor-pointer mt-0 inline-block mb-10 bg-pink-400 rounded-xl shadow-lg`}>
          Add All Questions
        </span>
      )}
      {uploadProgress > 0 && <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>}
    </div>
  );
};

export default Uploadjson;
