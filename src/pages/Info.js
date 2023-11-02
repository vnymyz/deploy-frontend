// import { Select, MenuItem } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import PostCard from "../components/PostCard";
// import { Box, Container, Grid } from "@mui/material";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axios from "axios";
// import moment from "moment";
// import Loader from "../components/Loader";
// import { io } from "socket.io-client";

// import flatYellow from "../images/flat-yellow.png";
// import flatBlue from "../images/flat-blue.png";

// const socket = io("/", {
//   reconnection: true,
// });

// const Info = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [postAddLike, setPostAddLike] = useState([]);
//   const [postRemoveLike, setPostRemoveLike] = useState([]);
//   const [selectedKategori, setSelectedKategori] = useState("");
//   const [kategoriList, setKategoriList] = useState([]);

//   // DISPLAY POST
//   const fetchKategoriList = async () => {
//     try {
//       const { data } = await axios.get("/api/kategori/show");
//       setKategoriList(data.kategori);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchKategoriList();
//   }, []);

//   const displayPost = async () => {
//     try {
//       const { data } = await axios.get("/api/post/show");
//       setPosts(data.posts);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     displayPost();
//   }, []);

//   const fetchPostByKategori = async (kategoriId) => {
//     try {
//       const { data } = await axios.get(`/api/bykategori/${kategoriId}`);
//       setPosts(data.posts);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const handlekategori
//   const handleKategoriChange = (event) => {
//     const selectedKategoriId = event.target.value;
//     setSelectedKategori(selectedKategoriId);

//     if (selectedKategoriId) {
//       fetchPostByKategori(selectedKategoriId);
//     } else {
//       displayPost();
//     }
//   };

//   useEffect(() => {
//     socket.on("add-like", (newPosts) => {
//       setPostAddLike(newPosts);
//       setPostRemoveLike("");
//     });
//     socket.on("remove-like", (newPosts) => {
//       setPostRemoveLike(newPosts);
//       setPostAddLike("");
//     });
//   }, []);

//   let uiPosts =
//     postAddLike.length > 0
//       ? postAddLike
//       : postRemoveLike.length > 0
//       ? postRemoveLike
//       : posts;

//   return (
//     <>
//       {/* <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}> */}
//       <Navbar />
//       <div
//         style={{
//           border: "0px solid",
//           minHeight: "100vh",
//           position: "relative",
//         }}
//       >
//         <img
//           src={flatYellow}
//           style={{
//             position: "absolute",
//             width: "250px",
//             right: "0",
//             zIndex: "-1",
//           }}
//           alt="yellow"
//         />
//         <img
//           src={flatBlue}
//           style={{
//             position: "absolute",
//             width: "250px",
//             bottom: "0",
//             zIndex: "-1",
//           }}
//           alt="blue"
//         />
//         <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
//           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//             <Select
//               value={selectedKategori}
//               onChange={handleKategoriChange}
//               displayEmpty
//               inputProps={{ "aria-label": "Without label" }}
//             >
//               <MenuItem value="">Semua Kategori</MenuItem>
//               {kategoriList.map((kategori) => (
//                 <MenuItem key={kategori._id} value={kategori._id}>
//                   {kategori.namakat}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Box>
//           <Box sx={{ flexGrow: 1 }}>
//             <Grid
//               container
//               spacing={{ xs: 2, md: 3 }}
//               columns={{ xs: 4, sm: 8, md: 12 }}
//             >
//               {/* jika loading true maka loader akan berjalan */}
//               {loading ? (
//                 <Loader />
//               ) : (
//                 uiPosts.map((post, index) => (
//                   <Grid item xs={2} sm={4} md={4} key={index}>
//                     <PostCard
//                       id={post._id}
//                       title={post.title}
//                       content={post.content}
//                       image={post.image ? post.image.url : ""}
//                       subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
//                       comments={post.comments.length}
//                       likes={post.likes.length}
//                       likesId={post.likes}
//                       showPosts={displayPost}
//                     />
//                   </Grid>
//                 ))
//               )}
//             </Grid>
//           </Box>
//         </Container>
//       </div>
//       <Footer />
//       {/* </Box> */}
//     </>
//   );
// };

// export default Info;
