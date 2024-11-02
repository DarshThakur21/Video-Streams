import { Alert, Button, Card, FileInput, Label, Progress, Textarea, TextInput } from 'flowbite-react'
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'
import axios from 'axios';

function VideoUpload() {


  const [selectedFile, setselectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  })
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");


  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setselectedFile(event.target.files[0]);
  }

  function handleForm(formEvent) {
    // console.log("upload")
    // console.log(selectedFile);
    formEvent.preventDefault();
    // console.log(formEvent.target.title.value);
    // console.log(formEvent.target.description.value);
    // console.log(meta);
    submitToServerFile(selectedFile, meta);


  }

  function resetForm(){
      setMeta({
        title:"",
        description:"",
      });
      setselectedFile(null);
      setUploading(false);

  }

  async function submitToServerFile(video, videoMetaData) {
    setUploading(true);
    // apicall
    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", selectedFile);


      let response = await axios.post(`http://localhost:8080/api/v1/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          console.log(ProgressEvent);
          const percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
          setProgress(percentCompleted);
        }

      }

      );
      setUploading(false);
      console.log(response);
      setMessage("file uploaded")
      setProgress(0);
 
      toast.success("File uploaded successfully!");


      resetForm();

    
      
      
    } catch (error) {
      console.log(error);
      setUploading(false);
      setMessage("error")
      toast.error("error!");
    }

  }

  function formFieldChange(event) {

    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    })

  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className='flex flex-col items-center justify-center'>
        <h2 className='text-center'>Upload Video </h2>

        <div>
          <form noValidate className='flex flex-col space-y-2' onSubmit={handleForm}>


            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Video title " />
              </div>
              <TextInput
              value={meta.title}
                onChange={formFieldChange}
                name='title' placeholder='Enter title ' />
            </div>


            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea id="" value={meta.description} onChange={formFieldChange} name='description' placeholder="Enter Description" required rows={3} />

            </div>




            <div className='flex items-center space-x-5' >
              <div class="shrink-0">
                <img class="h-16 w-16 object-cover rounded-md" src="https://cdn-icons-png.flaticon.com/128/6598/6598642.png" alt="" />
              </div>
              <label class="block ">
                <span class="sr-only">Choose video </span>
                <input
                 
                  name='file'
                  onChange={handleFileChange}
                  type="file" class="block rounded-full w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-violet-50 file:text-violet-700
                                      hover:file:bg-violet-100 "/>
              </label>
            </div>

            <div className="">
              {/* Only show the progress bar if uploading is true */}
              {uploading && (
                <Progress
                  progress={progress}
                  textLabel="Uploading"
                  size="lg"
                  labelProgress
                  labelText
                />
              )}
            </div>


             



            <div className='flex justify-center'>
              <Button disabled={uploading} type='submit'>Submit</Button>
            </div>


          </form>
        </div>


      </Card>
    </div>
  )
}

export default VideoUpload
