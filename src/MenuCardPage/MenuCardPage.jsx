import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import ListProducts from '../components/ListProducts/ListProducts';
import ListMenus from '../components/ListMenus/ListMenus';
import ListDrinks from '../components/ListDrinks/ListDrinks';
import './MenuCardPage.scss';

function MenuCardPage() {
  const [entrees, setEntrees] = useState(0);
  const [plats, setPlats] = useState(0);
  const [desserts, setDesserts] = useState(0);
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [drinks, setDrinks] = useState({});

  const { category } = useParams();

  const baseUrl = 'http://felixpicot1989-server.eddi.cloud/projet-o-resto-back/public';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODY4MTg5NDQsImV4cCI6MTY4Njg4Mzc0NCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.oRCbsBBG_9s1xlEbf_qlqaZao02AX-uVLsOa25iv8DQYZ_Jwdh7zJWB4cJ9Akker68i5jWmjAaUQIEWPWLuKQWpdIOl1z_gQO5XNi-Btx67yCTj1ikQtTW26CC_MjGZmtDkTkR-N9xMHWLxgsEE5Pq9ONhksGlqb3a-5x0P_p5VxSgQ0YigP14ewmhxBgC9Sfc1ZfZTdlrPDmqKJIv9NKEAlp_nMSrujrvFKOM3wTleVLf2XY8UESU_h7NTeS7OaNba6O2NvimwMr64-L4Rh7g64CR6j9KCRK5BRIpIrkZ6sNWiG6T2V56dDbWrbEzCPRCKxBDvDDNiiwG5mnyN7zA';

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/categories`);
        const { data } = response;
        data.map((el) => {
          if (el.name === 'entrées') {
            setEntrees(el.id);
          }

          if (el.name === 'plats') {
            setPlats(el.id);
          }

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

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/menus`);
      const { data } = response;
      setMenus(data);
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  useEffect(() => {
    if (category === 'entrées' && entrees !== 0) {
      fetchCategory(entrees);
    } else if (category === 'plats' && plats !== 0) {
      fetchCategory(plats);
    } else if (category === 'desserts' && desserts !== 0) {
      fetchCategory(desserts);
    } else if (category === 'boissons') {
      fetchDrinks();
    } else if (category === 'menus') {
      fetchMenus();
    }
  }, [category, entrees, plats, desserts]);

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
        {category !== 'menus' && <ListProducts products={products} />}
        {category === 'menus' && <ListMenus menus={menus} />}
        {category === 'boissons' && <ListDrinks drinks={drinks} />}
      </section>
    </div>
  );
}

export default MenuCardPage;
