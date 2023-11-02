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
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import image from "../images/olen2.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const PostCard = ({
  id,
  title,
  subheader,
  image,
  content,
  comments,
  likes,
  // showPost,
  likesId,
}) => {
  // const { userInfo } = useSelector((state) => state.signIn);

  const { userInfo } = useSelector((state) => state.signIn);
  const [isLiked, setIsLiked] = useState(
    likesId.includes(userInfo && userInfo.id)
  );

  // ADD LIKE
  const addLike = async () => {
    try {
      // console.log('tes')
      const { data } = await axios.put(
        `https://gembulcimotbackend.onrender.com/addlike/post/${id}`
      );
      // console.log("likes", data.post);
      if (data.success === true) {
        // showPost();
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  // REMOVE LIKE
  const removeLike = async () => {
    try {
      const { data } = await axios.put(
        `https://gembulcimotbackend.onrender.com/removelike/post/${id}`
      );
      console.log("remove likes", data.post);
      if (data.success === true) {
        // showPost();
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        // judul
        title={title}
        subheader={subheader}
      />
      <Link to={`/post/${id}`}>
        {/* gambar dan lainnya */}
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="Paella dish"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Box
            component="span"
            dangerouslySetInnerHTML={{
              __html: content.split(" ").slice(0, 10).join(" ") + "...",
            }}
          ></Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {/* {likesId.includes(userInfo && userInfo.id) ? (
              <IconButton onClick={removeLike} aria-label="add to favorites">
                <FavoriteIcon sx={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton onClick={addLike} aria-label="add to favorites">
                <FavoriteBorderIcon sx={{ color: "red" }} />
              </IconButton>
            )} */}
            {/* likes dari database */}
            {/* {likes} Like(s) */}
            {isLiked ? (
              <IconButton
                onClick={removeLike}
                aria-label="remove from favorites"
              >
                <FavoriteIcon sx={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton onClick={addLike} aria-label="add to favorites">
                <FavoriteBorderIcon sx={{ color: "red" }} />
              </IconButton>
            )}
            {likes} Like(s)
          </Box>
          <Box>
            {/* comments dari database */}
            {comments}
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
