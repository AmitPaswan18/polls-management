import { instance } from "../../utils/axiosInstace";

import { createTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getAllPolls, editPollTitle } from "../../redux/Slices/pollSlice";
import { signout } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

export default function AdminPollList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allListedPolls = useSelector((state) => state.poll.poll);
  const totalPage = useSelector((state) => state.poll.page);

  const handleDeletePoll = (deleteId) => {
    instance.get(`/delete_poll?id=${deleteId}`).then((response) => {
      if (response.status === 200) {
        fetchlatestPoll();
      }
    });
  };

  const handleDeletePollOption = (deletePollId, optionText) => {
    instance
      .get(`/delete_poll_option?id=${deletePollId}&option_text=${optionText}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          fetchlatestPoll();
        }
      });
  };

  const handleAddNewPoll = () => {
    navigate("/addNewPoll");
  };

  useEffect(() => {
    fetchlatestPoll();
  }, [totalPage]);

  const fetchlatestPoll = () => {
    try {
      instance
        .get("/list_polls")
        .then((response) => dispatch(getAllPolls(response.data.data)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTitleOpen = (id) => {
    dispatch(editPollTitle(id));
    navigate(`/edittitle/` + id);
  };

  const handleLogout = () => {
    localStorage.removeItem("polltoken");
    dispatch(signout());
    navigate("/");
  };

  return (
    <>
      <div className="flex bg-[#4EB7F8] justify-start w-full  pl-[34%] font-poppins pt-4 ">
        <div className="lg:text-3xl md:flex hidden md:text-lg text-white font-light md:font-medium md:pl-16 pl-0  text-sm md:w-[50%] w-[30px]">
          {" "}
          Admin Poll
        </div>
        <div className="flex text-center md:w-[50%] w-full pl-[10%] pb-4 md:gap-4 gap-1 ">
          <button
            className="bg-blue-500 rounded-md md:text-sm text-xs md:font-normal font-normal md:px-6 py-2 px-4 text-white"
            onClick={handleAddNewPoll}>
            New Poll
          </button>
          <button
            onClick={() => handleLogout()}
            className="bg-red-500 rounded-md md:text-sm text-xs md:font-normal font-normal md:px-6 md:py-2 py-1 px-4 text-white mr-0">
            SignOut
          </button>
        </div>
      </div>

      <div className="h-fit md:pt-10 pt-2 bg-[#7D30EF] pb-10 flex flex-col  w-full">
        {allListedPolls.map((element, index) => (
          <div className="flex justify-center w-full mt-1 " key={index}>
            <div className="flex md:w-[70%] w-[90%] shadow-sm shadow-teal-100 border-2 border-white rounded-md flex-col justify-center">
              <div className="flex justify-between py-2 w-full bg-white px-6  ">
                {" "}
                <div className="text-lg font-medium">{element.title}</div>
                <div className="flex gap-4 ">
                  <div>
                    <button onClick={() => handleEditTitleOpen(element._id)}>
                      <EditIcon />
                    </button>
                  </div>
                  <div>
                    <button onClick={() => handleDeletePoll(element._id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full bg-white flex-col">
                {element.options.map((option, index) => (
                  <div
                    className="flex  border-2 border-slate-100 hover:border-purple-500 m-1 rounded-md  justify-between"
                    key={index}>
                    <div
                      className=" w-full font-normal text-base  py-1 px-6 "
                      key={index}>
                      {" "}
                      {option.option}
                    </div>
                    <div className="pr-2 font-medium">{option.vote}</div>
                    <span className="pr-6 font-medium">Votes</span>
                    <div className="pr-6">
                      <button
                        onClick={() =>
                          handleDeletePollOption(element._id, option.option)
                        }>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
