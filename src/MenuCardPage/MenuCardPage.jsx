import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import ListProducts from '../components/ListProducts/ListProducts';
import ListMenus from '../components/ListMenus/ListMenus';
import ListDrinks from '../components/ListDrinks/ListDrinks';
import './MenuCardPage.scss';
import ListDishes from '../components/ListDishes/ListDishes';

function MenuCardPage() {
  const [entrees, setEntrees] = useState(0);
  const [dishes, setDishes] = useState(0);
  const [desserts, setDesserts] = useState(0);
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [drinks, setDrinks] = useState({});

  const { category } = useParams();

  const baseUrl = 'http://felixpicot1989-server.eddi.cloud/projet-o-resto-back/public';

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/categories`);
        const { data } = response;
        data.forEach((el) => {
          if (el.name === 'entrées') {
            setEntrees(el.id);
          }

          // if (el.name === 'plats') {
          //   setDishes(el.id);
          // }

          if (el.name === 'desserts') {
            setDesserts(el.id);
          }
        });
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchCategoryId();
  }, []);

  const fetchCategory = async (param) => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories/${param}`);
      const { data } = response;
      setProducts(data.eats);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  const fetchDrinks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/drinks`);
      const { data } = response;

      // Boucle pour créé un nouveau tableau qui trie les boissons en fonction de leur catégories
      // groupedDrinks est un objet vide et qui a chaque itération on lui rajoute un nouveau tableau s'il n'existe pas deja
      const drinksByCategory = data.reduce((groupedDrinks, currentDrink) => {
        // on fais une copie de groupedDrinks pour éviter de modifier directement l'objet original
        const updatedGroupedDrinks = { ...groupedDrinks };
        // si la categorie de la boisson en cours de traitement n'existe pas dans l'objet updatedGroupedDrinks avoir on en créé une propriété en tableau vide
        if (!updatedGroupedDrinks[currentDrink.category.name]) {
          updatedGroupedDrinks[currentDrink.category.name] = [];
        }
        // ici on ajoute la boisson en cours de traitement à son tableau correspondant dans l'objet updatedGroupedDrinks
        updatedGroupedDrinks[currentDrink.category.name].push(currentDrink);
        // et on renvoie la copie updatedGroupedDrinks pour l'utilisé comme groupedDrinks pour la prochaine itération.
        return updatedGroupedDrinks;
      }, {});
      // enfin on set drinks avec le nouvel objet
      setDrinks(drinksByCategory);
    } catch (error) {
      console.error('Erreur API', error);
    }
  };

  // Cette fonction prend le tableau des menus comme paramètre et renvoie un nouveau tableau de menus triés par catégorie
  const sortMenus = (data) => {
    // map pour créer un nouveau tableau de menus triés
    return data.map((menu) => {
      // Boucle pour créé un nouveau tableau qui trie les aliments en fonction de leur catégories
      // a l'intérieur de chaque menu, on reduce pour grouper les aliments du menu par catégorie (entrées, plats, desserts) en créant un nouvel objet eatsByCategory.
      const eatsByCategory = menu.eats.reduce((groupedEats, eat) => {
        // copie de l'objet groupedEats pour éviter de modifier directement l'objet original
        const updatedGroupedEats = { ...groupedEats };
        // Boucle sur toutes les catégories pour chaque aliment
        eat.category.forEach((cat) => {
          // Si la catégorie n'existe pas dans l'objet "updatedGroupedEats", on la crée avec un tableau vide
          if (!updatedGroupedEats[cat.name]) {
            updatedGroupedEats[cat.name] = [];
          }
          // On ajoute l'aliment sous forme d'objet à la catégorie correspondante
          updatedGroupedEats[cat.name].push({
            eatId: eat.id,
            eatName: eat.name,
          });
        });
        // On renvoie l'objet updatedGroupedEats mis à jour et on recommence pour toutes les entrées de menu.eats
        return updatedGroupedEats;
      }, {});
      // On renvoie un objet qui contient le nom du menu, son Id et les aliments triés par catégorie
      return {
        menuName: menu.name,
        menuId: menu.id,
        menuPrice: menu.price,
        eatsByCategory,
      };
    });
  };

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/menus`);
      const sortedMenus = sortMenus(response.data);
      setMenus(sortedMenus);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  const sortDishes = (data) => {};

  const fetchEats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/eats`);
      console.log(response.data);
      const sortedDishes = sortDishes(response.data);
      setDishes(sortedDishes);
      console.log(dishes);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };
  useEffect(() => {
    if (category === 'entrées' && entrees !== 0) {
      fetchCategory(entrees);
    } else if (category === 'plats' && dishes !== 0) {
      fetchEats();
    } else if (category === 'desserts' && desserts !== 0) {
      fetchCategory(desserts);
    } else if (category === 'boissons') {
      fetchDrinks();
    } else if (category === 'menus') {
      fetchMenus();
    }
  }, [category, entrees, dishes, desserts]);

  return (
    <div className="MenuCardPage">
      <CarouselBgImages title="La carte" />
      <section className="MenuCard">
        <div className="categories">
          <div className="menu-btn">
            <NavLink to="/carte/menus">Menus</NavLink>
          </div>
          <div className="others-btn">
            <NavLink to="/carte/entrées">Entrées</NavLink>
            <NavLink to="/carte/plats">Plats</NavLink>
            <NavLink to="/carte/desserts">Desserts</NavLink>
            <NavLink to="/carte/boissons">Boissons</NavLink>
          </div>
        </div>
        {category !== 'menus' && category !== 'boissons' && category !== 'plats' && (
          <ListProducts products={products} />
        )}
        {category === 'plats' && <ListDishes dishes={dishes} />}
        {category === 'menus' && <ListMenus menus={menus} />}
        {category === 'boissons' && <ListDrinks drinks={drinks} />}
      </section>
    </div>
  );
}

export default MenuCardPage;
