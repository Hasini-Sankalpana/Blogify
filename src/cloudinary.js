import axios from "axios";

export const uploadImageToCloudinary = async (file, setProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blogify"); 
  formData.append("folder", "blogify"); 
  formData.append("cloud_name", "djxmf8iiv"); 

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/djxmf8iiv/image/upload`, 
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progress); 
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};