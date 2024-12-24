'use client';
import { useUser } from '@clerk/nextjs';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { uploadImageToCloudinary } from '@/cloudinary'; // Import helper function
import ProgressBar from "@ramonak/react-progress-bar"; // Import progress bar

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();
  console.log(formData);

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
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: uploadedImage.secure_url, // Add the image URL to formData
        }));
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/api/post/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userMongoId: user.publicMetadata.userMongoId,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          router.push(`/post/${data.slug}`);
        }
      } catch (error) {
        setPublishError('Something went wrong');
      }
    };
  

    return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a post
        </h1>
        <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              id='title'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
             onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            >
              <option value='uncategorized'>Select a category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="astronomy">Astronomy</option>
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
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
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