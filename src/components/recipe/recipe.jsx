import React, { useContext, useEffect, useHistory, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import emailjs from "@emailjs/browser";
import Input from "@mui/material/Input";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function RecipeHeader(props) {
  const navigate = useNavigate();
  const form = useRef();

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
      <Button sx={{ color: red[700] }} onClick={() => navigate(-1)}>
        <ArrowBackIcon
          sx={{ width: "50px", height: "50px", color: red[700] }}
        ></ArrowBackIcon>
      </Button>
      <br></br>

      <Button size="small">
        <Popup
          trigger={
            <ShareIcon sx={{ color: red[700], width: "50px", height: "50px" }}>
              {" "}
            </ShareIcon>
          }
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

              <Input type="text" name="name" placeholder="From (your name)" />
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
              <br />
              <br></br>
              <label>Link:</label>
              <textarea
                style={{ border: "none", outline: "none", resize: "none" }}
                readOnly
                name="recipe_link"
                defaultValue={`https://tziporag.github.io/React-Final-Project/#/recipe/${props.recipeID}`}
              ></textarea>
            </form>
          </div>
        </Popup>
      </Button>
    </div>
  );
}

export const Recipe = () => {
  const recipeID = window.location.hash.split("/")[2];
  const [currRecipe, setCurrRecipe] = React.useState({});

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeID}/card?apiKey=f490623a08194292afaedba3e05a6dab`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrRecipe(data.url);
      });
  }, []);

  console.log(recipeID);
  console.log(currRecipe);

  return (
    <div>
      <RecipeHeader recipeID={recipeID}></RecipeHeader>
      <img
        className="recipe"
        src={currRecipe}
        style={{
          position: "absolute",
          margin: "auto",
          top: "100px",
          left: "0px",
          right: "0px",
        }}
      />
    </div>
  );
};
