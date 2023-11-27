import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleProfilGet } from "../../../redux/slices/profileSlice";

const DataLoad = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleProfilGet()).then(() => {
      navigate("/profile", { replace: true });
    });
  }, []);
};

export default DataLoad;
