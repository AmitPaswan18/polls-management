import { createTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  editPollTitle,
} from "../../redux/Slices/pollSlice";
import { signout } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import AddchartIcon from "@mui/icons-material/Addchart";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NoPollData from "./NoPollData";
import Loader from "../common/Loader";
import { deletePollOptionAsync } from "../../redux/Thunk/pollOptionThunk";
import { deletePollAsync } from "../../redux/Thunk/pollOptionThunk";
import { fetchLatestPoll } from "../../utils/fetchLatestdata";
import TablePagination from "@mui/material/TablePagination";

import { useState } from "react";

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
  const deleteLoader = useSelector((state) => state.poll.loading);

    const [page, setPage] = useState(() => {
      const storedPage = localStorage.getItem("listedPollPage");
      return storedPage ? parseInt(storedPage, 10) : 0;
    });

   const [rowsPerPage, setRowsPerPage] = useState(() => {
     const storedRowsPerPage = localStorage.getItem("listedPollRowsPerPage");
     return storedRowsPerPage ? parseInt(storedRowsPerPage, 10) : 5;
   });


   const handleChangePage = (event, newPage) => {
    localStorage.setItem("listedPollPage", newPage.toString());
    console.log("newpage" , newPage);
     setPage(newPage);
   };

   const listedPoll = [...allListedPolls].reverse();

 const handleChangeRowsPerPage = (event) => {
   const newRowsPerPage = parseInt(event.target.value, 10);
   setRowsPerPage(newRowsPerPage);
   setPage(0);
   localStorage.setItem("listedPollPage", "0");
   localStorage.setItem("listedPollRowsPerPage", newRowsPerPage.toString());
 };

  const handleDeletePoll = (deleteId) => {
    dispatch(deletePollAsync({ deleteId }));
  };

  const handleDeletePollOption = async (deletePollId, optionText) => {
    try {
      await dispatch(deletePollOptionAsync({ deletePollId, optionText }));
    } catch (error) {
      console.error("Error in handleDeletePollOption:", error);
    }
  };

  const handleAddNewPoll = () => {
    navigate("/addNewPoll");
  };

  const handleAddNewOptions = (id) => {
    dispatch(editPollTitle(id));
    navigate(`/addNewOptions/` + id);
  };

  useEffect(() => {
    fetchLatestPoll(dispatch);
  }, []);


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

      {deleteLoader ? (
        <Loader loadingtext={" Deleting Please wait..."} />
      ) : (
        <div>
          {allListedPolls.length > 0 ? (
            <div className="h-fit md:pt-10 pt-2 bg-[#F8F8F8] pb-10 flex flex-col  w-full">
              {listedPoll.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, index) => (
                <div
                  className="flex justify-center w-full mt-1 md:mt-4 "
                  key={index}>
                  <div className="flex md:w-[70%] w-[90%] shadow-md shadow-gray-400 border-2 border-white rounded-md flex-col justify-center">
                    <div className="flex justify-between py-2 w-full bg-white px-6  ">
                      {" "}
                      <div className="md:text-xl text-sm pt-2 font-semibold  md:font-bold">
                        {element.title}
                      </div>
                      <div className="flex md:gap-2 gap-0 md:pr-2">
                        {element.options.length < 4 ? (
                          <Tooltip
                            title={
                              element.options.length >= 4
                                ? "Maximum options reached"
                                : "Add Options"
                            }>
                            <IconButton
                              onClick={() =>
                                element.options.length < 4 &&
                                handleAddNewOptions(element._id)
                              }>
                              <AddchartIcon />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                        <Tooltip title="Edit Title">
                          <IconButton
                            onClick={() => handleEditTitleOpen(element._id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDeletePoll(element._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="flex w-full bg-white flex-col">
                      {element.options.map((option, index) => (
                        <div
                          className="flex md:mx-2 bg-blue-400 hover:bg-blue-500  border-2  border-slate-100 hover:border-blue-300 mt-1 rounded-md  justify- between"
                          key={index}>
                          <div
                            className=" w-full font-normal text-base  text-white py-1 md:px-6 px-2"
                            key={index}>
                            {" "}
                            {option.option}
                          </div>
                          <div
                            className={`pr-2 text-sm pt-2  font-normal md:font-bold text-white`}>
                            {option.vote}
                          </div>
                          <span
                            className={`pr-6 pt-2 text-sm text-white font-medium`}>
                            Votes
                          </span>
                          <div className="pr-6">
                            <Tooltip title="Delete Option">
                              <IconButton
                                onClick={() =>
                                  handleDeletePollOption(
                                    element._id,
                                    option.option
                                  )
                                }>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      ))}{" "}
                    </div>
                  </div>
                </div>
              ))}
              <div className=" mt-4 flex justify-center">
                <div>
                  <TablePagination
                    component="div"
                    count={allListedPolls.length}
                    rowsPerPageOptions={[5, 10, 25]}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          ) : (
            <NoPollData />
          )}
        </div>
      )}
    </>
  );
}
