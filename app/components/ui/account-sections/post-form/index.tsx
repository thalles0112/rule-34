import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Switch } from "@headlessui/react";
import { produce } from "immer";

interface PostFormData {
  title: string;
  tags: string[];
  isPrivate: boolean;
  file: File | null;
}

export default function PostForm() {
    const [isPrivate, setIsPrivate] = useState(false)
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    tags: [],
    isPrivate: false,
    file: null,
  });
  
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData({ ...formData, file: acceptedFiles[0] });
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'video/mp4':['mp4'], 'image/jpg':['jpg', 'png', 'jpeg', 'webp']},
    maxFiles: 1,
  });

  const removeTag=(idx:number)=>{
    const nextState = produce(formData, draft=>{
        draft.tags.splice(idx,1)
    })

    setFormData(nextState)
  }
  
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    

    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault()
      const nextState = produce(formData, draft=>{
        draft.tags.push(e.currentTarget.value || '')
      })
      setFormData(nextState)
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting post: ", formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 max-w-full mx-auto p-4 rounded-lg shadow">
       <div className="p-4 border-dashed border-2 rounded cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        {formData.file ? <img className="max-h-96" src={URL.createObjectURL(formData.file)}/> : <p>Drag & drop an image or video, or click to select</p>}
      </div>
      
      <div className="space-y-4 flex flex-col">
        <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border bg-transparent rounded outline-none"
        />
        
        
        
        <input
            type="text"
            placeholder="Add tags and press Enter"
            onKeyDown={(e)=>handleTagKeyDown(e)}
            className="w-full p-2 border bg-transparent rounded outline-none"
        />
        
        <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
            <span onClick={()=>removeTag(index)} key={index} className="px-2 py-1 border hover:bg-red-400 rounded">
                {tag}
            </span>
            ))}
        </div>
        
        <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
            <span>Private Post</span>
            <Switch
            checked={isPrivate}
            onChange={setIsPrivate}
            className={`${
                isPrivate ? "bg-main-color " : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
            >
            <span
                className={`${
                isPrivate ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-all`}
            />
            </Switch>
            </label>
        </div>
        
        <button type="submit" className="w-full p-2 bg-main-color text-white rounded">Submit Post</button>
      </div>
    </form>
  );
}
