import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// import Image from "../images/7698135.png";
// import Image1 from "../images/undraw_friends_r511.png";
import flatYellow from "../images/flat-yellow.png";
import flatBlue from "../images/flat-blue.png";
import catBox from "../images/cat-box.png";
import { Link } from "react-router-dom";

// const LandingContainer = styled(Container)(({ theme }) => ({
//   position: "relative",
//   backgroundImage: `url(${Image})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   color: theme.palette.common.white,
//   textAlign: "center",
//   paddingTop: theme.spacing(10),
//   paddingBottom: theme.spacing(15),
// }));

const LandingContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  color: theme.palette.common.black,
  textAlign: "left",
  // paddingTop: theme.spacing(10),
  // paddingBottom: theme.spacing(15),
}));

const IntroText = styled(Typography)(({ theme }) => ({
  // marginBottom: theme.spacing(4),
  fontFamily: "Poppins",
}));

// const ActionButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(3),
// }));

const Beranda = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          border: "0px solid",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <img
          src={flatYellow}
          style={{
            position: "absolute",
            width: "250px",
            right: "0",
            zIndex: "-1",
          }}
          alt="yellow"
        />
        <img
          src={flatBlue}
          style={{ position: "absolute", width: "250px", bottom: "0" }}
          alt="blue"
        />

        <LandingContainer>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={5}
              style={{ border: "0px solid", paddingTop: "8rem" }}
            >
              <IntroText
                variant="h6"
                mb={0}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#373636",
                }}
              >
                Anda ingin mengadopsi kucing ?
              </IntroText>
              <IntroText
                variant="h3"
                mb={4}
                style={{
                  fontSize: "50px",
                  fontWeight: "900",
                  color: "#373636",
                  fontFamily: "Montserrat",
                  letterSpacing: "0",
                }}
              >
                Gembul Cimot
              </IntroText>
              <IntroText
                variant="h6"
                mb={0}
                style={{
                  fontSize: "16px",
                  color: "#373636",
                  fontWeight: "bold",
                }}
              >
                Di sinilah{" "}
                <span style={{ color: "#DC7361" }}>solusi yang tepat</span>{" "}
                untuk Anda
              </IntroText>
              <IntroText
                variant="body1"
                mb={1}
                style={{ fontSize: "16px", color: "#373636" }}
              >
                Di pusat adopsi kucing kami, kami berkomitmen untuk mencari
                rumah yang penuh kasih bagi kucing-kucing yang membutuhkan.
              </IntroText>
              <IntroText
                variant="body1"
                mb={5}
                style={{ fontSize: "16px", color: "#373636" }}
              >
                Apakah Anda mencari anak kucing yang lucu atau kucing dewasa
                yang lembut, kami memiliki berbagai sahabat kucing yang siap
                untuk Anda temui.
              </IntroText>
              <Button
                as={Link}
                to={"/kucing"}
                variant="contained"
                color="primary"
                style={{ textDecoration: "none" }}
              >
                Yuk Adopsi Kucing
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <img
                src={catBox}
                alt="Cat"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </LandingContainer>
      </div>
      <Footer />
    </>
  );
};

export default Beranda;
