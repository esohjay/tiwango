import React from "react";
//import { usePostActions } from "../actions/postActions";
//import { useGlobalContext } from "../context/store";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { usePostActions } from "../actions/postActions";
export default function Category({ show }) {
  const history = useHistory();
  const { setCategory } = usePostActions();
  //const [showCategory, setShowCategory] = useState(false);
  const findCategory = (category) => {
    setCategory(category);
    history.push(`/posts/search`);
  };
  return (
    <>
      {show && (
        <ul className="dropdown">
          <li onClick={() => findCategory("General")}>
            <Link to="">General</Link>
          </li>
          <li onClick={() => findCategory("Marketing")}>
            <Link to="">Health</Link>
          </li>
          <li onClick={() => findCategory("Finance")}>
            <Link to="">Finance</Link>
          </li>
          <li onClick={() => findCategory("Production")}>
            <Link to="">Agriculture</Link>
          </li>

          <li onClick={() => findCategory("Technology")}>
            <Link to="">Technology</Link>
          </li>
        </ul>
      )}
    </>
  );
}
