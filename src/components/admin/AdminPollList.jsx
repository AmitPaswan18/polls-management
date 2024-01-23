import { instance } from "../../utils/axiosInstace";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  fontFamily: "Poppins",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

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
  const [open, setOpen] = useState(false);
  const [isListedPoll, setListedPolls] = useState([]);

  console.log(isListedPoll);
  const handleaddpoll = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const title = formData.get("title");
    const options = formData.getAll("option");

    console.log(title, options);

    console.log(formData);

    instance
      .get(`/add_poll?title=${title}&options=${options.join("____")}`)
      .then((response) => {
        console.log("Successful Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    setFormData({
      title: "",
      options: [],
    });
    setOpen(false);
  };

  const handleDeletePoll = (deleteId) => {
    instance.get(`/delete_poll?id=${deleteId}`);
    fetchlatestPoll();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: "",
      options: ["Option 1"],
    });
  };
  const [formData, setFormData] = useState({
    title: "",
    options: ["Option 1"],
  });

  const addOption = () => {
    if (formData.options.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        options: [...prevData.options, `Option ${prevData.options.length + 1}`],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    instance
      .get("/list_polls")
      .then((response) => setListedPolls(response.data.data));
  }, []);

  const fetchlatestPoll = () => {
    instance
      .get("/list_polls")
      .then((response) => setListedPolls(response.data.data));
  };

  return (
    <>
      <div className="flex bg-white pl-[34%] font-poppins pt-10 ">
        <div className="lg:text-3xl md:text-lg text-sm md:w-[50%] w-full">
          {" "}
          Admin Poll DashBoard
        </div>
        <div className="flex text-center w-[50%] pl-[10%] pb-4 gap-4 bg-white ">
          <ThemeProvider theme={theme}>
            <button
              className="bg-blue-500 rounded-md text-sm  font-thin px-6 py-2 text-white"
              onClick={handleOpen}>
              New Poll
            </button>
            <button className="bg-red-500 rounded-md text-sm font-thin px-6 py-2 text-white">
              SignUp
            </button>
          </ThemeProvider>
        </div>
      </div>

      <div className="h-fit  mt-10 flex flex-col w-full">
        {isListedPoll.map((element, index) => (
          <div className="flex justify-center w-full mt-1 " key={index}>
            <div className="flex w-[80%] border-2 shadow-sm shadow-teal-100 rounded-md flex-col justify-center">
              <div className=" flex justify-between py-2 w-full bg-white px-6 border-b-stone-500 border ">
                {" "}
                <div className="text-lg">{element.title}</div>
                <div className="flex gap-4">
                  <div>
                    <button>
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
                {element.options.map((element, index) => (
                  <div className="flex justify-between" key={index}>
                    <div
                      className=" w-full  text-sm font-normal  py-2 px-6 "
                      key={index}>
                      {" "}
                      {element.option}
                    </div>
                    <div className="pr-6">
                      <button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form className="font-poppins" onSubmit={handleaddpoll}>
            <Typography variant="h4">Title:</Typography>
            <input
              className="p-1 w-full outline-none hover:border-sky-300 border-2 border-gray-200  rounded-md"
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <p className="text-lg">Options:</p>
            <ul>
              {formData.options.map((option, index) => (
                <div className="flex flex-col" key={index}>
                  {`Opt${index + 1}`}
                  <input
                    className="border-2 outline-none  p-1 hover:border-sky-300 border-slate-200 rounded-md m-1"
                    type="text"
                    id="option"
                    name="option"
                    onChange={(e) => {
                      const newOptions = [...formData.options];
                      newOptions[index] = e.target.value;
                      setFormData((prevDatapoll) => ({
                        ...prevDatapoll,
                        options: newOptions,
                      }));
                    }}
                  />
                </div>
              ))}
            </ul>
            {formData.options.length < 4 && (
              <Button onClick={addOption}>
                <AddCircleOutlineIcon />
              </Button>
            )}
            <div className="py-2 flex flex-col gap-2 w-[90%] pl-[10%]">
              <Button type="submit" className="m-2" variant="contained">
                Submit
              </Button>
              <Button onClick={() => handleClose()} variant="contained">
                Back to Home
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
