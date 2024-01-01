import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DrinkDataService from "../services/drink.js";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, IconButton, MenuItem, OutlinedInput, Select, Tab, Tabs, TextField } from "@mui/material";

function DrinkList() {
  const [drinks, setDrinks] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [searchExclusivity, setSearchExclusivity] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState(["All Categories"]);
  const [currentPage, setPage] = useState(0);
  const [searchType, setSearchType] = useState("name");

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const onChangeSearchIngredients = (selectedOptions) => {
    let options = [];
    for (const option of selectedOptions) {
      options.push(option.value);
    }
    console.log(options);
    setSearchIngredients(options);
  };

  const onChangeSearchExclusivity = (e) => {
    const searchExclusivity = e.target.checked;
    setSearchExclusivity(searchExclusivity);
  };

  const retrieveDrinks = (page = 0) => {
    DrinkDataService.getAll(page)
      .then((response) => {
        console.log(response.data);
        setDrinks(response.data.recipes);
        setPage(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveIngredients = () => {
    DrinkDataService.getIngredients()
      .then((response) => {
        console.log(response.data);
        let options = [];
        for (const ingredient of response.data) {
          options.push({
            value: ingredient,
            label: ingredient,
          });
        }
        setIngredients(options);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCategories = () => {
    DrinkDataService.getCategories()
      .then((response) => {
        console.log(response.data);
        setCategories(["All Categories"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveNextPage = () => {
    let nextPage = currentPage + 1;
    if (searchType) {
      let query;
      if (searchType === "name") {
        query = searchName;
      } else if (searchType === "category") {
        query = searchCategory;
      } else if (searchType === "ingredients") {
        query = searchIngredients;
      }
      find(query, searchType, searchExclusivity, nextPage);
    } else {
      retrieveDrinks(nextPage);
    }
  };

  const retrievePreviousPage = () => {
    let previousPage = currentPage - 1;
    if (searchType) {
      let query;
      if (searchType === "name") {
        query = searchName;
      } else if (searchType === "category") {
        query = searchCategory;
      } else if (searchType === "ingredients") {
        query = searchIngredients;
      }
      find(query, searchType, searchExclusivity, previousPage);
    } else {
      retrieveDrinks(previousPage);
    }
  };

  const refresh = () => {
    retrieveDrinks();
  };

  const find = (query, by, exclusive = false, page = 0) => {
    console.log(searchType)
    console.log(typeof query)
    DrinkDataService.find(query, by, exclusive, page).then((response) => {
      console.log(response.data);
      setDrinks(response.data.recipes);
      setPage(response.data.page);
    });
  };

  const findByName = (e) => {
    find(searchName, "name");
    setSearchType("name");
  };

  const findByCategory = () => {
    if (searchCategory === "All Categories") {
      refresh();
    } else {
      find(searchCategory, "category");
      setSearchType("category");
    }
  };

  const findByIngredients = () => {
    find(searchIngredients.join(","), "ingredients", searchExclusivity);
    setSearchType("ingredients");
  };
  
  const getQuery = () => {
    if (searchType === 'name') {
      return searchName;
    } else if (searchType === 'category') {
      return searchCategory;
    } else if (searchType === 'ingredients') {
      return searchIngredients.join(', ');
    }
  }

  const searchOptions = () => {
    let searchTypes = ["name", "category", "ingredients"]
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs>
              {searchTypes.map((st) => (<Tab label={`Search by ${st}`} onClick={() => setSearchType(st)}/>))}
            </Tabs>
          </Grid>
          <Grid item xs={12} hidden={searchType != 'name'}>
            <TextField fullWidth label="Recipe name" onChange={onChangeSearchName}/>
          </Grid>
          <Grid item xs={12} hidden={searchType != 'category'}>
            <Select 
              value={searchCategory}
              sx={{width: '100%'}} 
              onChange={onChangeSearchCategory} 
              input={<OutlinedInput label="Categories" />}
              label="Categories"
            >
              {categories.map((category) => (
                <MenuItem 
                  value={category} 
                  key={category}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} display='flex'>
            <Box sx={{width: '100%'}}>
              <Button sx={{float: 'right'}} variant="contained" startIcon={<SearchIcon />} onClick={() => {find(getQuery(), searchType)}}>
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      <div className="App">
        <div className="card">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="name-tab"
                data-bs-toggle="tab"
                data-bs-target="#name"
                type="button"
                role="tab"
                aria-controls="name"
                aria-selected="true"
              >
                Search by Name
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link "
                id="category-tab"
                data-bs-toggle="tab"
                data-bs-target="#category"
                type="button"
                role="tab"
                aria-controls="category"
                aria-selected="false"
              >
                Search by Category
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="ingredients-tab"
                data-bs-toggle="tab"
                data-bs-target="#ingredients"
                type="button"
                role="tab"
                aria-controls="ingredients"
                aria-selected="false"
              >
                Search by Ingredients
              </button>
            </li>
          </ul>
          <div class="tab-content card-body" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="name"
              role="tabpanel"
              aria-labelledby="name-tab"
            >
              <div className="input-group col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name!"
                  value={searchName}
                  onChange={onChangeSearchName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="category"
              role="tabpanel"
              aria-labelledby="category-tab"
            >
              <div className="input-group col-lg-4">
                <select
                  value={searchCategory}
                  onChange={onChangeSearchCategory}
                >
                  {categories.map((category) => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByCategory}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="ingredients"
              role="tabpanel"
              aria-labelledby="ingredients-tab"
            >
              <div className="col">
                <div className="row">
                  <div class="">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="exclusiveSearch"
                      onChange={onChangeSearchExclusivity}
                    />
                    <label class="form-check-label" for="exclusiveSearch">
                      Exclusive Search
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Select
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={ingredients}
                      onChange={onChangeSearchIngredients}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={findByIngredients}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
    )
  }

  const resultGrid = (drinks) => {
    return (
      <Grid container spacing={3}>
        {drinks.map((drink) => {
          return (
            <Grid item xs={4} lg={4} display="flex">
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <CardMedia component="img" image={drink.ImageLink} />
                <CardHeader title={drink.Name} />
                <CardContent>
                  <Typography>Category: {drink.Category}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button>Ingredients</Button>
                  <Button href={`/drinks/${drink._id}`}>Recipe</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  useEffect(() => {
    retrieveDrinks();
    retrieveIngredients();
    retrieveCategories();
  }, []);

  return (
    <>
      {searchOptions()}
        <br />
        <hr />
        <br />
        {resultGrid(drinks)}
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              {currentPage > 0 ? (
                <li class="page-item">
                  <div class="page-link" onClick={retrievePreviousPage}>
                    Previous
                  </div>
                </li>
              ) : (
                <li className="page-item disabled">
                  <div class="page-link">Previous</div>
                </li>
              )}
            </li>
            <li class="page-item">
              <div class="page-link" onClick={retrieveNextPage}>
                Next
              </div>
            </li>
          </ul>
        </nav>
    </>
  );
}

export default DrinkList;
