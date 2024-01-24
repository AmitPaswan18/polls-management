import { instance } from "../../utils/axiosInstace";

import { Typography } from "@mui/material";
import ToggleSelectar from "../common/ToggleSelector";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

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

const EditPollTitle = () => {
  const allListedPolls = useSelector((state) => state.poll.poll);
  const editPollTitleId = useSelector((state) => state.poll.editId);

  const navigate = useNavigate();
  const poll = allListedPolls.find(
    (element) => element._id === editPollTitleId
  );

  const [open, setOpen] = useState(true);
  const [editTitle, setEditTitle] = useState(poll.title);

  const handleClose = () => {
    navigate("/dashboard");
    setOpen(false);
  };

  const handleUpdatePollTitle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const title = formData.get("editTitle");

    console.log(title);
    console.log(formData);
    instance
      .get(`/update_poll_title?id=${editPollTitleId}&title=${editTitle}`)
      .then((response) => {
        if (response.status === 200) {
          handleClose();
        }
      });
  };

  const handleEditTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <form onSubmit={handleUpdatePollTitle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Title:
              </Typography>
              <ToggleSelectar
                className={"px-8 py-2 border-2 rounded-md"}
                value={editTitle}
                id="editTitle"
                title="editTitle"
                onChange={handleEditTitleChange}
              />
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EditPollTitle;
