import { instance } from "../../utils/axiosInstace";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import { getAllPolls } from "../../redux/Slices/pollSlice";
import { Formik, Form, Field } from "formik";

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

const NewPollSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .test("noEmpty", "Title must not be empty", (options) => {
      return options.trim() !== "";
    }),
  options: Yup.array()
    .min(2, "Minimum of 2 options required")
    .max(4, "Maximum of 4 options allowed")
    .test("unique-options", "Options must be unique", function (options) {
      const uniqueOptions = new Set(options);
      return uniqueOptions.size === options.length;
    })
    .test("notEmpty", "Options must not be empty", function (options) {
      return options.every((option) => option.trim() !== "");
    }),
});

const initialValues = {
  title: "",
  options: [""],
};

const AddNewPoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate("/dashboard");
  };

  const fetchLatestPoll = () => {
    instance
      .get("/list_polls")
      .then((response) => dispatch(getAllPolls(response.data.data)));
  };
  return (
    <>
      <div className=" bg-[#371953] h-[100vh]  w-full"></div>
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          validationSchema={NewPollSchema}
          onSubmit={async (values) => {
            try {
              const response = await instance.get(
                `/add_poll?title=${values.title}&options=${values.options.join(
                  "____"
                )}`
              );
              if (response.data.error === 0) {
                fetchLatestPoll();
              }
            } catch (error) {
              console.error("Error:", error.message);
            }

            handleClose();
          }}>
          {(formik) => (
            <Form className="font-poppins">
              <p className="text-lg">Title:</p>
              <Field
                className="p-1 w-full outline-none hover:border-sky-300 border-2 border-gray-200  rounded-md"
                type="text"
                name="title"
                id="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-400"
              />
              <p className="text-lg">Options:</p>
              <FieldArray
                name="options"
                render={(arrayHelpers) => (
                  <ul>
                    {formik.values.options.map((option, index) => (
                      <div className="flex flex-col" key={index}>
                        {`Opt${index + 1}`}
                        <div>
                          <Field
                            className="border-2 outline-none  p-1 hover:border-sky-300 border-slate-200 rounded-md m-1"
                            type="text"
                            name={`options.${index}`}
                          />
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}>
                            <CloseIcon />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {formik.values.options.length < 4 && (
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}>
                        <AddCircleOutlineIcon />
                      </Button>
                    )}
                  </ul>
                )}
              />
              <ErrorMessage
                name="options"
                component="div"
                className="text-red-400"
              />
              <div className="py-2 flex flex-col gap-2 w-[90%] pl-[10%]">
                <Button type="submit" className="m-2" variant="contained">
                  Submit
                </Button>
                <Button onClick={() => handleClose()} variant="contained">
                  Back to Home
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddNewPoll;
