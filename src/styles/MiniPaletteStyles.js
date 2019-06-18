export default {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid black",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1
    }
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "100px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4.5px"
  },
  deleteIconButton: {
    color: 'white',
    backgroundColor: 'red',
    width: '18px',
    height: '18px',
    position: 'absolute',
    right: '0px',
    top: '0px',
    padding: '7px',
    zIndex: 10,
    opacity: 0
  }
};
