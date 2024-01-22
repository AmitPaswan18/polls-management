import { instance } from "../../utils/axiosInstace";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";

import { useState } from "react";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  return (
    <>
      <div className="flex h-fit justify-end gap-2 pt-10 pr-10">
        <ThemeProvider theme={theme}>
          <Button onClick={handleOpen} variant="contained">
            New Poll
          </Button>
          <Button sx={{ backgroundColor: "red" }} variant="contained">
            SignUp
          </Button>
        </ThemeProvider>
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
              className="p-1 w-full outline-none hover:border-sky-300 border-2 border-gray-400  rounded-md"
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
