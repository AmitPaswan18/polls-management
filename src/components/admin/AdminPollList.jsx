import { instance } from "../../utils/axiosInstace";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getAllPolls, editPollTitle } from "../../redux/Slices/pollSlice";
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

  return (
    <>
      <div className="flex bg-white pl-[34%] font-poppins pt-10 ">
        <div className="lg:text-3xl md:text-lg text-sm md:w-[50%] w-full">
          {" "}
          Admin Poll DashBoard
        </div>
        <div className="flex text-center w-[50%] pl-[10%] pb-4 gap-4 bg-white ">
          <button
            className="bg-blue-500 rounded-md md:text-sm text-xs md:font-normal font-normal md:px-6 md:py-2 py-1 px-4 text-white"
            onClick={handleAddNewPoll}>
            New Poll
          </button>
          <button className="bg-red-500 rounded-md text-sm font-normal px-6 py-2 text-white">
            SignOut
          </button>
        </div>
      </div>

      <div className="h-fit mt-10 pb-10 flex flex-col w-full">
        {allListedPolls.map((element, index) => (
          <div className="flex justify-center w-full mt-1 " key={index}>
            <div className="flex w-[80%] shadow-sm shadow-teal-100 rounded-md flex-col justify-center">
              <div className=" flex justify-between py-2 w-full bg-white px-6  ">
                {" "}
                <div className="text-lg font-medium">{element.title}</div>
                <div className="flex gap-4">
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
                  <div className="flex justify-between" key={index}>
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
