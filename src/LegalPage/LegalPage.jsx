import React from 'react';
import PropTypes from 'prop-types';

import './LegalPage.scss';

// Component with raw text, depending of the props it return either one or the other
function LegalPage({ type }) {
  if (type === 'mentions') {
    return (
      <div className="legal">
        <h1>Mentions légales</h1>
        <h2>Raison sociale :</h2>
        <p>O&apos;resto</p>
        <h2>Forme juridique :</h2>
        <p>Société à responsabilité limitée (SARL)</p>
        <h2>Adresse :</h2>
        <p>2 rue du marché, 50500, BREVANDS</p>
        <h2>Téléphone :</h2>
        <p>02.50.50.51.52</p>
        <h2>E-mail :</h2>
        <p>info@oresto.com</p>
      </div>
    );
  }
  if (type === 'politique') {
    return (
      <div className="legal">
        <h1>Politique de confidentialité d&apos;O&apos;resto</h1>

        <h2>Collecte d&apos;informations :</h2>
        <p>
          Lorsque vous visitez notre site Web, nous pouvons collecter certaines informations personnelles telles que
          votre nom, prénom et votre adresse e-mail. Ces informations sont collectées de manière volontaire lorsque vous
          les fournissez en remplissant un formulaire de contact, en passant une commande en ligne ou en vous inscrivant
          à notre newsletter.
        </p>

        <h2>Utilisation des informations :</h2>
        <p>
          Nous utilisons les informations collectées pour vous fournir les services demandés, tels que la réservation de
          tables, la commande de plats à emporter ou la livraison à domicile. Nous pouvons également utiliser vos
          informations pour vous envoyer des mises à jour sur nos offres spéciales, promotions et événements, si vous
          avez consenti à recevoir de telles communications.
        </p>

        <h2>Partage des informations :</h2>
        <p>
          Nous ne vendons, n&apos;échangeons ni ne louons vos informations personnelles à des tiers, sauf si nous
          obtenons votre consentement préalable ou si la loi l&apos;exige. Toutefois, nous pouvons partager vos
          informations avec des prestataires de services tiers qui nous aident à exploiter notre site Web et à fournir
          nos services, tels que des services de réservation en ligne ou de livraison de repas. Ces tiers sont tenus de
          respecter la confidentialité de vos informations.
        </p>

        <h2>Cookies et technologies similaires :</h2>
        <p>
          Nous utilisons des cookies et d&apos;autres technologies similaires pour améliorer votre expérience sur notre
          site Web. Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil lorsque vous visitez
          notre site. Ils nous permettent de reconnaître votre navigateur et de vous offrir une expérience
          personnalisée, ainsi que de collecter des informations sur la façon dont vous utilisez notre site. Vous pouvez
          configurer votre navigateur pour refuser les cookies, mais cela pourrait limiter certaines fonctionnalités de
          notre site.
        </p>

        <h2>Sécurité des données :</h2>
        <p>
          Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès
          non autorisé, utilisation abusive ou divulgation. Cependant, veuillez noter qu&apos;aucune méthode de
          transmission de données sur Internet ou de stockage électronique n&apos;est totalement sécurisée. Nous ne
          pouvons donc garantir la sécurité absolue de vos informations.
        </p>

        <h2>Vos droits :</h2>
        <p>
          Vous avez le droit d&apos;accéder aux informations personnelles que nous détenons à votre sujet, de les
          corriger, de les supprimer ou de limiter leur utilisation. Vous pouvez également vous désabonner de nos
          communications marketing à tout moment. Pour exercer ces droits, veuillez nous contacter via les coordonnées
          fournies ci-dessous.
        </p>

        <h2>Modifications de la politique de confidentialité :</h2>

        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera
          affichée sur cette page, avec la date de la dernière mise à jour. Veuillez vérifier régulièrement cette page
          pour rester informé des éventuelles modifications.
        </p>
      </div>
    );
  }
}

LegalPage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default LegalPage;
