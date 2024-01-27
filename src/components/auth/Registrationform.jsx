import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import bgImage from "../assets/bgImage.webp";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  signupSuccess,
  signupFail,
  signout,
  resetError,
} from "../../redux/Slices/authSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { instance } from "../../utils/axiosInstace";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MyTextField(props) {
  const { label, ...otherProps } = props;

  return (
    <TextField
      {...otherProps}
      InputProps={{
        style: { color: "white" },
        inputProps: {
          style: { color: "white" },
        },
      }}
      InputLabelProps={{
        style: { color: "Black" },
      }}
      label={label}
    />
  );
}

export default function Registrationform() {
  const role = [
    {
      value: "Guest",
      label: "Guest",
    },
    {
      value: "Admin",
      label: "Admin",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  let signuperror = useSelector((state) => state.auth.signuperror);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Too short username")
      .max(25),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Too short password")
      .max(25)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      ),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
    confirmpassword: "",
    role: "Guest",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await instance.get("/add_user", { params: values });
      dispatch(signupSuccess(response.data));
      if (response.data.error) {
        dispatch(signupFail(response.data.message));
      } else {
        dispatch(signupSuccess(response.data));
        setTimeout(function () {
          dispatch(signout());
          resetForm();
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <div>
      <img
        className="h-[100dvh] blur-sm brightness-90  w-full"
        src={bgImage}
        alt=""
      />
      <Container
        className="md:border h-[100dvh] border-0 z-10 absolute top-0 md:max-h-[95%] md:mt-2 mt-0 sm:pt-10 md:pt-0 right-0 left-0 rounded-md text-black  md:backdrop-blur-xl backdrop-blur-2xl backdrop-brightness-110 shadow-cyan-700 shadow-lg"
        component="main"
        sx={{ paddingLeft: "0", paddingRight: "0" }}
        maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography
            sx={{
              display: "flex",
              fontFamily: "Poppins",
              fontSize: "30px",
              lineHeight: "1",
            }}
            component="h1"
            variant="h6">
            Sign Up
          </Typography>
          {isAuthenticated && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Registration Successfull.</Alert>
            </Stack>
          )}

          <div className="text-red-500">{signuperror}</div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={SignupSchema}>
            {({ errors, touched }) => (
              <Form className="w-full">
                <Box sx={{ mt: 1 }}>
                  <Grid
                    sx={{
                      display: "flex",
                      paddingLeft: "60px",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    container
                    spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={MyTextField}
                        sx={{
                          color: "white",
                          width: "80%",
                          "& input::placeholder": {
                            color: "white",
                          },
                        }}
                        autoComplete="given-name"
                        name="username"
                        required
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        label="Username"
                        autoFocus
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-400">{errors.username}</div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={MyTextField}
                        sx={{
                          color: "white",
                          width: "80%",
                          "& input::placeholder": {
                            color: "white",
                          },
                        }}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="standard-basic"
                        variant="standard"
                        autoComplete="new-password"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-400">{errors.password}</div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={MyTextField}
                        sx={{
                          color: "white",
                          width: "80%",
                          "& input::placeholder": {
                            color: "white",
                          },
                        }}
                        required
                        fullWidth
                        name="confirmpassword"
                        label="ConfirmPassword"
                        type="password"
                        id="standard-basic"
                        variant="standard"
                        autoComplete="new-password"
                      />
                      {errors.confirmpassword && touched.confirmpassword ? (
                        <div className="text-red-400">
                          {errors.confirmpassword}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        id="outlined-select-role"
                        select
                        label="Select"
                        name="role"
                        helperText="Please select your role"
                        defaultValue="Guest">
                        {role.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                      {errors.role && touched.role ? (
                        <div>{errors.role}</div>
                      ) : null}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        mt: 3,
                        mb: 2,
                        width: "80%",
                        "& input::placeholder": {
                          color: "white",
                        },
                      }}>
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link
                        className="underline md:font-normal font-light"
                        to="/">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
}
