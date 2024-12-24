'use client';

import { useUser } from '@clerk/nextjs';
import { uploadImageToCloudinary } from '@/cloudinary';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter, usePathname } from 'next/navigation';

export default function UpdatePost() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: postId,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };
    if (isSignedIn && user?.publicMetadata?.isAdmin) {
      fetchPost();
    }
  }, [postId, user?.publicMetadata?.isAdmin, isSignedIn]);



  const handleImageUpload = async () => {
    if (!imageFile) {
      alert('Please select an image to upload.');
      return;
    }

    try {
      const uploadedImage = await uploadImageToCloudinary(imageFile, setUploadProgress);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: uploadedImage.secure_url, 
      }));
      setImageURL(uploadedImage.secure_url);
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
      const res = await fetch('/api/post/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMongoId,
          postId: postId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      router.push(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              defaultValue={formData.title}
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="pinkToOrange"
              size="sm"
              outline
              onClick={handleImageUpload}
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              {uploadProgress > 0 && uploadProgress < 100 ? (
                <ProgressBar
                  completed={uploadProgress}
                  bgColor="#6a1b9a"
                  baseBgColor="#d1c4e9"
                  height="20px"
                  labelColor="#ffffff"
                  labelAlignment="outside"
                />
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded"
              className="w-full h-72 object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            required
            value={formData.content}
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
          <Button type="submit" gradientDuoTone="pinkToOrange">
            Update
          </Button>
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  }

  return (
    <h1 className="text-center text-3xl my-7 font-semibold min-h-screen">
      You need to be an admin to update a post
    </h1>
  );
}
