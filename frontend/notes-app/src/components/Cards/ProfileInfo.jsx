import "primeflex/primeflex.css";
import { getInitials } from "../../utilities/helper";



const ProfileInfo = ({ logout }) => {
    return (
      <div className="flex align-items-center gap-3 font-bold p-2">
       <div className="w-3rem h-3rem flex align-items-center justify-content-center border-circle text-xl" style={{backgroundColor:"gray"}}>
        {getInitials("Subaganesh")}
      </div>
  
        <div>
          <p className="text-lg m-0">Subaganesh</p>
          <button 
            onClick={logout} 
            className="p-button p-button-danger p-button-sm mt-1"
          >
            Logout
          </button>
        </div>
      </div>
    );
  };
  
  export default ProfileInfo;
  