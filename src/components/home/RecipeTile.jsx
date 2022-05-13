import React, { useContext, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../app/context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import emailjs from "@emailjs/browser";
import Input from "@mui/material/Input";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import { red } from "@mui/material/colors";

import Snackbar from "@mui/material/Snackbar";

export default function RecipeTile(props) {
  const listContext = useContext(FavoritesContext);
  const form = useRef();
  const [open, setOpen] = React.useState(false);

  //taken from mui.com
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const onFavoriteClick = (props) => {
    listContext.listDispatch({
      type: "add",
      index: props.index,
      title: props.title,
      id: props.id,
      image: props.image,
    });
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ktt1i4l",
        "template_6pgdh4b",
        form.current,
        "lWv_pc8UP3okr1Dk8"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/recipe/${props.id}`}>
          <CardMedia
            component="img"
            alt="Recipe"
            height="calc(25vh - 25px)"
            image={props.image}
          />{" "}
        </Link>
        <CardActions>
          <Button size="small">
            <FavoriteBorderIcon
              sx={{ color: red[700] }}
              onClick={() => onFavoriteClick(props)}
            ></FavoriteBorderIcon>
          </Button>
          <Button size="small">
            <Popup
              trigger={<ShareIcon sx={{ color: red[700] }}> </ShareIcon>}
              position="right center"
              closeOnDocumentClick
            >
              <div>
                <form ref={form} onSubmit={sendEmail}>
                  <label>Recipient Email: </label>
                  <Input type="email" name="user_email" />
                  <label>From (your name): </label>
                  <Input type="text" name="name" />
                  <Button
                    type="submit"
                    value="Send"
                    variant="outlined"
                    size="small"
                  >
                    Send
                  </Button>
                  <br />
                  <label>Link:</label>
                  <textarea
                    readOnly
                    name="recipe_link"
                    defaultValue={`http://localhost:3000/#/recipe/${props.id}`}
                  ></textarea>
                </form>
              </div>
            </Popup>
          </Button>
        </CardActions>
        <Link to="/recipe/${props.id}">
          <CardContent style={{ height: "calc(15vh - 15px)" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ color: "black" }}
            >
              {props.title}
            </Typography>
          </CardContent>
        </Link>
      </Card>
      <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Added to favorites!
        </Alert>
      </Snackbar>
    </div>
  );
}
