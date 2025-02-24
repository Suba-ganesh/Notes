import { useNavigate } from "react-router-dom";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import Searchbox from "../../components/SearchBar/Searchbox";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate;

  const logout = () => {
    Navigate("/login");
  };

  const handlesearch = () => {};

  const clearsearch = () => {
    setSearchQuery("");
  };
  return (
    <nav className="h-6rem flex justify-content-between align-items-center ">
      <div id="notes">Notes</div>
      <Searchbox
        value={searchQuery}
        onchange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handlesearch={handlesearch}
        clearsearch={clearsearch}
      />
      <ProfileInfo logout={logout} />
    </nav>
  );
};

export default Navbar;
