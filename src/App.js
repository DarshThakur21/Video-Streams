import { Toaster } from 'react-hot-toast';
import './App.css';
import VideoUpload from './components/VideoUpload';
import { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import { Button, TextInput } from 'flowbite-react';

function App() {
  // c3dddbe4-8ede-4ee2-a075-af401d128f9e
  const [videoId, setVideoId] = useState("");
  // const [vidsrc,setVidSrc]=useState('');
  const [fieldvalue, setFieldValue] = useState(null);

  // const handleVideoUpload = (src) => {
  //   setVidSrc(src); // Set the uploaded video URL
  // };

  function playVideo(videoId) {
    setVideoId(videoId);
  }

  return (
    <>
      <Toaster />
      <div className=' flex flex-col items-center space-y-5 justify-center   mt-10 '>
        <h1 className='font-bold text-4xl text-gray-700 ' >
          Video streams
        </h1>


        <div className='flex  w-full justify-around'>
          <div  >
            <h1>Playing video</h1>


            <div className='flex my-4 space-x-4'>
              <TextInput onChange={(event) => {
                setFieldValue(event.target.value);
              }}
               placeholder="Enter the video id" name="video_id_field" />
              <Button onClick={() => {

                setVideoId(fieldvalue);

              }}>play</Button>
            </div>


            <video
              style={{
                width: 500,
                height: 500,
              }}
              src={`http://localhost:8080/api/v1/videos/streams/range/${videoId}`} controls></video>
            {/* {vidsrc ? (
              <VideoPlayer src={vidsrc} /> // Use VideoPlayer component
            ) : (
              <p>No video uploaded yet.</p>
            )} */}
          </div>
          <VideoUpload />
        </div>
      </div>
    </>

  );
}

export default App;
