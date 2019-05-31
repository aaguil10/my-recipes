import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CreateIcon from "@material-ui/icons/Create";
import CloudDownload from "@material-ui/icons/CloudDownload";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%"
  },
  cardHeader: {
    width: 400,
    paddingBottom: 0,
    marginBottom: 0
  },
  cardContent: {
    paddingTop: 0,
    marginTop: 0
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const RecipeCardDisplay = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const handleEditClick = () => {
    props.onClick(props.recipeData);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={props.recipeData.title} //recipe name
        subheader={props.recipeData.shortNote} //Short Note
      />
      <CardContent>
        {props.recipeData.ingredients.map(ingredient => (
          <Typography variant="body2" component="p">
            {ingredient}
          </Typography>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Edit Recipe">
          <CreateIcon onClick={handleEditClick} />
        </IconButton>
        <IconButton aria-label="Edit Recipe">
          <CloudDownload />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Steps:</Typography>
          {props.recipeData.steps.map(step => (
            <Typography paragraph>{step}</Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCardDisplay;
