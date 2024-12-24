'use client';
import { useUser } from '@clerk/nextjs';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { uploadImageToCloudinary } from '@/cloudinary'; // Import helper function
import ProgressBar from "@ramonak/react-progress-bar"; // Import progress bar

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isLoaded) {
    return null;
  }
  if (isSignedIn && user.publicMetadata.isAdmin) {
    const handleFileChange = (event) => {
      setImageFile(event.target.files[0]);
    };

    const handleImageUpload = async () => {
      if (!imageFile) {
        alert('Please select an image to upload.');
        return;
      }

      try {
        const uploadedImage = await uploadImageToCloudinary(imageFile, setUploadProgress);
        setImageURL(uploadedImage.secure_url);
       // alert('Image uploaded successfully!');
        setTimeout(() => {
          setUploadProgress(0);
        }, 1500);
      } catch (error) {
        alert('Failed to upload image. Please try again.');
        setUploadProgress(0);
      }
    };

    return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a post
        </h1>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              id='title'
              className='flex-1'
            />
            <Select>
              <option value='uncategorized'>Select a category</option>
              <option value='javascript'>JavaScript</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
            </Select>
          </div>
          <div className='flex flex-row gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file' accept='image/*' onChange={handleFileChange} />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleImageUpload}
            >
              Upload Image
            </Button>
          </div>
          {/* Progress Bar */}
          {uploadProgress > 0 && (
            <ProgressBar
              completed={uploadProgress}
              bgColor="blue"
              height="10px"
            />
          )}
          {/* Show uploaded image preview */}
          {imageURL && (
            <img src={imageURL} alt="Uploaded" className="mt-4 rounded-md" />
          )}
          <ReactQuill
            theme='snow'
            placeholder='Write something...'
            className='h-72 mb-12'
            required
          />
          <Button type='submit' gradientDuoTone='purpleToPink'>
            Publish
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <h1 className='text-center text-3xl my-7 font-semibold'>
        You are not authorized to view this page
      </h1>
    );
  }
}