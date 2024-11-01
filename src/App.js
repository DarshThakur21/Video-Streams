import './App.css';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
 
    <div className=' flex flex-col items-center space-y-5 justify-center text-center mt-10 '>
      <h1 className='font-bold text-4xl text-gray-700 ' >
       Welcome to video streams
      </h1>
      <VideoUpload/>
    </div>
  
  );
}

export default App;
