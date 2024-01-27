import { Button } from "@mui/material";
import ToggleSelectar from "../common/ToggleSelector";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { instance } from "../../utils/axiosInstace";
import Box from "@mui/material/Box";
import { addNewOption } from "../../redux/Slices/pollSlice";
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

const AddNewOptions = () => {
  const editPollTitleId = useSelector((state) => state.poll.editId);
  const editLoading = useSelector((state) => state.poll.loading);
  console.log(editLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleAddNewOptions = async (values) => {
    dispatch(addNewOption({ loading: true }));

    instance
      .get(
        `/add_new_option?id=${editPollTitleId}&option_text=${values.addOptions}`
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(addNewOption({ loading: false }));
          handleClose();
        }
      });
  };

  const validationSchema = Yup.object().shape({
    addOptions: Yup.string()
      .required("Option is required")
      .test("notEmpty", "Options must not be empty", (value) => {
        return value.trim() !== "";
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
          <div className="bg-[#f8f8f8] h-[100dvh] w-full"></div>
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddNewOptions}>
              <Form>
                <div className="text-2xl">Add New Option:</div>
                <Field
                  as={ToggleSelectar}
                  className={"px-8 py-2 border-2 mt-4 rounded-md"}
                  name="addOptions"
                  id="addOptions"
                  title="Add new options"
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
