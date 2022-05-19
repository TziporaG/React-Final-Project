import React, { useContext, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../app/FavoritesContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import emailjs from "@emailjs/browser";
import Input from "@mui/material/Input";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { red } from "@mui/material/colors";

export default function RecipeTile(props) {
  const listContext = useContext(FavoritesContext);
  const form = useRef();

  const onClearClick = (props) => {
    listContext.listDispatch({
      type: "remove",
      id: props,
    });
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
    <span>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/recipe/${props.recipe.id}`}>
          <CardMedia
            component="img"
            alt="Recipe"
            height="calc(25vh - 25px)"
            image={props.recipe.image}
          />{" "}
        </Link>
        <CardActions>
          <Button size="small">
            <RemoveCircleOutlineIcon
              sx={{ color: red[700] }}
              onClick={() => onClearClick(props.recipe.id)}
            ></RemoveCircleOutlineIcon>
          </Button>
          <Button size="small">
            <Popup
              trigger={<ShareIcon sx={{ color: red[700] }}> </ShareIcon>}
              position="right center"
              closeOnDocumentClick
            >
              <div>
                <form ref={form} onSubmit={sendEmail}>
                  <Input
                    type="email"
                    name="user_email"
                    placeholder="Recipient Email"
                  />
                  <Input
                    type="text"
                    name="name"
                    placeholder="From (your name)"
                  />
                  <br></br>
                  <br></br>
                  <Button
                    type="submit"
                    value="Send"
                    variant="outlined"
                    size="small"
                  >
                    Send
                  </Button>
                  <br></br> <br></br>
                  <label>Link:</label>
                  <textarea
                    style={{ border: "none", outline: "none", resize: "none" }}
                    readOnly
                    name="recipe_link"
                    defaultValue={`https://tziporag.github.io/React-Final-Project/#/recipe/${props.recipe.id}`}
                  ></textarea>
                </form>
              </div>
            </Popup>
          </Button>
        </CardActions>
        <Link to={`/recipe/${props.recipe.id}`}>
          <CardContent style={{ height: "calc(15vh - 15px)" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ color: "black" }}
            >
              {props.recipe.title}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </span>
  );
}
