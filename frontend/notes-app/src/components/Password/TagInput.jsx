import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ Tags, setTags }) => {  // Destructuring props

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "" && !Tags.includes(inputValue.trim())) {  // Check if tag already exists
      setTags([...Tags, inputValue.trim()]);
      setInputValue("");  // Clear input after adding the tag
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(Tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex align-items-center gap-2 mt-3">
      {/* Display Tags */}
      {Tags?.length > 0 && (
        <div className="" style={{backgroundColor:'#F9FAFB'}}>
          {Tags.map((tag, index) => (
            <span key={index} className="tag-item flex gap-2">
              # {tag}
              <button onClick={() => handleRemoveTag(tag)} className="bg-transparent border-none flex align-items-center font-bold">
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input field for new tag */}
      <input
        type="text"
        placeholder="Add Tags"
        className="h-2rem w-16rem border-none"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />

      {/* Add button */}
      <button className="border-none bg-transparent" onClick={addNewTag}>
        <MdAdd className="text-2xl text-blue-700" />
      </button>
    </div>
  );
};

export default TagInput;
