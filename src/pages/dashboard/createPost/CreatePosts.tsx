import { useState } from 'react';
import image from '../../../assets/images/Image.svg';
import { useCreatePostMutation, useUploadFilesMutation } from '../../../redux/api/user-slice';

const CreatePosts = () => {
  const [uploadFiles, { isLoading: isUploading }] = useUploadFilesMutation();
  const [createPost] = useCreatePostMutation();
  const [imagesOrVideos, setImagesOrVideos] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [altText, setAltText] = useState<string>('');
  const [saveImages, setSaveImages] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleUploadFiles = async () => {
    const formData = new FormData();
    imagesOrVideos.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await uploadFiles(formData).unwrap();
      const urls = res.files.flat().map((item: { url: string }) => item.url);
      const content = urls.map((url: string) => {
        const isImage = url.match(/\.(jpeg|jpg|gif|png)$/);
        const type = isImage ? 'IMAGE' : 'VIDEO';
        return { url, type };
      });

      setSaveImages(content);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!saveImages.length) {
      alert('Please upload files first.');
      setIsSubmitting(false);
      return;
    }

    const data = {
      content: saveImages,
      location,
      content_alt: altText,
      caption,
    };

    try {
      await createPost(data).unwrap();
      alert('Post created successfully!');
      setCaption('');
      setLocation('');
      setAltText('');
      setImagesOrVideos([]);
      setSaveImages([]);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black h-screen overflow-y-auto text-white pt-[67px] pl-[40px] pb-[59px]">
      <div className="flex items-center gap-[25px]">
        <img src={image} alt="image" />
        <p className="text-4xl font-bold">Create a Post</p>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-9">
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg mt-[50px]">Caption</span>
          <textarea
            required
            rows={4}
            name="caption"
            className="bg-black text-white resize-none p-4 outline-none"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </label>

        <label className="flex flex-col gap-3 relative">
          <span className="font-medium text-lg">Add Photos/Videos</span>
          {imagesOrVideos.length ? (
            <div className="bg-dark-300 w-full overflow-y-auto flex gap-3 p-10">
              {imagesOrVideos.map((file, index) => {
                const mediaUrl = URL.createObjectURL(file);
                return (
                  <div className="relative" key={index}>
                    {file.type.includes('video') ? (
                      <video src={mediaUrl} controls className="object-contain" />
                    ) : (
                      <img width={300} className="object-contain" src={mediaUrl} alt={`media-${index}`} />
                    )}
                    <button
                      type="button"
                      className="absolute bottom-0 left-0 bg-red-500 rounded-2xl pt-2 text-white p-2"
                      onClick={() => setImagesOrVideos(imagesOrVideos.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <div className="absolute right-3 bottom-3 flex items-center space-x-5">
                <button
                  type="button"
                  className="font-semibold py-3 h-fit px-[20px] bg-[#877EFF] w-fit mt-auto ml-auto rounded-lg"
                  onClick={handleUploadFiles}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
                <label htmlFor="chooseFile" className="cursor-pointer">
                  <input
                    onChange={(e) => setImagesOrVideos([...imagesOrVideos, ...(e.target.files ? Array.from(e.target.files) : [])])}
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                  <span className="font-semibold py-3 h-fit px-[20px] bg-[#877EFF] w-fit mt-auto ml-auto rounded-lg">
                    Choose another one
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-dark-300 py-[48px] relative">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-lg font-semibold mt-3 mb-2">Drag photos and videos here</h1>
                <p className="text-xs text-light-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="text-xs font-semibold py-[10px] px-[20px] rounded-lg bg-dark-400">Select from computer</span>
                  <input
                    onChange={(e) => setImagesOrVideos(Array.from(e.target.files || []))}
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                </label>
              </div>
            </div>
          )}
        </label>

        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-black flex items-center p-2 justify-between">
            <input
              name="location"
              required
              className="outline-none bg-transparent w-full p-2"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </label>

        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Photo/Video Alt Text</span>
          <input
            name="content_alt"
            required
            className="bg-black text-white p-4 outline-none"
            placeholder="Alt text for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="font-semibold py-[12px] px-[22px] my-[20px] mx-[20px] bg-[#877EFF] w-fit ml-auto rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sharing...' : 'Share Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePosts;
