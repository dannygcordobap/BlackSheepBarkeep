import React from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinkIcon from "@mui/icons-material/Link";
import Button from "@mui/material/Button";

function Home() {
  const cardStyleProps = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader title="Welcome to Black Sheep Barkeep!" />
          <CardContent>
            <Typography gutterBottom>
              Feel free to browse recipes to find something you like! You can
              search by name, category, or ingredients. When searching by
              ingredients, tick the exclusive search box to find recipes that
              only use the ingredients you selected.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} display={"flex"}>
        <Card variant="outlined" sx={cardStyleProps}>
          <CardHeader title="Create an Account" />
          <CardContent>
            <Typography gutterBottom>
              This feature is currently under development, check back soon!
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" disabled>
              Coming Soon!
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={6} display={"flex"}>
        <Card variant="outlined" sx={cardStyleProps}>
          <CardHeader title="Browse Recipes" />
          <CardContent>
            <Typography gutterBottom>
              Browse recipes with the ability to search by name, category, or
              ingredients.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" href="/drinks" startIcon={<LinkIcon />}>
              View Recipes
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Home;
