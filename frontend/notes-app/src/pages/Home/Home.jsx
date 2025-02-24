import { useState } from "react"; // Importing useState hook
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import { MdAdd } from "react-icons/md";
import "./home.css";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  // useState hook for modal state
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isshown: false,
    type: "add",
    data: null,
  });

  // Simulate note data for rendering
  const notes = [
    {
      title: "Meeting on 2nd FEB 2025",
      date: "21-02-2025",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ["meeting"],
      isPinned: true,
    },
    {
      title: "Project Deadline",
      date: "25-02-2025",
      content:
        "Ensure the final version of the project is ready for submission.",
      tags: ["work"],
      isPinned: false,
    },
    // Add more notes here if needed
  ];

  return (
    <div>
      <Navbar />

      <div className="flex justify-around mt-6 gap-3 flex-wrap">
        {notes.map((note, index) => (
          <div key={index} className="grid col-3">
            <NoteCard
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags} // ✅ Passed as an array
              isPinned={note.isPinned}
              onEdit={() => console.log("Edit clicked")}
              onPinNote={() => console.log("Pin clicked")}
              onDelete={() => console.log("Delete clicked")}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-content-end">
        <button
          className="w-4rem h-4rem border-round-md"
          style={{ backgroundColor: "rgba(28,88,184,255)" }}
          onClick={() =>
            setOpenAddEditModal({ isshown: true, type: "add", data: null })
          }
        >
          <MdAdd
            className="text-white cursor-pointer hover:text-gray-800"
            style={{ fontSize: "30px" }}
          />
        </button>
      </div>

      <div className="flex justify-content-center">
        <Modal
          isOpen={openAddEditModal.isshown}
          onRequestClose={() =>
            setOpenAddEditModal({ ...openAddEditModal, isshown: false })
          }
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
            content: {
              padding: "20px", // Add padding for modal content
            },
          }}
        >
          <AddEditNotes
            type={openAddEditModal.type}
            notedata={openAddEditModal.data}
            onclose={() => {
              setOpenAddEditModal({ isshown: false, type: "add", data: null });
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
