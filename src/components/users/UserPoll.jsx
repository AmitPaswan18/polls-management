import { instance } from "../../utils/axiosInstace";

import { createTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllPolls,
  getPollVoted,
  votestarted,
} from "../../redux/Slices/pollSlice";
import { useNavigate } from "react-router-dom/dist";
import { signout } from "../../redux/Slices/authSlice";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Loader from "../common/Loader";

import Pagination from "@mui/material/Pagination";

import { useEffect, useState } from "react";

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

export default function UserPoll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVoted, setVoted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const allListedPolls = useSelector((state) => state.poll.poll);
  const voteLoader = useSelector((state) => state.poll.voteLoader);

  const pollsperpage = 5;

  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pollsToDisplay = allListedPolls.slice(
    (page - 1) * pollsperpage,
    page * pollsperpage
  );

  const totalPage = Math.ceil(allListedPolls.length / pollsperpage);

  const handleLogout = () => {
    localStorage.removeItem("polltoken");
    dispatch(signout());
    navigate("/");
  };

  const handleVotePollOption = (votePollId, optionText) => {
    dispatch(votestarted({ votePollId: votePollId, optionText: optionText }));
    const polltoken = localStorage.getItem("polltoken");
    setTimeout(() => {
      if (!isLoading) {
        setVoted(false);
      }
    }, 2000);

    instance
      .get(`/do_vote?id=${votePollId}&option_text=${optionText}`, {
        headers: {
          access_token: polltoken,
        },
      })
      .then((response) => {
        if (response.data.error === 0) {
          dispatch(getPollVoted());
          setLoading(false);
          setVoted(true);
          fetchlatestPoll();
        }
      });
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

  return (
    <>
      {voteLoader ? (
        <Loader loadingtext={"Vote updating..."} />
      ) : (
        <div className="w-full">
          <div className="flex justify-end bg-[#4EB7F8] pr-[5%]  md:pb-6 pb-2 font-poppins md:pt-4 pt-2 ">
            <div className="lg:text-3xl pl-5 text-lg md:pl-10 pl=0 md:text-xl  text-white md:w-[50%] w-full">
              {" "}
              User Vote Poll
            </div>
            <button
              onClick={() => handleLogout()}
              className="bg-red-500 rounded-md text-sm font-normal  px-6 py-2 text-white">
              SignOut
            </button>
          </div>

          {isVoted && (
            <div className=" fixed top-1 flex justify-center md:left-[40%] left-6">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  You have voted Poll Successfully
                </Alert>
              </Stack>
            </div>
          )}

          <div className="h-fit pt-10 pb-10 flex flex-col  bg-[#F8F8F8] w-full">
            {pollsToDisplay.map((element, index) => (
              <div className="flex justify-center w-full mt-1 " key={index}>
                <div className="flex md:w-[70%] w-[90%]  shadow-sm border-2 border-white shadow-teal-100 rounded-md flex-col justify-center">
                  <div className=" flex justify-between py-2 w-full bg-white  rounded-sm border-slate-100  px-6  ">
                    <div className="text-lg font-medium">{element.title}</div>
                  </div>
                  <div className="flex w-full bg-white flex-col">
                    {element.options.map((option, index) => (
                      <div
                        className={`flex p-1 text-white  mx-2 border-2 border-slate-100 hover:border-purple-500 m-1 rounded-md justify-between ${
                          option.vote > 0 ? "bg-green-500" : "bg-yellow-500"
                        }`}
                        key={index}>
                        <div
                          className=" w-full font-normal text-base  py-1 px-6 "
                          key={index}>
                          {" "}
                          {option.option}
                        </div>
                        <div className="pr-6">
                          <input
                            type="radio"
                            name="pollOption"
                            value={option.id}
                            disabled={option.vote > 0}
                            onClick={() =>
                              handleVotePollOption(element._id, option.option)
                            }
                          />
                        </div>
                      </div>
                    ))}{" "}
                  </div>
                </div>
              </div>
            ))}
            <div className=" mt-4 flex justify-center">
              <div>Page: {page}</div>
              <div>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
