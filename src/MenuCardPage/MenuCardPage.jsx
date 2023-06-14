import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CarouselBgImages from '../components/CarouselBgImages/CarouselBgImages';
import ListProducts from '../components/ListProducts/ListProducts';
import './MenuCardPage.scss';

function MenuCardPage() {
  const [category, setCategory] = useState('entrees');

  const products = {
    entrees: [
      { id: 1, name: 'Salade verte', description: 'Mélange de légumes frais', price: 8.99 },
      { id: 2, name: "Escargots à l'ail", description: "Escargots cuits dans une sauce à l'ail", price: 12.99 },
      // Autres entrées...
    ],
    plats: [
      { id: 1, name: 'Steak de bœuf', description: 'Steak tendre accompagné de légumes sautés', price: 24.99 },
      {
        id: 2,
        name: 'Pâtes carbonara',
        description: 'Pâtes servies avec une sauce crémeuse à la pancetta',
        price: 18.99,
      },
      // Autres plats...
    ],
    desserts: [
      { id: 1, name: 'Crème brûlée', description: 'Crème onctueuse avec une fine croûte caramélisée', price: 9.99 },
      {
        id: 2,
        name: 'Tarte aux pommes',
        description: 'Tarte aux pommes maison avec une pâte croustillante',
        price: 7.99,
      },
      // Autres desserts...
    ],
    boissons: [
      { id: 1, name: 'Vin rouge', description: 'Bouteille de vin rouge de la région', price: 29.99 },
      { id: 2, name: 'Coca-Cola', description: 'Boisson gazeuse rafraîchissante', price: 2.99 },
      // Autres boissons...
    ],
    menu: {
      entrees: [
        {
          id: 1,
          nom: "Salade d'été avec tomates cerises et vinaigrette basilic-balsamique",
        },
        {
          id: 2,
          nom: "Carpaccio de boeuf aux lamelles de parmesan, salade roquette et huile d'olive",
        },
      ],
      plats: [
        {
          id: 1,
          nom: "Filet mignon au poivre, accompagné de frites de patates douces et d'une brochette de légumes grillés",
        },
        {
          id: 2,
          nom: 'Cabillaud en croûte de sésame accompagné de riz pilaf et de carottes glacées',
        },
      ],
      desserts: [
        {
          id: 1,
          nom: 'Tarte au citron meringuée',
        },
        {
          id: 2,
          nom: "Fondant au chocolat accompagné d'une boule de glace vanille",
        },
      ],
    },
  };
  return (
    <div className="MenuCardPage">
      <CarouselBgImages title="La carte" />
      <section className="MenuCard">
        <div className="categories">
          <div className="menu-btn">
            <NavLink onClick={() => setCategory('menu')}>Menus</NavLink>
          </div>
          <div className="others-btn">
            <NavLink onClick={() => setCategory('entrees')}>Entrées</NavLink>
            <NavLink onClick={() => setCategory('plats')}>Plats</NavLink>
            <NavLink onClick={() => setCategory('desserts')}>Desserts</NavLink>
            <NavLink onClick={() => setCategory('boissons')}>Boissons</NavLink>
          </div>
        </div>
        <ListProducts products={products[category]} />
      </section>
    </div>
  );
}

export default MenuCardPage;
