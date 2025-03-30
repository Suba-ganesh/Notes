import { useEffect, useState } from "react"; // Importing useState hook
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import { MdAdd } from "react-icons/md";
import "./home.css";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axiosInstance from "../../utilities/axios";

const Home = () => {
  // useState hook for modal state
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isshown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(""); // ✅ Fix: Declare error state
  const navigate = useNavigate(); // ✅ Fix: Initialize navigate

  const getUserInfo = async (setUserInfo, setError) => {
    const navigate = useNavigate(); // Ensure this is inside the component
  
    try {
      const response = await axiosInstance.get("/get-user");
  
      if (response?.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
  
      if (error.response) {
        console.log("Server Response:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else if (error.request) {
        console.log("No Response Received:", error.request);
      } else {
        console.log("Unexpected Error:", error.message);
      }
  
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        setError && setError("Failed to fetch user info. Please try again.");
      }
    }
  };

  const getAllNotes = async () => {
    try {
        const response = await axiosInstance.get("/get-all-notes"); // Ensure the route matches backend

        if (response?.data?.notes) {
            setAllNotes(response.data.notes);
        }
    } catch (error) {
        console.error("Error fetching notes:", error);

        if (error.response) {
            console.log("Server Response:", error.response.data);
            console.log("Status Code:", error.response.status);
        } else if (error.request) {
            console.log("No Response Received:", error.request);
        } else {
            console.log("Unexpected Error:", error.message);
        }
    }
};


  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />

      {error && <p className="error-message">{error}</p>} {/* ✅ Show error message */}

      <div className="flex justify-around mt-6 gap-3 flex-wrap">
        {allNotes.map((item) => (
          <div key={item._id} className="grid col-3">
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn ? new Date(item.createdOn).toLocaleDateString() : "Unknown Date"} // ✅ Fix: Convert date properly
              content={item.content}
              tags={item.tags || []} // ✅ Fix: Ensure tags is always an array
              isPinned={item.isPinned}
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
              padding: "20px",
            },
          }}
        >
          <AddEditNotes
            type={openAddEditModal.type}
            notedata={openAddEditModal.data}
            onclose={() => {
              setOpenAddEditModal({ isshown: false, type: "add", data: null });
            }}
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
