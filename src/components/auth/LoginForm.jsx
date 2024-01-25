import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import bgImage from "../assets/bgImage.webp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { instance } from "../../utils/axiosInstace";
import { signinSuccess, signinFail } from "../../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom/dist";
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
import { Height } from "@mui/icons-material";

export default function LoginForm() {
  const isError = useSelector((state) => state.auth.error);

  const isLoginAuthenticated = useSelector(
    (state) => state.auth.isLoginAuthenticated
  );

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
    try {
      const response = await instance.get("/login", { params: values });
      if (response.data.error === 0) {
        const decoded = jwtDecode(response.data.token);
        dispatch(signinSuccess(decoded));
        localStorage.setItem("polltoken", response.data.token);
        resetForm();
      } else {
        dispatch(signinFail(response.data.data));
      }
    } catch (error) {
      console.error("Error signing in:", error);
      dispatch(signinFail(error.message));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("polltoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(signinSuccess(decoded));
      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch(signinFail("Error decoding token"));
      }
    }
  }, [dispatch]);

  return (
    <div>
      <img
        className="h-[100vh] blur-sm brightness-90 w-full"
        src={bgImage}
        alt=""
      />
      <Container
        className=" md:h-[80%] h-full  md:border border-0 z-10 absolute top-0 md:mt-10 mt-0 right-0 left-0 rounded-md text-black  backdrop-blur-xl backdrop-brightness-110 shadow-cyan-700 shadow-lg"
        component="main"
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
                    {isError}
                  </div>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link className="underline" to="/signup">
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
        {isLoginAuthenticated && <Navigate to="/dashboard" replace={true} />}
      </div>
    </div>
  );
}
