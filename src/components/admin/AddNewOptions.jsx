import { Button } from "@mui/material";
import ToggleSelectar from "../common/ToggleSelector";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";

import Loader from "../common/Loader";
import { addNewOptionAsync } from "../../redux/Thunk/pollThunk";

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

const AddNewOptions = () => {
  const allListedPolls = useSelector((state) => state.poll.poll);
  const editPollTitleId = useSelector((state) => state.poll.editId);
  const editLoading = useSelector((state) => state.poll.loading);

  const poll = allListedPolls.find(
    (element) => element._id === editPollTitleId
  );

  const duplicateOption = poll.options.map((option) => {
    return option.option;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleAddNewOptions = async (values) => {
    try {
      dispatch(
        addNewOptionAsync({
          editPollTitleId,
          optionText: values.addOptions,
        })
      );

      handleClose();
    } catch (error) {
      console.error("Error adding new option:", error);
    }
  };

const validationSchema = Yup.object().shape({
  addOptions: Yup.string()
    .required("Option is required")
    .test("unique-options", "Options must be unique", function (option) {
      const lowercaseOption = option.trim().toLowerCase();
      const isDuplicate = duplicateOption.includes(lowercaseOption);

      return !isDuplicate;
    })
    .test("notEmpty", "Options must not be empty", function (option) {
      return option.trim() !== "";
    }),
});


  const initialValues = {
    addOptions: "",
  };

  return (
    <>
      {editLoading ? (
        <Loader loadingtext={"Adding New Options...."} />
      ) : (
        <div>
          <div className=" bg-[#F6F6F6] h-[100dvh] w-full"></div>
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddNewOptions}>
              <Form>
                <div className="text-2xl">Add New Option:</div>
                <Field
                  as={ToggleSelectar}
                  className={" px-2 py-2 border-2 my-3 rounded-md"}
                  name="addOptions"
                  id="addOptions"
                  title="Add new options"
                />
                <ErrorMessage
                  name="addOptions"
                  component="div"
                  className="text-red-400"
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
      )}
    </>
  );
};

export default AddNewOptions;

