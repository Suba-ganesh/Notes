import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

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
          <span className="text-sm text-gray-500">{moment(date).format("YYYY-MM-DD HH:mm:ss")}</span>
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
          {tags.map((item)=> `#${item}`)}
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
