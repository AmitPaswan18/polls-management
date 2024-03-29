import { Button } from "@mui/material";
import ToggleSelectar from "../common/ToggleSelector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { fetchSinglePollAsync } from "../../redux/Thunk/pollThunk.js";

import Box from "@mui/material/Box";

import Loader from "../common/Loader";

import {updatePollTitleAsync} from "../../redux/Thunk/pollTitleThunk.js"

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
  const singlePoll = useSelector((state) => state.newPoll.singlePoll);
  const editLoader = useSelector((state) => state.poll.loading);

  const editId = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const poll = allListedPolls.find(
    (element) => element._id === editPollTitleId
  );

  const [editTitle, setEditTitle] = useState(poll?.title);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSinglePollAsync(editId.id));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching single poll:", error);
      }
    };

    fetchData();
  }, [editId.id]);


  useEffect(() => {
    if (!singlePoll) return;
    setEditTitle(singlePoll.title);
  }, [singlePoll]);


  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleUpdatePollTitle = async (values) => {
    const { editTitle } = values;
    const success = await dispatch(
      updatePollTitleAsync({ editPollTitleId, editTitle })
    );

    if (success) {
      handleClose();
    }
  };

  const validationSchema = Yup.object().shape({
    editTitle: Yup.string()
      .required("Title is required")
      .test("notEmpty", "Title must not be empty", (value) => {
        return value.trim() !== "";
      }),
  });

  return (
    <>
      {loading ? (
        <Loader loadingtext={"Loading..."} />
      ) : (
        <>
          <div className="flex bg-[#4EB7F8] justify-start w-full pl-[34%] font-poppins py-4 ">
            <div className="lg:text-3xl md:flex  hidden md:text-lg text-white font-light md:font-medium md:pl-16 pl-0  text-sm md:w-[50%] w-[30px]">
              {" "}
              Edit Poll Title
            </div>
          </div>
          <div className="  bg-[##F8F8F8] max-h-fit w-full">
            {editLoader ? (
              <Loader loadingtext={"Updating Title..."} />
            ) : (
              <Box sx={style}>
                <Formik
                  initialValues={{ editTitle }}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdatePollTitle}>
                  {({ dirty }) => (
                    <Form>
                      <div className="text-lg">Edit Title:</div>
                      <Field
                        as={ToggleSelectar}
                        className={
                          "p-2 border-2 my-3 rounded-md placeholder:bg-[#2B1442]"
                        }
                        name="editTitle"
                        placeholder="Edit Title"
                        id="editTitle"
                        title="editTitle"
                      />
                      <div className="mt-2 gap-2 flex">
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={!dirty}>
                          Save Changes
                        </Button>
                        <Button
                          onClick={() => handleClose()}
                          variant="contained">
                          Back to Home
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EditPollTitle;
