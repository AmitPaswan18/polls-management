import { Button } from "@mui/material";
import ToggleSelectar from "../common/ToggleSelector";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { instance } from "../../utils/axiosInstace";
import Box from "@mui/material/Box";
import { deletePoll } from "../../redux/Slices/pollSlice";
import Loader from "../common/Loader";

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

  const editLoader = useSelector((state) => state.poll.loading);
  console.log(editLoader);

  const dispatch = useDispatch();

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
    dispatch(deletePoll({ loading: true }));

    instance
      .get(`/update_poll_title?id=${editPollTitleId}&title=${editTitle}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(deletePoll({ loading: false }));
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
    <div className="  bg-[#18181B] h-[100vh] w-full">
      {editLoader ? (
        <Loader loadingtext={"Updating Title..."} />
      ) : (
        <Box sx={style}>
          <Formik
            initialValues={{ editTitle }}
            validationSchema={validationSchema}
            onSubmit={handleUpdatePollTitle}>
            <Form>
              <div className="text-lg">Edit Title:</div>
              <Field
                as={ToggleSelectar}
                className={
                  "px-8 py-2 border-2 mt-4 rounded-md placeholder:bg-[#2B1442]"
                }
                name="editTitle"
                placeholder="Edit Title"
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
      )}
    </div>
  );
};

export default EditPollTitle;
