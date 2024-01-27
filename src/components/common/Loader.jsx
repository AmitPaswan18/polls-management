import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Loader = ({ loadingtext }) => {
  return (
    <div className="h-[100vh] w-full flex font-semibold bg-[#371953] border-2 gap-4 text-white justify-center items-center">
      <div className=" flex gap-2 ">
        <Typography
          sx={{
            display: "flex",
            fontFamily: "Poppins",
            fontSize: "25px",
            lineHeight: "1",
            border: "1px solid white",
            p: 4,
            borderRadius: "5px",
            marginTop: "12px",
          }}
          component="h1"
          variant="h6">
          {loadingtext}
          <div>
            <CircularProgress sx={{ color: "white" }} />
          </div>
        </Typography>
      </div>
    </div>
  );
};

export default Loader;
