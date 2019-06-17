import mySizes from "./MediaQueries";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    },
    [mySizes.down("large")]: {
      width: "25%",
      height: "20%"
    },
    [mySizes.down("medium")]: {
      width: "50%",
      height: "10%"
    },
    [mySizes.down("small")]: {
      width: "100%",
      height: "5%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: { transition: "all 0.3s ease-in-out" }
};

export default styles;
