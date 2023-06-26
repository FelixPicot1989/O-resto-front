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
  const [entries, setEntrees] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [drinks, setDrinks] = useState({});
  const { category } = useParams();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories/1`);
      const { data } = response;
      setEntrees(data.eats);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  const fetchDesserts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/categories/3`);
      const { data } = response;
      setDesserts(data.eats);
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
      // setDrinks(drinksByCategory);
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
          if (cat.name === 'Entrées' || cat.name === 'Plats' || cat.name === 'Desserts') {
            // Si la catégorie n'existe pas dans l'objet "updatedGroupedEats", on la crée avec un tableau vide avec soit la valeur "entrées" "plats" ou "desserts"
            if (!updatedGroupedEats[cat.name]) {
              updatedGroupedEats[cat.name] = [];
            }
            // On ajoute l'aliment sous forme d'objet à la catégorie correspondante
            updatedGroupedEats[cat.name].push({
              eatId: eat.id,
              eatName: eat.name,
            });
          }
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
  // cette fonction renvoie un tableau d'objets qui représentent les catégories (viandes, poissons, burgers ...) qui eu meme contienne elles meme un tableau d'objet contenant les plats affecter à cette categories
  // data est un tableau d'objets représentant tous les aliments.
  const sortDishes = (data) => {
    // filter() sur data pour obtenir seulement les plats qui ont la catégorie "plats". Ces plats sont stockés dans une nouvelle variable appelée plats.
    const plats = data.filter((dish) => dish.category.some((cat) => cat.name === 'Plats'));
    // reduce() sur plats pour obtenir tous les objets qui représentent les catégories autres que la categorie "plats".
    const otherCategoriesWithDishes = plats.reduce((groupedDishes, currentDish) => {
      // boucle sur chaque plat dans plats, puis sur chaque catégorie de ce plat.
      currentDish.category.forEach((cat) => {
        // ici on ignore la category "plats"
        if (cat.name !== 'Plats') {
          // find() pour vérifier si la catégorie existe déjà dans groupedDishes
          let existingCategory = groupedDishes.find((item) => item.id === cat.id);
          // Si la catégorie n'existe pas déjà, un nouvel objet est créé avec l'id de la catégorie trouvée, le nom et un tableau vide appelé dishes pour contenir les plats de cette catégorie.
          if (!existingCategory) {
            existingCategory = { ...cat, dishes: [] };
            // l'objet existingCategory est ajouté à groupedDishes
            groupedDishes.push(existingCategory);
          }
          // On ajoute le plat courant (currentDish) à l'objet existingCategory dans son tableau qui contient les plats
          existingCategory.dishes.push(currentDish);
        }
      });
      return groupedDishes;
    }, []);
    // et on retourne otherCategoriesWithDishes une fois la boucle terminé
    return otherCategoriesWithDishes;
  };

  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/eats`);
      const sortedDishes = sortDishes(response.data);
      setDishes(sortedDishes);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };
  // On set tous les states des le debut comme ca on a toute les infos a disposition et comme ca pas besoin de faire une requette à chaque changement "d'onglet" dans la carte
  useEffect(() => {
    fetchEntries();
    fetchDishes();
    fetchDesserts();
    fetchMenus();
    fetchDrinks();
  }, []);

  return (
    <div className="MenuCardPage">
      <CarouselBgImages title="La carte" />
      <section className="MenuCard">
        <div className="categories">
          <div className="menu-btn">
            <NavLink to="/carte/menus">Menus</NavLink>
          </div>
          <div className="others-btn">
            <NavLink to="/carte/entrees">Entrées</NavLink>
            <NavLink onClick={fetchDishes} to="/carte/plats">
              Plats
            </NavLink>
            <NavLink to="/carte/desserts">Desserts</NavLink>
            <NavLink to="/carte/boissons">Boissons</NavLink>
          </div>
        </div>
        {category === 'menus' && <ListMenus menus={menus} />}
        {category === 'entrees' && <ListProducts products={entries} />}
        {category === 'plats' && <ListDishes dishes={dishes} />}
        {category === 'desserts' && <ListProducts products={desserts} />}
        {category === 'boissons' && <ListDrinks drinks={drinks} />}
      </section>
    </div>
  );
}

export default MenuCardPage;
