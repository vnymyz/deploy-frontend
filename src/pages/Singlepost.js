import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import moment from "moment";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import CommentList from "../components/CommentList";
import { io } from "socket.io-client";

const socket = io("/", {
  reconnection: true,
});

const SinglePost = () => {
  const { userInfo } = useSelector((state) => state.signIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);

  const { id } = useParams();
  //fetch single post
  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://gembulcimotbackend.onrender.com/post/${id}`
      );
      // console.log(data)
      setTitle(data.post.title);
      setContent(data.post.content);
      setImage(data.post.image.url);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
      setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displaySinglePost();
  }, []);

  useEffect(() => {
    // console.log('SOCKET IO', socket);
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  // add comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://gembulcimotbackend.onrender.com/comment/post/${id}`,
        { comment }
      );
      if (data.success === true) {
        setComment("");
        toast.success("Komentar berhasil dikirim");
        //displaySinglePost();
        socket.emit("comment", data.post.comments);
      }
      //console.log("comment post", data.post)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : comments;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: "#fafafa",
          pt: 4,
          pb: 4,
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="290"
                      image={image}
                      alt={title}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Card elevation={3}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={title}
                      subheader={moment(createdAt).format("MMMM DD, YYYY")}
                    />
                    <CardContent style={{ minHeight: 180 }}>
                      <Typography variant="body2" color="text.secondary">
                        <Box
                          component="span"
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></Box>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card elevation={3}>
                    <CardContent>
                      {/* add coment list */}
                      {comments.length === 0 ? (
                        ""
                      ) : (
                        <Typography variant="h5" sx={{ pt: 3, mb: 2 }}>
                          Komentar:
                        </Typography>
                      )}

                      {uiCommentUpdate.map((comment) => (
                        <CommentList
                          key={comment._id}
                          name={comment.postedBy.name}
                          text={comment.text}
                        />
                      ))}

                      {userInfo ? (
                        <>
                          <Box sx={{ pt: 1, pl: 3, pb: 3, bgcolor: "#fafafa" }}>
                            <h2>Tambah Komentar Disini !</h2>
                            <form onSubmit={addComment}>
                              <TextareaAutosize
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Tambah Komentar..."
                                style={{ width: 500, padding: "5px" }}
                              />
                              <Box sx={{ pt: 1 }}>
                                <Button type="submit" variant="contained">
                                  Komentar
                                </Button>
                              </Box>
                            </form>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Link to="/login"> Login untuk berkomentar</Link>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default SinglePost;
