import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

export default function RecipeTile(props) {
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
            <FavoriteIcon></FavoriteIcon>
          </Button>
          <Button size="small">
            <ShareIcon></ShareIcon>
          </Button>
        </CardActions>
        <Link to="/recipe/${props.id}">
          <CardContent style={{ height: "calc(15vh - 15px)" }}>
            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
