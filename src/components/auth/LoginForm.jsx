import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, Navigate } from "react-router-dom";
import { instance } from "../../utils/axiosInstace";
import { signinSuccess, signinFail } from "../../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

const defaultTheme = createTheme();

export default function LoginForm() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isLoginAuthenticated
  );
  const isError = useSelector((state) => state.auth.error);
  console.log(isError);
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
    role: "user",
  };

  const SigninSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Too short username")
      .max(25),
    password: Yup.string()
      .required("Password is required")
      .min(5)
      .max(25)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    try {
      const response = await instance.get("/login", { params: values });
      if (response.data.error === 0) {
        dispatch(signinSuccess(response.data.data));
        resetForm();
      } else {
        dispatch(signinFail(response.data.data));
        console.log(response.data.data);
      }
      console.log(response);
    } catch (error) {
      console.error("Error signing in:", error);
      dispatch(signinFail(error.message));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={SigninSchema}>
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="UserName"
                      name="username"
                      autoComplete="UserName"
                      autoFocus
                    />
                    {errors.username && touched.username ? (
                      <div className="text-red-400">{errors.username}</div>
                    ) : null}
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-400">{errors.password}</div>
                    ) : null}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                  <div className="text-red-500 text-center text-lg">
                    {isError}
                  </div>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link to="/signup">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <div>
        {isAuthenticated && <Navigate to="/dashboard" replace={true} />}
      </div>
    </ThemeProvider>
  );
}
