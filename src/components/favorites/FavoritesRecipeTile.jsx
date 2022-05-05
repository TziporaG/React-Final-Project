import React, { useContext, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../app/context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import emailjs from "@emailjs/browser";
import Input from "@mui/material/Input";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function RecipeTile(props) {
  const listContext = useContext(FavoritesContext);
  const form = useRef();

  const onClearClick = (props) => {
    listContext.listDispatch({
      type: "remove",
      index: props.index,
    });

    props.isFavorited = false;
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
            <RemoveCircleIcon onClick={onClearClick}></RemoveCircleIcon>
          </Button>
          <Button size="small">
            <Popup
              trigger={<ShareIcon> </ShareIcon>}
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
                    defaultValue={`http://localhost:3000/#/recipe/${props.recipe.id}`}
                  ></textarea>
                </form>
              </div>
            </Popup>
            )
          </Button>
        </CardActions>
        <Link to={`/recipe/${props.recipe.id}`}>
          <CardContent style={{ height: "calc(15vh - 15px)" }}>
            <Typography gutterBottom variant="h6" component="div">
              {props.recipe.title}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
