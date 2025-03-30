import { useState } from "react";
import TagInput from "../../components/Password/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utilities/axios";

const AddEditNotes = ({notedata, type, getAllNotes, onclose}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);


  const addNewNote = async () => {
    try {
      // Ensure title, content, and tags are valid before making the request
      if (!title || !content) {
        setError("Title and content are required.");
        return;
      }
  
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags: tags || [] // Ensure tags is always an array
      });
  
      if (response.data && response.data.note) {
        await getAllNotes(); // Wait for notes to be updated before closing
        if (onClose) onClose(); // Check if onClose is defined before calling
      }
    } catch (error) {
      console.error("Error adding note:", error);
  
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  
  const handleAddNote = ()=> {
    if (!title) {
        setError("Please enter the title");
        return;
    }

    if (!content) {
        setError("Please enter the content");
        return;
    }

    setError("");

    if (type === 'edit') {
        editNote();
    } else{
        addNewNote();
    }
  }

  return (
    <div>
        <div className="flex justify-content-end"><button onClick={onclose} className="w-2rem h-2rem border-circle flex align-items-center border-none justify-content-center cursor-pointer ">
            <MdClose style={{fontSize:'40px'}} />
        </button></div>
        
      <div className="flex flex-column">
        <label htmlFor="" className="font-bold">
          Title
        </label>
        <input
          type="text"
          className="border-none text-4xl"
          placeholder="Go To Gym"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-column mt-4">
        <label htmlFor="" className="font-bold">
          Content
        </label>
        <textarea
          name=""
          className="text-2xl border-none"
          style={{ backgroundColor: "#F9FAFB" }}
          rows={10}
          placeholder="Content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>

      <div className="mt-4">
        <label htmlFor="">TAGS</label>
        <TagInput Tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text">{error}</p>}

      <button
        className="p-3 mt-5 font-medium w-full border-round-md border-none"
        style={{ backgroundColor: "rgba(9,164,255,255)" }}
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
