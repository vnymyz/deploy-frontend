import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import {
  Box,
  Container,
  Grid,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader";
import { io } from "socket.io-client";

import flatYellow from "../images/flat-yellow.png";
import flatBlue from "../images/flat-blue.png";

const socket = io("https://gembulcimotbackend.onrender.com", {
  reconnection: true,
});

const Kucing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [kategoriList, setKategoriList] = useState([]);

  // Fetch kategoriList
  const fetchKategoriList = async () => {
    try {
      const { data } = await axios.get(
        "https://gembulcimotbackend.onrender.com/kategori/show"
      );
      setKategoriList(data.kategori);
    } catch (error) {
      console.log(error);
    }
  };

  // buat ambil data kategori
  useEffect(() => {
    // setLoading(true);
    fetchKategoriList();
  }, []);

  // Ensure that default category is set only when kategoriList changes
  useEffect(() => {
    // Set default selectedKategori to "Daftar Kucing" if found
    const defaultKategori = kategoriList.find(
      (kategori) => kategori.namakat === "Daftar Kucing"
    );

    if (defaultKategori && !selectedKategori) {
      setSelectedKategori(defaultKategori._id);

      // Fetch posts for the default category "Daftar Kucing"
      fetchPostByKategori(defaultKategori._id);
    }
    setLoading(false);
  }, [kategoriList, selectedKategori]);

  // DISPLAY POST
  const showPost = async () => {
    try {
      const { data } = await axios.get(
        "https://gembulcimotbackend.onrender.com/post/show"
      );
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   showPost();
  // }, []); biar enggak loading 2x

  // PANGGIL POST BERDASARKAN KATEGOR
  // ini butuh banget
  const fetchPostByKategori = async (kategoriId) => {
    // console.log("Fetching posts by category ID:", kategoriId);
    try {
      const { data } = await axios.get(
        `https://gembulcimotbackend.onrender.com/bykategori/${kategoriId}`
      );
      console.log("Fetched posts:", data.posts);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlekategori
  const handleKategoriChange = (event) => {
    const selectedKategoriId = event.target.value;
    // setSelectedKategori(selectedKategoriId);
    console.log("Selected Kategori Before:", selectedKategori);
    setSelectedKategori(selectedKategoriId);
    console.log("Selected Kategori After:", selectedKategori);

    if (selectedKategoriId !== "all") {
      fetchPostByKategori(selectedKategoriId);
    } else {
      showPost();
    }

    // Simpan selectedKategori di localStorage
    localStorage.setItem("selectedKategori", selectedKategoriId);
  };

  // last select kategori
  useEffect(() => {
    const lastSelectedKategori = localStorage.getItem("selectedKategori");
    if (lastSelectedKategori) {
      setSelectedKategori(lastSelectedKategori);

      if (lastSelectedKategori !== "all") {
        fetchPostByKategori(lastSelectedKategori);
      } else {
        showPost();
      }
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   socket.on("add-like", (newPosts) => {
  //     setPostAddLike(newPosts);
  //     setPostRemoveLike([]);
  //   });
  //   socket.on("remove-like", (newPosts) => {
  //     setPostRemoveLike(newPosts);
  //     setPostAddLike([]);
  //   });
  // }, []);
  useEffect(() => {
    // socket.on("add-like", (newPosts) => {
    //   setPostAddLike(newPosts);
    // });
    // socket.on("remove-like", (newPosts) => {
    //   setPostRemoveLike(newPosts);
    // });
  }, []);

  let uiPosts =
    postAddLike.length > 0
      ? postAddLike
      : postRemoveLike.length > 0
      ? postRemoveLike
      : posts;

  return (
    <>
      {/* <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}> */}
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
          style={{
            position: "absolute",
            width: "250px",
            bottom: "0",
            zIndex: "-1",
          }}
          alt="blue"
        />
        <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 5,
              marginRight: 3,
            }}
          >
            {/* Typography untuk pilih kategori */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px" }}>
                Pilih Kategori :
              </Typography>
              {/* SELECT BUTTON KATEGORI */}
              <Select
                value={selectedKategori}
                onChange={handleKategoriChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{ backgroundColor: "#F5F5F5", minWidth: "150px" }}
              >
                <MenuItem value="all">Semua Kategori</MenuItem>
                {kategoriList.map((kategori) => (
                  <MenuItem key={kategori._id} value={kategori._id}>
                    {kategori.namakat}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {/* jika loading true maka loader akan berjalan */}
              {loading ? (
                <Loader />
              ) : (
                uiPosts.map((post, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    {/* BUAT TAMPILIN POSTINGAN */}
                    <PostCard
                      id={post._id}
                      title={post.title}
                      content={post.content}
                      image={post.image ? post.image.url : ""}
                      subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
                      comments={post.comments.length}
                      likes={post.likes.length}
                      likesId={post.likes}
                      // showPost={() => {
                      //   if (selectedKategori) {
                      //     fetchPostByKategori(selectedKategori);
                      //   } else {
                      //     showPost();
                      //   }
                      // }}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Container>
      </div>
      <Footer />
      {/* </Box> */}
    </>
  );
};

export default Kucing;
