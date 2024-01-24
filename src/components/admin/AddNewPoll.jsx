import { useState } from "react";
import { instance } from "../../utils/axiosInstace";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllPolls } from "../../redux/Slices/pollSlice";

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

const AddNewPoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    options: ["Option 1"],
  });

  const handleaddpoll = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const options = formData.getAll("option");

    instance
      .get(`/add_poll?title=${title}&options=${options.join("____")}`)
      .then((response) => {
        console.log("Successful Response:", response.data);
        if (response.data.error === 0) {
          fetchlatestPoll();
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    setFormData({
      title: "",
      options: [],
    });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: "",
      options: ["Option 1"],
    });
    navigate("/dashboard");
  };

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

  const fetchlatestPoll = () => {
    instance
      .get("/list_polls")
      .then((response) => dispatch(getAllPolls(response.data.data)));
  };
  return (
    <div>
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
    </div>
  );
};

export default AddNewPoll;
