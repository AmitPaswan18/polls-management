import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  signupSuccess,
  signupFail,
  signout,
} from "../../redux/Slices/authSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { instance } from "../../utils/axiosInstace";
import { Link, useNavigate } from "react-router-dom";

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

export default function Registrationform() {
  const role = [
    {
      value: "user",
      label: "User",
    },
    {
      value: "admin",
      label: "Admin",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const isError = useSelector((state) => state.auth.error);

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
    role: "user",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const response = await instance.get("/add_user", { params: values });
      dispatch(signupSuccess(response.data));
      console.log(response);
      if (response.data.error) {
        console.log(response.data.message);
        dispatch(signupFail(response.data.message));
      } else {
        dispatch(signupSuccess(response.data));
        setTimeout(function () {
          dispatch(signout());
          resetForm();
          navigate("/");
        }, 2000);
        isAuthenticated = false;
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {isAuthenticated && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Registration Successfull.</Alert>
            </Stack>
          )}

          <div className="text-red-500">{isError}</div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={SignupSchema}>
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        autoComplete="given-name"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-400">{errors.username}</div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-400">{errors.password}</div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="confirmpassword"
                        label="ConfirmPassword"
                        type="password"
                        id="confirmpassword"
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
                        defaultValue="user"
                        name="role"
                        helperText="Please select your role">
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
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link to="/">Already have an account? Sign in</Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
