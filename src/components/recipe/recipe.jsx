import React, { useContext, useEffect, useHistory, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../app/context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import emailjs from "@emailjs/browser";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

function RecipeHeader(props) {
  //const listContext = useContext(FavoritesContext);
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
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>
              <Button sx={{ color: "black" }}>
                <Link to={`/`}>
                  <ArrowBackIcon></ArrowBackIcon>
                  <span>Back to all recipes</span>
                </Link>
              </Button>
            </td>
            <td style={{ textAlign: "left" }}>
              <Button size="small">
                <Popup
                  trigger={
                    <ShareIcon sx={{ width: "50px", height: "50px" }}>
                      {" "}
                    </ShareIcon>
                  }
                  position="right center"
                  closeOnDocumentClick
                >
                  <div>
                    <form ref={form} onSubmit={() => sendEmail()}>
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
                        defaultValue={`http://localhost:3000/#/recipe/${props.currRecipe.id}`}
                      ></textarea>
                    </form>
                  </div>
                </Popup>
              </Button>
            </td>
            <td></td>
            {/*<td>
            <Button>
              <FavoriteBorderIcon
                onClick={(props) => {
                  return listContext.listDispatch({
                    type: "add",
                    index: props.currRecipe.index,
                    title: props.currRecipe.title,
                    id: props.currRecipe.id,
                    image: props.currRecipe.image,
                  });
                }}
              ></FavoriteBorderIcon>
              </Button>
              </td>*/}
          </tr>
        </tbody>
      </table>
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
      <RecipeHeader currRecipe={currRecipe}></RecipeHeader>
      <img
        className="recipe"
        src={currRecipe}
        style={{
          position: "absolute",
          margin: "auto",
          top: "130px",
          left: "0px",
          right: "0px",
        }}
      />
    </div>
  );
};
