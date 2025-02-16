import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Switch } from "@headlessui/react";
import { produce } from "immer";

export default function PostForm() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [file_url, setFile_url] = useState<File | null>(null);
  const [preview_url, setPreview_url] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  // Dropzone para file_url
  const onDropFileUrl = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile_url(acceptedFiles[0]);
    }
  };

  const { getRootProps: getRootPropsFileUrl, getInputProps: getInputPropsFileUrl } = useDropzone({
    onDrop: onDropFileUrl,
    accept: { "image/*": [".jpg", ".png", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  // Remover tag
  const removeTag = (idx: number) => {
    const nextState = produce(tags, (draft) => {
      draft.splice(idx, 1);
    });
    setTags(nextState);
  };

  // Adicionar tag
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      const nextState = produce(tags, (draft) => {
        draft.push(e.currentTarget.value);
      });
      setTags(nextState);
      e.currentTarget.value = "";
    }
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("private", `${isPrivate}`);
    

    if (file_url) {
      formData.append("file_url", file_url)
      formData.append("preview_url", (await optimizeImage(file_url)))
    
    };

    // Envia as tags como uma lista de objetos
    formData.append(`tags`, `${tags}`);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });

     
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar o formulário.");
    }
  };

  const optimizeImage = (file: File, maxWidth = 800, quality = 0.7): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
  
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const optimizedFile = new File([blob], file.name, { type: "image/jpeg" });
                  resolve(optimizedFile);
                } else {
                  reject(new Error("Erro ao processar imagem"));
                }
              },
              "image/jpeg",
              quality
            );
          }
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex md:flex-row max-md:flex-col max-md:space-y-4 space-x-4 max-w-full mx-auto p-4 rounded-lg shadow">
      {/* Dropzone para file_url */}
      <div className="p-4 border-dashed border-2 rounded cursor-pointer" {...getRootPropsFileUrl()}>
        <input {...getInputPropsFileUrl()} />
        {file_url ? (
          <img className="max-h-96 mx-auto" src={URL.createObjectURL(file_url)} alt="Preview" />
        ) : (
          <p>Arraste e solte uma imagem ou vídeo, ou clique para selecionar</p>
        )}
      </div>

      {/* Campos do formulário */}
      <div className="space-y-4 flex md:w-4/12 flex-col">
        <input
          type="text"
          placeholder="Título do Post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border bg-transparent rounded outline-none"
        />

        <input
          type="text"
          placeholder="Adicionar tag e pressionar Enter"
          onKeyDown={handleTagKeyDown}
          className="w-full p-2 border bg-transparent rounded outline-none"
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span onClick={() => removeTag(index)} key={index} className="px-2 py-1 border hover:bg-red-400 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <span>Post Privado</span>
            <Switch
              checked={isPrivate}
              onChange={setIsPrivate}
              className={`${isPrivate ? "bg-main-color" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
            >
              <span
                className={`${isPrivate ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-all`}
              />
            </Switch>
          </label>
        </div>

        <button type="submit" className="w-full p-2 bg-main-color text-white rounded">
          Enviar Post
        </button>
      </div>
    </form>
  );
}