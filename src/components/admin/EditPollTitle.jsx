import { Button } from "@mui/material";
import ToggleSelectar from "../common/ToggleSelector";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { instance } from "../../utils/axiosInstace";
import Box from "@mui/material/Box";
import bgImage from "../assets/bgEditImg.webp";

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

  const [editTitle, setEditTitle] = useState(poll.title);

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleUpdatePollTitle = async (values) => {
    const { editTitle } = values;

    instance
      .get(`/update_poll_title?id=${editPollTitleId}&title=${editTitle}`)
      .then((response) => {
        if (response.status === 200) {
          handleClose();
        }
      });
  };

  const validationSchema = Yup.object().shape({
    editTitle: Yup.string()
      .required("Title is required")
      .test("notEmpty", "Title must not be empty", (value) => {
        return value.trim() !== "";
      }),
  });

  return (
    <div>
      <img className="blur-[2px] h-[100vh]  w-full" src={bgImage} alt="" />
      <Box sx={style}>
        <Formik
          initialValues={{ editTitle }}
          validationSchema={validationSchema}
          onSubmit={handleUpdatePollTitle}>
          <Form>
            <div className="text-2xl">Edit Title:</div>
            <Field
              as={ToggleSelectar}
              className={"px-8 py-2 border-2 mt-4 rounded-md"}
              name="editTitle"
              id="editTitle"
              title="editTitle"
            />
            <div className="mt-2 gap-2 flex">
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
              <Button onClick={() => handleClose()} variant="contained">
                Back to Home
              </Button>
            </div>
          </Form>
        </Formik>
      </Box>
    </div>
  );
};

export default EditPollTitle;
