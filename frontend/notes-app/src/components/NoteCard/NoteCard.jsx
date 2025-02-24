import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags = [],
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="p-4 border-round-md border-solid bg-white w-96 border border-gray-200 w-full">
      <div className="flex justify-content-between items-center mb-2">
        <div>
          <h6 className="text-lg font-bold">{title}</h6>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        
        {/* Pin Icon */}
        <MdOutlinePushPin
          className={`cursor-pointer text-2xl ${isPinned ? "text-blue-400" : "text-gray-400"}`}
          onClick={onPinNote}
        />
      </div>

      {/* Content Section */}
      <p className="mt-2 text-gray-700">{content?.slice(0, 60)}...</p>

      {/* Footer Section */}
      <div className="flex justify-content-between items-center mt-3">
        {/* Tags */}
        <div className="flex gap-1">
          {tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-200 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Edit & Delete Icons */}
        <div className="flex gap-2">
          <MdCreate className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={onEdit} />
          <MdDelete className="text-red-500 cursor-pointer hover:text-red-700" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
