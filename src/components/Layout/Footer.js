const Footer = () => {
  return (
    <>
      <footer
        style={{
          backgroundColor: "green",
          height: "5vh",

          color: "black",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          color: "white",
          zIndex: "1",
        }}
      >
        you are welcome{" "}
        <i class='fas fa-heart' style={{ color: "red", margin: "7px" }}></i>
      </footer>
    </>
  );
};

export default Footer;
