import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import bgImage from "../assets/bgImage.webp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import { resetError } from "../../redux/Slices/authSlice.js";

import { signinAsync } from "../../redux/Thunk/loginThunk.js";
import { autoLoginAsync } from "../../redux/Thunk/loginThunk.js";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom/dist";
import Loader from "../common/Loader";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit">Poll Management</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
import { useEffect } from "react";

export default function LoginForm() {
  const loginerror = useSelector((state) => state.auth.loginerror);

  const isLoginAuthenticated = useSelector(
    (state) => state.auth.isLoginAuthenticated
  );

  const isLoading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

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

  const SigninSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(signinAsync(values));
    resetForm();
  };

  useEffect(() => {
    dispatch(autoLoginAsync());
  }, [dispatch]);

  useEffect(() => {
    resetError();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader
          loadingtext={
            <Typography
              sx={{
                display: "flex",
                fontFamily: "Poppins",
                fontSize: "20px",
                lineHeight: "1",
                marginTop: "12px",
                color: "white",
              }}
              component="h1"
              variant="h6">
              Login Please wait...
            </Typography>
          }
        />
      ) : (
        <div>
          <img
            className="h-[100dvh]  h md:blur-sm blur-0 brightness-90 w-full"
            src={bgImage}
            alt=""
          />
          <Container
            className="md:h-[80%] h-[100dvh]  md:border border-0 z-10 absolute top-0 md:mt-10 pt-10 md:pt-0 right-0 left-0 rounded-md text-black  md:backdrop-blur-xl backdrop-blur-2xl backdrop-brightness-110 shadow-cyan-700 shadow-lg"
            component="main"
            sx={{ paddingLeft: "0", paddingRight: "0" }}
            maxWidth="xs">
            <Box
              sx={{
                paddingTop: 8,
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
                Login
              </Typography>

              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={SigninSchema}>
                {({ errors, touched }) => (
                  <Form>
                    <Box sx={{ mt: 1 }}>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                        container
                        spacing={2}>
                        <Field
                          sx={{
                            width: "70%",
                            color: "white",
                            "& input::placeholder": {
                              color: "white",
                            },
                          }}
                          as={MyTextField}
                          margin="normal"
                          required
                          fullWidth
                          id="standard-basic"
                          variant="standard"
                          label="UserName"
                          name="username"
                          autoComplete="UserName"
                          autoFocus
                        />
                        {errors.username && touched.username ? (
                          <div className="text-red-600 text-start">
                            {errors.username}
                          </div>
                        ) : null}
                        <Field
                          as={MyTextField}
                          sx={{ width: "70%" }}
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="standard-basic"
                          variant="standard"
                          autoComplete="current-password"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-red-400">{errors.password}</div>
                        ) : null}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            width: "70%",
                            mt: 3,
                            mb: 2,
                          }}>
                          Sign In
                        </Button>
                      </Grid>
                      <div className="text-red-500 text-center text-lg">
                        {loginerror}
                      </div>
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Link
                            className="underline md:font-semibold font-light"
                            to="/signup">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
            <Copyright sx={{ mt: 2, mb: 4 }} />
          </Container>
          <div>
            {isLoginAuthenticated && (
              <Navigate to="/dashboard" replace={true} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
