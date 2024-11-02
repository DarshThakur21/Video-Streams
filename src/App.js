import { Toaster } from 'react-hot-toast';
import './App.css';
import VideoUpload from './components/VideoUpload';
import { useState } from 'react';

function App() {

  const [videoId,setVideoId]=useState("d835b665-0a3f-498d-a1a9-44828f18149f")
  return (
    <>
      <Toaster />
    <div className=' flex flex-col items-center space-y-5 justify-center   mt-10 '>
      <h1 className='font-bold text-4xl text-gray-700 ' >
         Video streams
      </h1>

   
    <div className='flex  w-full justify-around'>
    <div className='border border-blue-800'>
        <h1>Playing video</h1>
        <video 
          style={{width:500,
                  height:500,
          }}  
        src={`http://localhost:8080/api/v1/videos/streams/range/${videoId}`} controls></video>
      </div>
      <VideoUpload/>
    </div>
    </div>
    </>
  
  );
}

export default App;
