// Import the React component and the "useState" and "useEffect" hooks from the 'react' library
// useState is a hook used to create a state variable in a functional component
// useEffect is a hook for executing code when a component is mounted, updated or dismounted
import React, { useState, useEffect } from 'react';

// Import the "NavLink" component and the "useParams" hook from the 'react-router-dom' library
// NavLink is a component that will render a link, allowing the user to navigate between the various pages of the application
// useParams is a hook that returns an object containing the URL parameters
import { NavLink, useParams } from 'react-router-dom';

// Imports the "axios" module for HTTP requests
import axios from 'axios';

// Imports multiple components.
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import ListProducts from '../components/ListProducts/ListProducts';
import ListMenus from '../components/ListMenus/ListMenus';
import ListDrinks from '../components/ListDrinks/ListDrinks';
import ListDishes from '../components/ListDishes/ListDishes';

// Import style
import './MenuCardPage.scss';

function MenuCardPage() {
  // several states are initialized with empty arrays using React's useState hook
  // entries, dishes, desserts, menus are empty arrays that will be filled later with data obtained from the API
  // drinks is an empty object that will be filled with arrays of drinks grouped by category
  const [entries, setEntrees] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [drinks, setDrinks] = useState({});

  // We use react-router-dom's useParams hook to obtain the value of the "category" parameter in the URL obtained by destructuring.
  // This is how we planned the route in App.jsx, so the url parameter is an object with the category property
  const { category } = useParams();

  // We define the base URL for API requests
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // fetchEntries is an asynchronous function that sends a GET request to the API to obtain input data
  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories/1`);
      const { data } = response;
      // on set les Entrées
      setEntrees(data.eats);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  // fetchDesserts is an asynchronous function that sends a GET request to the API to obtain dessert data.
  const fetchDesserts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories/3`);
      const { data } = response;
      // we set the Desserts
      setDesserts(data.eats);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  // fetchDrinks is an asynchronous function that sends a GET request to the API to obtain the beverage data
  // Drinks are then grouped by category using the reduce method
  const fetchDrinks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/drinks`);
      const { data } = response;
      // Loop to create a new array that sorts drinks by category
      // groupedDrinks is an empty object, and at each iteration a new array is added if it doesn't already exist.
      const drinksByCategory = data.reduce((groupedDrinks, currentDrink) => {
        // make a copy of groupedDrinks to avoid directly modifying the original object
        const updatedGroupedDrinks = { ...groupedDrinks };
        // if the category of the drink being processed does not exist in the updatedGroupedDrinks object, we create an empty array property for it
        if (!updatedGroupedDrinks[currentDrink.category.name]) {
          updatedGroupedDrinks[currentDrink.category.name] = [];
        }
        // here we add the drink currently being processed to its corresponding array in the updatedGroupedDrinks object
        updatedGroupedDrinks[currentDrink.category.name].push(currentDrink);
        // and return the updatedGroupedDrinks copy for use as groupedDrinks for the next iteration.
        return updatedGroupedDrinks;
      }, {});
      // set drinks with the new object
      setDrinks(drinksByCategory);
    } catch (error) {
      console.error('Erreur API', error);
    }
  };

  // sortMenus is a function that takes an array of menus as an argument and returns an array of menus
  // where each menu has its dishes classified by category (starters, main courses, desserts).
  const sortMenus = (data) => {
    // map to create a new table of sorted menus
    return data.map((menu) => {
      // For each menu, we use reduce to create a new object (eatsByCategory)
      // where dishes are grouped by category
      const eatsByCategory = menu.eats.reduce((groupedEats, eat) => {
        // copy the groupedEats object to avoid directly modifying the original object
        const updatedGroupedEats = { ...groupedEats };
        // Loop over all categories for each food
        eat.category.forEach((cat) => {
          if (cat.name === 'Entrées' || cat.name === 'Plats' || cat.name === 'Desserts') {
            // If the category doesn't exist in the "updatedGroupedEats" object, we create it with an empty array with the value "starters", "main courses" or "desserts".
            if (!updatedGroupedEats[cat.name]) {
              updatedGroupedEats[cat.name] = [];
            }
            // Add the food as an object to the corresponding category in updatedGroupedEats
            updatedGroupedEats[cat.name].push({
              eatId: eat.id,
              eatName: eat.name,
            });
          }
        });
        // Return the updatedGroupedEats object and start again, using it as the value of groupedEats for the next iteration.
        return updatedGroupedEats;
      }, {});
      // We return an object containing the name of the menu, its Id and the food items sorted by category.
      return {
        menuName: menu.name,
        menuId: menu.id,
        menuPrice: menu.price,
        eatsByCategory: {
          // eatsByCategory is given a format so that it can be displayed in the order starters -> main courses -> desserts
          Entrées: eatsByCategory.Entrées || [],
          Plats: eatsByCategory.Plats || [],
          Desserts: eatsByCategory.Desserts || [],
        },
      };
    });
  };

  // fetchMenus is an asynchronous function that sends a GET request to the API to obtain menu data
  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/menus`);
      // Menus are sorted by category using the "sortMenus" function
      const sortedMenus = sortMenus(response.data);
      // Set menu status with sorted menus
      setMenus(sortedMenus);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  // sortDishes is a function that takes an array of dishes (data) as an argument and returns an array of objects,
  // where each object represents a category that contains an array of dishes belonging to that category.
  const sortDishes = (data) => {
    // filter() on data to obtain only dishes with the category "dishes". These dishes are stored in a new variable called "plates".
    const plates = data.filter((dish) => dish.category.some((cat) => cat.name === 'Plats'));

    // we use reduce() to create an array of unique categories, which are not "Dishes",
    // Each category in this array contains an array of dishes associated with it.
    const otherCategoriesWithDishes = plates.reduce((groupedDishes, currentDish) => {
      // loop over each dish in plates, then over each category in that dish.
      currentDish.category.forEach((cat) => {
        // here we ignore the "dishes" category
        if (cat.name !== 'Plats') {
          // find() to check if the category already exists in groupedDishes
          let existingCategory = groupedDishes.find((item) => item.id === cat.id);

          // If the category is not yet present, create a new object with the name of the new category and add an empty array ("dishes") containing the dishes corresponding to this new category.
          if (!existingCategory) {
            // existingCategory takes all the properties of "cat" but adds a new property called "dishes" (the empty array)
            existingCategory = { ...cat, dishes: [] };
            // existingCategory object is added to groupedDishes
            groupedDishes.push(existingCategory);
          }
          // We add the current dish (currentDish) to the existingCategory object in its "dishes" array.
          existingCategory.dishes.push(currentDish);
        }
      });
      return groupedDishes;
    }, []);
    // and return otherCategoriesWithDishes when the loop is complete
    return otherCategoriesWithDishes;
  };

  // fetchDishes is an asynchronous function that sends a GET request to the API to obtain data on dishes
  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/eats`);
      // Dishes are sorted by category using the sortDishes function
      const sortedDishes = sortDishes(response.data);
      // We set the state of the dishes with the sorted dishes
      setDishes(sortedDishes);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  // We use useEffect to execute certain functions (fetchEntries, fetchDishes, fetchDesserts, fetchMenus, fetchDrinks), allowing us to set all our states.
  // The empty array in the second argument means that useEffect has no dependencies, so these functions will only be executed once after the first rendering.
  useEffect(() => {
    fetchEntries();
    fetchDishes();
    fetchDesserts();
    fetchMenus();
    fetchDrinks();
  }, []);

  return (
    <div className="MenuCardPage">
      {/* we also display CarouselBgImages on this page and pass it a "title" prop to display the title of the page we're on */}
      <CarouselBgImages title="La carte" />
      <section className="MenuCard">
        <div className="categories">
          <div className="menu-btn">
            <NavLink to="/carte/menus">Menus</NavLink>
          </div>
          <div className="others-btn">
            <NavLink to="/carte/entrees">Entrées</NavLink>
            <NavLink to="/carte/plats">Plats</NavLink>
            <NavLink to="/carte/desserts">Desserts</NavLink>
            <NavLink to="/carte/boissons">Boissons</NavLink>
          </div>
        </div>
        {/* the category === "..." condition is used to request the right components to be rendered according to the url.
            We pass in props the states we need for each component.
            We also pass in "baseUrl" props for ListProducts and ListDishes, as these components need to display images, so we need to have the right path.
            */}
        {category === 'menus' && <ListMenus menus={menus} />}
        {category === 'entrees' && <ListProducts products={entries} baseUrl={baseUrl} />}
        {category === 'plats' && <ListDishes dishes={dishes} baseUrl={baseUrl} />}
        {category === 'desserts' && <ListProducts products={desserts} baseUrl={baseUrl} />}
        {category === 'boissons' && <ListDrinks drinks={drinks} />}
      </section>
    </div>
  );
}

export default MenuCardPage;
