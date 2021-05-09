-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 09 mars 2021 à 08:18
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `afpanier_v3`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id_article` int(11) NOT NULL,
  `id_center` int(11) DEFAULT NULL,
  `article_title` varchar(255) NOT NULL,
  `article_subtitle` varchar(255) NOT NULL,
  `article_content` mediumtext NOT NULL,
  `article_url_img` varchar(255) NOT NULL,
  `article_date` date NOT NULL,
  `article_author` varchar(255) NOT NULL,
  `article_status` tinyint(1) DEFAULT '1',
  `article_time` time DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id_article`, `id_center`, `article_title`, `article_subtitle`, `article_content`, `article_url_img`, `article_date`, `article_author`, `article_status`, `article_time`) VALUES
(1, 1, 'Les totos, les tomates', 'Venez voir nos belles tomates', 'Ici notre contenu', 'article_1.png', '2020-12-01', 'Pagan Jean-Jacques', 1, '15:31:00'),
(2, 1, 'Les Papas, les 100 patates', 'The Super Patates selon Mr Patates', 'Ici notre contenu', 'article_2.png', '2020-12-02', 'Pagan Jean-Jacques', 1, '11:52:56'),
(3, 1, 'Les Coucous, les courgettes', 'C\'est lhistoire d\'une courgette qui court et qui se jette.', 'Ici notre contenu', 'article_3.png', '2020-12-03', 'Pagan Jean-Jacques', 1, '23:22:10'),
(4, 1, 'Les babas, les bananes', 'La taille de la banane ne fait pas la force du gorille !', 'Ici notre contenu', 'article_4.png', '2020-12-04', 'Pagan Jean-Jacques', 1, '05:10:00');

-- --------------------------------------------------------

--
-- Structure de la table `basket`
--
DROP TABLE IF EXISTS `basket`;
CREATE TABLE `basket` (
  `id_basket` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL,
  `id_mainBasket` int(11) NOT NULL,
  `basket_name` varchar(255) NOT NULL,
  `basket_image` varchar(255) NOT NULL,
  `basket_description` text NOT NULL,
  `basket_reference` varchar(15) DEFAULT NULL,
  `basket_number` int(3) NOT NULL,
  `basket_quantity` int(3) NOT NULL,
  `basket_price` decimal(5,2) NOT NULL,
  `basket_begin_date` datetime NOT NULL,
  `basket_end_date` datetime NOT NULL,
  `basket_begin_validation_date` datetime DEFAULT NULL,
  `basket_end_validation_date` datetime DEFAULT NULL,
  `basket_payment_begin_date` datetime NOT NULL,
  `basket_payment_end_date` datetime NOT NULL,
  `basket_withdrawal_begin_date` datetime NOT NULL,
  `basket_withdrawal_end_date` datetime NOT NULL,
  `basket_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket`
--

INSERT INTO `basket` (`id_basket`, `id_supplier`, `id_mainBasket`, `basket_name`, `basket_image`, `basket_description`, `basket_reference`, `basket_number`, `basket_quantity`, `basket_price`, `basket_begin_date`, `basket_end_date`, `basket_begin_validation_date`, `basket_end_validation_date`, `basket_payment_begin_date`, `basket_payment_end_date`, `basket_withdrawal_begin_date`, `basket_withdrawal_end_date`, `basket_status`) VALUES
(1, 5, 4, 'Mon beau panier', 'panier.png', 'assortiment de fruits et légumes d&#039__POINTVIRGULE__hiver.', 'BASK_WIN_584690', 30, 30, '11.50', '2020-12-15 08:00:00', '2020-12-20 17:00:00', NULL, NULL, '2020-12-17 08:00:00', '2020-12-22 17:00:00', '2020-12-21 08:00:00', '2020-12-24 17:00:00', 1),
(2, 5, 4, 'Panier de fruits', 'basket_03_03_42_1.png', 'Toute une selection de fruits de saison pour vous', 'BASK_WIN_458470', 17, 20, '19.99', '2020-12-28 08:00:00', '2021-01-04 17:00:00', NULL, NULL, '2021-01-01 08:00:00', '2021-01-03 17:00:00', '2021-01-03 08:00:00', '2021-01-06 17:00:00', 0),
(3, 2, 1, 'Panier de Legumes', 'vin.png', 'Toute une selection de légumes de saison pour vous', 'BASK_SPR_842540', 12, 20, '13.50', '2021-03-17 08:00:00', '2021-03-22 17:00:00', '2021-02-23 08:00:00', '2021-02-26 16:00:00', '2021-03-21 08:00:00', '2021-03-23 17:00:00', '2021-03-23 08:00:00', '2021-03-25 17:00:00', 1),
(4, 2, 1, 'Panier gourmand', 'noel.jpg', 'panier gourmand à partager…ou pas ', 'BASK_SPR_325890', 0, 20, '12.99', '2021-03-21 08:00:00', '2021-03-27 17:00:00', '2021-02-23 09:00:00', '2021-02-25 17:00:00', '2021-03-26 08:00:00', '2021-03-28 17:00:00', '2021-03-27 08:00:00', '2020-03-29 17:00:00', 1),
(5, 6, 5, 'Panier leger', 'panier-garni-brise-gourmande.jpg', 'Petit panier pour les petits gourmands fan de terrines', 'BASK_PAQUES_84', 48, 50, '10.50', '2021-02-09 09:00:00', '2021-02-14 16:00:00', '2021-02-23 15:00:00', '2021-02-25 15:00:00', '2021-02-15 09:00:00', '2021-02-17 17:00:00', '2021-02-19 12:00:00', '2021-02-19 17:00:00', 1),
(6, 5, 6, 'Panier 3 Kg', 'basket_04_03_17_46_5.jpeg', 'Panier 3kg', 'WJSD_EYED', 23, 25, '17.99', '2021-02-25 16:35:00', '2021-02-26 16:35:00', '2021-02-27 16:35:00', '2021-02-28 16:35:00', '2021-03-01 16:35:00', '2021-03-02 16:35:00', '2021-03-03 16:35:00', '2021-03-04 16:35:00', 1),
(7, 5, 6, 'Panier 6 Kg', 'basket_25_02_36_1.png', 'Panier 6 kg', 'TRT7_SIHH', 34, 35, '25.99', '2021-02-25 16:35:00', '2021-02-26 16:35:00', '2021-02-27 16:35:00', '2021-02-28 16:35:00', '2021-03-01 16:35:00', '2021-03-02 16:35:00', '2021-03-03 16:35:00', '2021-03-04 16:35:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `basket__product`
--

CREATE TABLE `basket__product` (
  `id_basket` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_measureUnit` int(11) DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket__product`
--

INSERT INTO `basket__product` (`id_basket`, `id_product`, `id_measureUnit`, `product_quantity`) VALUES
(1, 1, 2, 2),
(1, 3, 4, 5),
(1, 5, 4, 10),
(2, 4, 2, 2),
(2, 5, 1, 500),
(4, 3, 4, 3),
(4, 6, 4, 2),
(5, 7, 5, 75),
(5, 8, 1, 200),
(5, 9, 1, 250),
(3, 4, 2, 2),
(3, 3, 4, 3),
(3, 7, NULL, NULL),
(6, 20, NULL, NULL),
(6, 22, 4, 4),
(7, 20, NULL, NULL),
(7, 22, 4, 4),
(7, 12, 4, 4),
(7, 5, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `basket__promo`
--

CREATE TABLE `basket__promo` (
  `id_basket` int(11) NOT NULL,
  `id_promo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket__promo`
--

INSERT INTO `basket__promo` (`id_basket`, `id_promo`) VALUES
(4, 1),
(4, NULL),
(1, 2),
(7, 2);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `category_status`) VALUES
(1, 'Fruit', 1),
(2, 'Légume', 1),
(3, 'Poisson', 1),
(4, 'Viande', 1),
(5, 'Fromage', 1),
(6, 'Boisson', 1),
(7, 'Produit du terroir', 1),
(9, 'Chocolat', 1),
(10, 'Dessert', 1),
(15, 'Apéritif', 1),
(17, 'Digestif', 1);

-- --------------------------------------------------------

--
-- Structure de la table `center`
--

DROP TABLE IF EXISTS `center`;
CREATE TABLE IF NOT EXISTS `center` (
  `id_center` int(11) NOT NULL,
  `center_name` varchar(255) NOT NULL,
  `center_phoneNumber` varchar(20) NOT NULL,
  `center_address` varchar(255) NOT NULL,
  `center_complement_address` varchar(255) DEFAULT NULL,
  `center_zipCode` varchar(5) NOT NULL,
  `center_city` varchar(255) NOT NULL,
  `center_schedule` text NOT NULL,
  `center_contact_mail` varchar(255) NOT NULL,
  `center_contact_form_message` text NOT NULL,
  `center_validate_schedule` text NOT NULL,
  `center_validate_schedule_below` text NOT NULL,
  `withdrawall_date_available` text NOT NULL,
  `order_date_topay` text NOT NULL,
  `center_place_topay` text NOT NULL,
  `center_withdrawall_place` text NOT NULL,
  `center_withdrawall_schedule` text NOT NULL,
  `center_urlGoogleMap` varchar(355) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `center`
--

INSERT INTO `center` (`id_center`, `center_name`, `center_phoneNumber`, `center_address`, `center_complement_address`, `center_zipCode`, `center_city`, `center_schedule`, `center_contact_mail`, `center_contact_form_message`, `center_validate_schedule`, `center_validate_schedule_below`, `withdrawall_date_available`, `order_date_topay`, `center_place_topay`, `center_withdrawall_place`, `center_withdrawall_schedule`, `center_urlGoogleMap`) VALUES
(1, 'AFPA Saint-Jean-de-Védas', '0467985632', '12 rue Jean Mermoz', 'Zone Industriel de La Lauze', '34430', 'Saint-Jean-de-Védas', 'Horaire de 8h00 à 16h00 du lundi au vendredi', 'afpa.vedas@contact.com', 'Pour contacter l’équipe d&#039__POINTVIRGULE__Af&#039__POINTVIRGULE__panier de Saint Jean de Védas, merci de bien vouloir remplir le formulaire ci-dessous :', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Du Lundi au Jeudi :\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__ de 9h30 - 12h et de 14h à 16h\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\nLe Vendredi : 9h30 - 12h&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'Le Vendredi : 9h30 - 12h', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Le retrait est disponible :&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\nle Vendredi 29 Juin 2021&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\n\nTous les jeudis : 9h - 12h / 14h - 16h30&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'Tous les jeudis : 9h - 12h / 14h - 16h30', 'Salle B Bâtiment 21', 'Bâtiment 5 Salle C', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Tous les Vendredis matins :\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__ de 9h à 12h&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\nBâtiment 5 Salle C&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.0146437152302!2d3.8428906148771707!3d43.56457796617588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6b1e78790b019%3A0x5fe2ea1bc7b758d9!2sAFPA!5e0!3m2!1sfr!2sus!4v1615404440121!5m2!1sfr!2sus'),
(2, 'AFPA Toulouse', '0499076223', '1 allée Griffon', '', '31400', 'Toulouse', 'Horaire de 8h00 à 16h00 du lundi au vendredi', 'afpa.toulouse@contact.com', 'Pour contacter l’équipe d&#039__POINTVIRGULE__Af&#039__POINTVIRGULE__panier de Toulouse, merci de bien vouloir remplir le formulaire ci-dessous :', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Du Lundi au Jeudi : &lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\n9h30 - 12h / 14h -16h\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\nLe Vendredi : 9h30 - 12h&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'Le Vendredi : 9h30 - 12h', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Le retrait est disponible :\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__le Vendredi 29 octobre 2030\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__\n\nTous les jeudis : 9h - 12h / 14h - 16h30&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'Tous les jeudis :9h - 12h / 14h - 16h30', 'Salle D Bâtiment 3', 'Bâtiment 2 Salle A', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Tous les vendredis matins :&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__ \nde 9h à 12h\n\n&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Bâtiment 2 Salle A&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.3324626036497!2d1.495748114876915!3d43.55795506660355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebc61977f04b5%3A0xa2d0bb5b5e267d3a!2sAFPA!5e0!3m2!1sfr!2sus!4v1615404572842!5m2!1sfr!2sus'),
(3, 'AFPA Marseille', '0466576879', '9 boulevard de Louvain\r\n', 'Zone du velodrome', '13008', 'MARSEILLE 08', 'Horaire de 8h00 à 16h00 du lundi au vendredi', 'afpa.marseille@contact.com', 'Pour contacter l’équipe d&#039__POINTVIRGULE__Af&#039__POINTVIRGULE__panier de Marseille, merci de bien vouloir remplir le formulaire ci-dessous :', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Du Lundi au Jeudi : &lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__ 9h30 - 12h / 14h -16h &lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__ Le Vendredi : 9h30 - 12h&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', '', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Le retrait est disponible : &lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__le Vendredi 29 Juillet 2021 &lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__ \n\nTous les jeudis : 9h - 12h / 14h - 16h30&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'Tous les jeudis :9h - 12h / 14h - 16h30', 'Salle OM Bâtiment 1', 'Bâtiment 4 Salle z', '&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Tous les vendredis matins :&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__  de 9h à 12h\n &lt__POINTVIRGULE__/p&gt__POINTVIRGULE__&lt__POINTVIRGULE__p&gt__POINTVIRGULE__Bâtiment om Salle A&lt__POINTVIRGULE__/p&gt__POINTVIRGULE__', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.456509915932!2d5.36064591486506!3d43.24185338695104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9e8159418da2b%3A0x6e2bc9d308eccf5e!2sAFPA!5e0!3m2!1sfr!2sfr!4v1615484640813!5m2!1sfr!2sfr');
-- --------------------------------------------------------

--
-- Structure de la table `commentary`
--

CREATE TABLE `commentary` (
  `id_commentary` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `commentary_text` mediumtext NOT NULL,
  `commentary_note` tinyint(4) NOT NULL,
  `commentary_date` datetime NOT NULL,
  `commentary_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentary`
--

INSERT INTO `commentary` (`id_commentary`, `id_user`, `commentary_text`, `commentary_note`, `commentary_date`, `commentary_status`) VALUES
(1, 1, 'livraison dans les temps, produits en bon état', 2, '2020-12-01 18:02:22', 1),
(2, 1, 'livraison dans les temps, quelques produits abimes', 1, '2020-12-01 20:12:18', 1),
(3, 1, 'livraison dans les temps, manque des produits', 1, '2020-12-02 10:02:15', 1),
(4, 1, 'livraison en retard, produits abimes', 0, '2020-12-03 11:15:00', 1),
(5, 1, 'livraison dans les temps, produits en bon état', 2, '2020-12-04 15:22:15', 1),
(6, 1, 'livraison en retard, manque des produits et certains produits sont abimes', 0, '2020-12-04 18:10:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `faq`
--

CREATE TABLE `faq` (
  `id_faq` int(11) NOT NULL,
  `id_center` int(11) NOT NULL,
  `faq_question` varchar(255) NOT NULL,
  `faq_answer` mediumtext NOT NULL,
  `faq_order` int(11) NOT NULL,
  `faq_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `faq`
--

INSERT INTO `faq` (`id_faq`, `id_center`, `faq_question`, `faq_answer`, `faq_order`, `faq_status`) VALUES
(1, 1, 'Qui est le directeur?', 'Monsieur Pagan', 1, 1),
(2, 1, 'Combien mesure le centre?', '10000  hectares', 1, 1),
(3, 2, 'Combien de place assises?', '4000', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `mainbasket`
--

CREATE TABLE `mainbasket` (
  `id_mainBasket` int(11) NOT NULL,
  `mainBasket_name` varchar(255) NOT NULL,
  `mainBasket_image` varchar(255) NOT NULL,
  `mainBasket_description` varchar(255) DEFAULT NULL,
  `mainBasket_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `mainbasket`
--

INSERT INTO `mainbasket` (`id_mainBasket`, `mainBasket_name`, `mainBasket_image`, `mainBasket_description`, `mainBasket_status`) VALUES
(1, 'Le panier des gourmands', 'fruits-et-legumes-printemps.jpg', 'Le panier actuel est composé de 3 variétés de légumes et 1 variété de fruit.<br>Il arrive directement de Juvignac et il est en quantité limité', 1),
(2, 'Summer', 'fruits-et-legumes-ete.jpg', '', 0),
(3, 'Fall', 'panier-automne.png', '', 0),
(4, 'Winter', 'panier-hiver.png', 'Des bons produits du terroir Montpelliérain. En quantité limité.', 1),
(5, 'Le super panier', 'panier_garni_noel.jpg', '1 Bouteille de vin + 3 terrines', 1),
(6, 'Mon beau panier 50', 'mainBasket_25_02_35.jpg', 'Mon beau panier, roi des paniers !!', 1);

-- --------------------------------------------------------

--
-- Structure de la table `measureunit`
--

CREATE TABLE `measureunit` (
  `id_measureUnit` int(11) NOT NULL,
  `measureUnit_name` varchar(255) NOT NULL,
  `measureUnit_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `measureunit`
--

INSERT INTO `measureunit` (`id_measureUnit`, `measureUnit_name`, `measureUnit_status`) VALUES
(1, 'gr', 1),
(2, 'kg', 1),
(3, 'L', 1),
(4, 'unités', 1),
(5, 'cL', 1),
(6, 'Barquettes', 1),
(8, 'cm', 1);

-- --------------------------------------------------------

--
-- Structure de la table `page`
--

CREATE TABLE `page` (
  `id_page` int(11) NOT NULL,
  `id_center` int(11) NOT NULL,
  `page_url_name` varchar(255) NOT NULL,
  `page_title` varchar(255) NOT NULL,
  `page_content_title` varchar(255) NOT NULL,
  `page_content` mediumtext NOT NULL,
  `page_order` int(11) NOT NULL,
  `page_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `page`
--

INSERT INTO `page` (`id_page`, `id_center`, `page_url_name`, `page_title`, `page_content_title`, `page_content`, `page_order`, `page_status`) VALUES
(1, 1, 'index', 'Gestion des textes', 'Etape 1', 'Inscrivez-vous gratuitement. Vous recevrez un email de confirmation vous invitant à valider votre compte.', 1, 1),
(2, 1, 'index', 'Gestion des textes', 'Etape 2', 'Sélectionnez vos paniers, leur taille et quantité. Validez ensuite votre commande.', 2, 1),
(3, 1, 'index', 'Gestion des textes', 'Etape 3', 'Réglez votre commande auprès du service commercial d\'Eloce. Retrouvez ces informations horaires et lieux sur notre page contact.', 3, 1),
(4, 1, 'index', 'Gestion des textes', 'Qui sommes nous', 'Mon Panier bio cherche à valoriser la consommation de produits bio, mais aussi la consommation locale en circuit court. Pour cette raison vous pourrez trouver sur ce site des distributeurs proposant des produits issus de l\'agriculture traditionnelle. Vous trouverez sur chaque fiche une indication donnée par le distributeur sur le type de produits proposés, mais il vous appartient de vérifier auprès de chacun selon vos attentes.\r\nLe nombre de points de vente de produits bio augmente de façon rapide, suivant en cela la croissance continue de la consommation des produits biologiques. En 2017, ce sont 99 nouveaux détaillants qui se sont notifiés en Occitanie, dont 55% sont des supérettes et supermarchés qui se certifient pour leur activité de cuisson de pain biologique. On dénombre également 19 nouveaux magasins bio spécialisés. Un panel varié de petits distributeurs démarre aussi leur activité proposant ainsi aux consommateurs différents canaux d\'achat (en ligne, paniers).', 4, 1),
(5, 1, 'index', 'Gestion des textes', 'Les sections qui développent le projet', 'Concepteur Développeur d\'Applications Développeur Web et Web Mobile Conseiller relation clientèle à distance Négociant Technico Commercial Manager Unviers Marchand', 5, 1),
(6, 1, 'legal_mentions', 'mentions légales', 'Editeur', 'L Agence nationale pour la formation professionnelle (Afpa EPIC) est l éditeur de l ensemble des sites, portails, pages du domaine afpa.fr pour le groupe Afpa et ses établissements.Le groupe Afpa comprend :', 1, 1),
(7, 1, 'legal_mentions', 'mentions légales', 'L EPIC Afpa', 'Établissement public à caractère industriel et commercial\r\nTour Cityscope, 3 rue Franklin, 93100  Montreuil\r\n824 228 142 RCS BOBIGNY\r\nNDA * : 11930743393\r\nNuméro TVA intracommunautaire : FR 14824228142', 2, 1),
(8, 1, 'legal_mentions', 'mentions légales', 'La SAS Afpa Entreprises', 'SAS au capital de 41.100.000 €\r\nTour Cityscope, 3 rue Franklin, 93100  Montreuil\r\n824 092 688 RCS BOBIGNY\r\nNDA * : 11930762993\r\nNuméro TVA intracommunautaire : FR 82824092688', 3, 1),
(9, 1, 'legal_mentions', 'mentions légales', 'La SAS Afpa Accès à l emploi', 'SAS au capital de 14.800.000 €\r\nTour Cityscope, 3 rue Franklin, 93100  Montreuil\r\n824 363 436 RCS BOBIGNY\r\nNDA * : 11930762993\r\nNuméro TVA intracommunautaire : FR 48824363436\r\n* « NDA : Numéros de déclaration d activité délivrés par la DIRECCTE Ile-de-France. Ces enregistrements ne vallent pas agrément de l Etat. »', 4, 1),
(10, 1, 'legal_mentions', 'mentions légales', 'Directeur de la publication  ', 'Pierre Simon : directeur de la communication\r\nObjectif et qualité des contenus\r\nCe site a pour objectif d informer le grand public, les entreprises, les partenaires institutionnels et les médias. L Afpa s efforce de fournir une information de qualité et vérifiée, toutefois si une information semble inexacte ou contient une erreur typographique, vous pouvez le signaler à l administrateur du site.', 5, 1),
(11, 1, 'legal_mentions', 'mentions légales', 'Hébergement', 'Sopra Steria Group\r\n3 Rue du Pré Faucon 74940 Annecy le Vieux.\r\nTel : 01 40 67 29 29\r\nhttps://www.soprasteria.com/fr', 6, 1),
(12, 1, 'cgv', 'conditions générales de vente', 'Lorem Ipsum', 'Curabitur id nunc eget orci scelerisque iaculis. Quisque ornare malesuada molestie. Cras hendrerit turpis id suscipit suscipit. Donec eleifend erat libero, viverra porta urna lobortis eget. Donec laoreet, elit eget sodales malesuada, felis tortor faucibus ipsum, quis luctus lacus metus ac nulla. Vivamus in elit et nibh suscipit placerat. In malesuada iaculis consectetur. Etiam non urna a lacus facilisis iaculis. Nam tristique tortor a enim accumsan, ut bibendum libero hendrerit. Proin ac ipsum tortor. Sed nec justo ornare, aliquet diam consectetur, pharetra metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent quis magna odio. Cras nec ante quam. Integer pulvinar dignissim ullamcorper.', 1, 1),
(13, 1, 'cgv', 'conditions générales de vente', 'Lorem Ipsum', 'Curabitur id nunc eget orci scelerisque iaculis. Quisque ornare malesuada molestie. Cras hendrerit turpis id suscipit suscipit. Donec eleifend erat libero, viverra porta urna lobortis eget. Donec laoreet, elit eget sodales malesuada, felis tortor faucibus ipsum, quis luctus lacus metus ac nulla. Vivamus in elit et nibh suscipit placerat. In malesuada iaculis consectetur. Etiam non urna a lacus facilisis iaculis. Nam tristique tortor a enim accumsan, ut bibendum libero hendrerit. Proin ac ipsum tortor. Sed nec justo ornare, aliquet diam consectetur, pharetra metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent quis magna odio. Cras nec ante quam. Integer pulvinar dignissim ullamcorper.', 2, 1),
(14, 1, 'cgv', 'conditions générales de vente', 'Lorem Ipsum', 'Curabitur id nunc eget orci scelerisque iaculis. Quisque ornare malesuada molestie. Cras hendrerit turpis id suscipit suscipit. Donec eleifend erat libero, viverra porta urna lobortis eget. Donec laoreet, elit eget sodales malesuada, felis tortor faucibus ipsum, quis luctus lacus metus ac nulla. Vivamus in elit et nibh suscipit placerat. In malesuada iaculis consectetur. Etiam non urna a lacus facilisis iaculis. Nam tristique tortor a enim accumsan, ut bibendum libero hendrerit. Proin ac ipsum tortor. Sed nec justo ornare, aliquet diam consectetur, pharetra metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent quis magna odio. Cras nec ante quam. Integer pulvinar dignissim ullamcorper.', 3, 1),
(15, 1, 'cgv', 'conditions générales de vente', 'Lorem Ipsum', 'Curabitur id nunc eget orci scelerisque iaculis. Quisque ornare malesuada molestie. Cras hendrerit turpis id suscipit suscipit. Donec eleifend erat libero, viverra porta urna lobortis eget. Donec laoreet, elit eget sodales malesuada, felis tortor faucibus ipsum, quis luctus lacus metus ac nulla. Vivamus in elit et nibh suscipit placerat. In malesuada iaculis consectetur. Etiam non urna a lacus facilisis iaculis. Nam tristique tortor a enim accumsan, ut bibendum libero hendrerit. Proin ac ipsum tortor. Sed nec justo ornare, aliquet diam consectetur, pharetra metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent quis magna odio. Cras nec ante quam. Integer pulvinar dignissim ullamcorper.', 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `parameter`
--

CREATE TABLE `parameter` (
  `id_parameter` int(11) NOT NULL,
  `id_center` int(11) NOT NULL,
  `parameter_name` varchar(255) NOT NULL,
  `parameter_value` int(11) NOT NULL,
  `parameter_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parameter`
--

INSERT INTO `parameter` (`id_parameter`, `id_center`, `parameter_name`, `parameter_value`, `parameter_status`) VALUES
(10, 1, 'crcdValidation', 0, 1),
(11, 1, 'validationTime', 24, 1),
(12, 1, 'paymentTime', 96, 1),
(13, 1, 'recoveryTime', 96, 1);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `id_category`, `product_name`, `product_status`) VALUES
(1, 2, 'Tomate', 1),
(2, 3, 'Lieu', 1),
(3, 2, 'Poireau', 1),
(4, 1, 'Framboise', 1),
(5, 1, 'Pomme', 1),
(6, 5, 'Camembert', 1),
(7, 6, 'Vin rouge', 1),
(8, 7, 'Terrine de lapin', 1),
(9, 7, 'Terrine de sanglier', 1),
(10, 4, 'Porc', 1),
(12, 1, 'Banane', 1),
(13, 4, 'Boeuf', 1),
(15, 1, 'Citron', 1),
(16, 3, 'Carpe', 1),
(20, 9, 'Lindt', 1),
(21, 15, 'Cacahuète', 1),
(22, 10, 'Yaourt', 1),
(23, 9, 'Kinder', 1),
(24, 6, 'Vin blanc', 1),
(25, 6, 'Champagne', 1),
(26, 6, 'Coca-cola', 1),
(27, 6, 'Orangina', 1);

-- --------------------------------------------------------

--
-- Structure de la table `promo`
--

DROP TABLE IF EXISTS `promo`;
CREATE TABLE IF NOT EXISTS `promo` (
  `id_promo` int(11) NOT NULL,
  `promo_label` varchar(255) NOT NULL,
  `promo_reference` varchar(15) NOT NULL,
  `promo_number` int(11) DEFAULT NULL,
  `promo_type` varchar(255) DEFAULT NULL,
  `promo_begin_date` datetime NOT NULL,
  `promo_end_date` datetime DEFAULT NULL,
  `promo_quantity` TINYINT(4) NULL,
  `promo_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `promo`
--

INSERT INTO `promo` (`id_promo`, `promo_label`, `promo_reference`, `promo_number`, `promo_type`, `promo_begin_date`, `promo_end_date`, `promo_quantity`, `promo_status`) VALUES
(1, 'reduction de 5€', '5', 5, '€', '2020-12-15 08:00:00', '2021-05-01 12:00:00', 2, 1),
(2, 'reduction de 10 %', 'r10', 10, '%', '2021-03-17 12:00:00', NULL, 15, 1),
(3, 'ajout de 10 tomates au panier', 'Ajout_prod10', 10, 'tomates', '2021-03-17 12:00:00', '2021-03-18 12:00:00', 1, 0),
(4, 'ajout de 20 tomates au panier', 'Ajout_prod20', 20, 'tomates', '2020-12-01 12:00:00', '2020-12-25 12:00:00', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `purchase`
--

CREATE TABLE `purchase` (
  `id_purchase` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `purchase_reference` varchar(10) NOT NULL,
  `purchase_reservationNotif_read` tinyint(1) NOT NULL DEFAULT '0',
  `purchase_paymentNotif_read` tinyint(1) NOT NULL DEFAULT '0',
  `purchase_withdrawal_read` tinyint(1) NOT NULL DEFAULT '0',
  `purchase_status` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `purchase`
--

INSERT INTO `purchase` (`id_purchase`, `id_user`, `purchase_date`, `purchase_reference`, `purchase_reservationNotif_read`, `purchase_paymentNotif_read`, `purchase_withdrawal_read`, `purchase_status`) VALUES
(1, 1, '2020-10-01 12:00:00', 'TRADE15', 0, 0, 0, 1),
(2, 1, '2020-11-18 09:00:00', 'DEAL20', 0, 0, 1, 6),
(3, 1, '2020-12-01 17:00:00', 'CUT10', 1, 1, 1, 1),
(4, 1, '2020-12-03 16:00:00', 'NO30', 1, 1, 1, 1),
(31, 1, '2021-01-06 11:06:47', '3L55RTEZLA', 1, 0, 0, 1),
(67, 2, '2021-01-25 10:04:21', '4ZHBK3GRR0', 0, 0, 0, 6),
(68, 2, '2021-01-26 10:32:33', 'ARI81PDHMP', 0, 0, 0, 2),
(74, 2, '2021-02-04 13:28:59', 'GCODM11ONV', 0, 0, 0, 4),
(75, 2, '2021-02-04 13:29:58', 'YO2FSLPHDP', 0, 0, 0, 3),
(79, 2, '2021-02-04 16:45:18', 'JG09HPOFXQ', 0, 0, 0, 2),
(90, 2, '2021-02-16 13:02:12', 'G8OXRE2SW7', 0, 0, 0, 1),
(91, 7, '2021-02-24 11:10:02', 'AIBIYZGQLW', 0, 0, 0, 1),
(92, 7, '2021-02-25 16:45:57', 'N43RLYVRMG', 0, 0, 0, 2);

-- --------------------------------------------------------

--
-- Structure de la table `socialmedia`
--

CREATE TABLE `socialmedia` (
  `id_socialMedia` int(11) NOT NULL,
  `id_center` int(11) NOT NULL,
  `socialMedia_name` varchar(255) NOT NULL,
  `socialMedia_url` varchar(255) NOT NULL,
  `socialMedia_logo` varchar(255) NOT NULL,
  `socialMedia_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `socialmedia`
--

INSERT INTO `socialmedia` (`id_socialMedia`, `id_center`, `socialMedia_name`, `socialMedia_url`, `socialMedia_logo`, `socialMedia_status`) VALUES
(1, 1, 'Linkedin', 'www.linkedin.com', 'img_linkedin.png', 1),
(2, 2, 'Facebook', 'www.facebook.com', 'img_facebook.png', 1),
(3, 1, 'twitter', 'www.twitter.com', 'img_twitter.png', 1);

-- --------------------------------------------------------

--
-- Structure de la table `supplier`
--

CREATE TABLE `supplier` (
  `id_supplier` int(11) NOT NULL,
  `id_commentary` int(11) DEFAULT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `supplier_firstname` varchar(255) NOT NULL,
  `supplier_img` varchar(255) NOT NULL,
  `supplier_mail` varchar(255) NOT NULL,
  `supplier_phoneNumber` varchar(20) NOT NULL,
  `supplier_address` varchar(255) NOT NULL,
  `supplier_complement_address` varchar(255) DEFAULT NULL,
  `supplier_zipCode` varchar(5) NOT NULL,
  `supplier_city` varchar(255) NOT NULL,
  `supplier_storeName` varchar(255) NOT NULL,
  `supplier_urlGoogleMap` text NOT NULL,
  `supplier_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `supplier`
--

INSERT INTO `supplier` (`id_supplier`, `id_commentary`, `supplier_name`, `supplier_firstname`, `supplier_img`, `supplier_mail`, `supplier_phoneNumber`, `supplier_address`, `supplier_complement_address`, `supplier_zipCode`, `supplier_city`, `supplier_storeName`, `supplier_urlGoogleMap`, `supplier_status`) VALUES
(1, 2, 'Paul', 'Fermier', 'paul.jpg', 'paul.fermier@gmail.com', '04.67.52.32.59', '10 rue des Tulipes ', '', '34070', 'Montpellier', 'La Petite Ferme', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11559.211969507947!2d3.891625369775384!3d43.589819699999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6affc762f5331%3A0x44a91058f258b1e!2sMon%20Mara%C3%AEcher%20-%20Producteur%20Vente%20Directe!5e0!3m2!1sfr!2sfr!4v1607952761679!5m2!1sfr!2sfr\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>\r\n', 1),
(2, 6, 'Jean', 'Poule', 'Jean.jpg', 'jean.poule@gmail.com', '06.18.25.36.24', '28 chemin des roses', 'zac la mandarine', '34170', 'Castelnau Le Lez', 'La Grande Ferme', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46236.85224031887!2d3.8653607914147625!3d43.58981402147866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6a5dd56294293%3A0x90fb42a30126aa31!2sLe%20Jardinier!5e0!3m2!1sfr!2sfr!4v1607953287954!5m2!1sfr!2sfr\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>', 1),
(3, 1, 'Eric', 'Canard', 'Eric.jpg', 'eric.canard@gmail.com', '07.54.03.62.35', '1175 avenue des pétales', '', '34430', 'Saint Jean De Vedas', 'Le Petit Producteur Local', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23118.544048036543!2d3.8271555000000004!3d43.589507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6ae0a4b8e3901%3A0x371bf4fe15d5e49b!2sLES%20VERGERS%20DE%20SAINT%20JEAN!5e0!3m2!1sfr!2sfr!4v1607953356319!5m2!1sfr!2sfr\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>', 1),
(4, 3, 'David', 'Lait', 'David.jpg', 'david.lait@gmail.com', '04.58.63.21.15', '672 avenue des Jockers', '', '34250', 'Palavas Les Flots', 'Chez David', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92474.2110910054!2d3.774625571002832!3d43.58948428541405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6b01b1e78102b%3A0xa21943de5701be99!2sLe%20Mas%20Saint%20Albert!5e0!3m2!1sfr!2sfr!4v1607953403844!5m2!1sfr!2sfr\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>', 1),
(5, 4, 'Karl', 'Grumberg', 'Karl.png', 'karl.grumberg@gmail.com', '06.21.63.26.36', '18 passage des œufs', 'Domaine des oies', '34000', 'Montpellier', 'Grumberg factory', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92474.21109100527!2d3.774625571002832!3d43.58948428541405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6afa7e4cc2523%3A0x96323f1921307f5c!2sLe%20March%C3%A9%20Local!5e0!3m2!1sfr!2sfr!4v1607953456066!5m2!1sfr!2sfr\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>', 1),
(6, 5, 'Damien', 'gigi', 'damien.jpg', 'damien.gigi@gmail.com', '04.25.36.85.63', '1 allée des begonias', '', '34430', 'Saint Jean De Vedas', 'Gigi Land', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92474.34247495169!2d3.77462542682325!3d43.589398771588996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6adfde6658589%3A0x177aec714f228e!2sDomaine%20Le%20Claud!5e0!3m2!1sfr!2sfr!4v1607953508799!5m2!1sfr!2sfr\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>', 1);

-- --------------------------------------------------------

--
-- Structure de la table `supplier__category`
--

CREATE TABLE `supplier__category` (
  `id_category` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `supplier__category`
--

INSERT INTO `supplier__category` (`id_category`, `id_supplier`) VALUES
(1, 1),
(3, 1),
(5, 1),
(2, 2),
(3, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 4),
(1, 5),
(2, 6),
(3, 6),
(4, 6),
(6, 6),
(7, 6);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `id_external_user` int(11) NOT NULL DEFAULT '0',
  `id_center` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_identifier` varchar(20) NOT NULL,
  `user_phoneNumber` varchar(20) NOT NULL,
  `user_pwd` varchar(255) NOT NULL,
  `user_role` int(11) DEFAULT '0',
  `user_date_last_connection` datetime NOT NULL,
  `user_validation_code` varchar(6) NOT NULL,
  `user_gender` int(11) NOT NULL,
  `user_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `id_external_user`, `id_center`, `user_name`, `user_firstname`, `user_mail`, `user_identifier`, `user_phoneNumber`, `user_pwd`, `user_role`, `user_date_last_connection`, `user_validation_code`, `user_gender`, `user_status`) VALUES
(1, 0, 1, 'Pagan', 'Jean-Jacques', 'pagan.jijou@gmail.com', '2154987654', '0636231456', 'Poos654654usnks', 4, '2021-03-08 11:32:09', 'BDL398', 1, 1),
(2, 0, 1, 'Hautefeuille', 'Ludovic', 'hautefeuille.ludo@orange.com', '98765431', '0658961235', 'HdhghdJ654OIUlkj', 1, '2021-03-04 10:48:01', 'DTHD65', 1, 1),
(3, 0, 1, 'Vigneron', 'Virginie', 'Vigneron.Vivi@sfr.com', '3215687', '0679641325', 'JHGS5465SLKJlk', 2, '2021-02-24 08:00:00', 'THS965', 0, 1),
(4, 0, 1, 'Perez', 'Guy', 'perez.guy@gmail.com', '95135789', '0697463165', 'KJHK654DD', 2, '2021-02-24 10:44:56', 'ULKJ69', 1, 1),
(5, 0, 1, 'Grember', 'Damien', 'dgrember@gmail.com', '123456789', '0632993386', 'aaaaaa', 1, '2021-02-24 08:00:00', '', 1, 1),
(6, 0, 1, 'Mouly', 'Ludovic', 'ludom82@gmail.com', '12345678', '0699076223', 'aaaa', 3, '2021-02-24 08:00:00', '', 1, 1),
(7, 0, 1, 'Moreno', 'Antoine', 'antoine-moreno34@hotmail.fr', '1234567', '0613845761', 'aaaa', 0, '2021-03-04 09:24:57', '', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user__basket`
--

CREATE TABLE `user__basket` (
  `id_basket` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_purchase` int(11) NOT NULL,
  `ordered_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user__basket`
--

INSERT INTO `user__basket` (`id_basket`, `id_user`, `id_purchase`, `ordered_quantity`) VALUES
(1, 1, 2, 2),
(1, 2, 2, 4),
(1, 2, 3, 5),
(1, 2, 67, 2),
(1, 2, 68, 2),
(1, 4, 3, 5),
(2, 7, 91, 3),
(3, 1, 2, 6),
(3, 1, 31, 6),
(3, 2, 67, 6),
(3, 2, 68, 6),
(3, 2, 74, 2),
(3, 2, 79, 2),
(3, 2, 90, 2),
(3, 3, 1, 1),
(4, 1, 2, 4),
(4, 1, 31, 4),
(4, 2, 3, 2),
(4, 2, 67, 4),
(4, 2, 68, 4),
(4, 2, 74, 3),
(4, 2, 79, 3),
(4, 2, 90, 6),
(4, 3, 4, 1),
(5, 2, 75, 1),
(5, 7, 91, 2),
(6, 7, 92, 2),
(7, 7, 92, 1);

--
-- Déclencheurs `user__basket`
--
DELIMITER $$
CREATE TRIGGER `Ajout_panier` AFTER DELETE ON `user__basket` FOR EACH ROW BEGIN 
update basket inner join user__basket on basket.id_basket=old.id_basket
inner join purchase on purchase.id_purchase= old.id_purchase
set basket.basket_number=basket.basket_number+old.ordered_quantity 
where basket.id_basket= old.id_basket and purchase.id_purchase=old.id_purchase; 
End
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `MaJ_nb_panier` AFTER INSERT ON `user__basket` FOR EACH ROW BEGIN 
update basket inner join user__basket on basket.id_basket=user__basket.id_basket
inner join purchase on purchase.id_purchase= user__basket.id_purchase
set basket.basket_number=basket.basket_number-user__basket.ordered_quantity 
where user__basket.id_basket=new.id_basket and user__basket.id_purchase=new.id_purchase;
End
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `user__mainbasket`
--

CREATE TABLE `user__mainbasket` (
  `id_mainBasket` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `connection_counter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user__mainbasket`
--

INSERT INTO `user__mainbasket` (`id_mainBasket`, `id_user`, `connection_counter`) VALUES
(1, 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user__promo`
--
--
-- Structure de la table `user__promo`
--

DROP TABLE IF EXISTS `user__promo`;
CREATE TABLE IF NOT EXISTS `user__promo` (
  `id_user` int(11) NOT NULL,
  `id_purchase` int(11) DEFAULT NULL,
  `id_promo` int(11) DEFAULT NULL,
  `used_promo` BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user__promo`
--

INSERT INTO `user__promo` (`id_user`, `id_purchase`, `id_promo`, `used_promo`) VALUES
(1, 4, 2, 0),
(1, 1, 2, 1),
(3, NULL, 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id_article`),
  ADD KEY `FK_Reference_article_center` (`id_center`);

--
-- Index pour la table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id_basket`),
  ADD KEY `basket_supplier_FK` (`id_supplier`),
  ADD KEY `basket_mainBasket0_FK` (`id_mainBasket`);

--
-- Index pour la table `basket__product`
--
ALTER TABLE `basket__product`
  ADD KEY `basket__product_basket_FK` (`id_basket`),
  ADD KEY `basket__product_product0_FK` (`id_product`),
  ADD KEY `basket__product_measureUnit1_FK` (`id_measureUnit`);

--
-- Index pour la table `basket__promo`
--
ALTER TABLE `basket__promo`
  ADD KEY `basket__promo_basket_FK` (`id_basket`),
  ADD KEY `basket__promo_promo0_FK` (`id_promo`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Index pour la table `center`
--
ALTER TABLE `center`
  ADD PRIMARY KEY (`id_center`);

--
-- Index pour la table `commentary`
--
ALTER TABLE `commentary`
  ADD PRIMARY KEY (`id_commentary`),
  ADD KEY `commentary_user_FK` (`id_user`);

--
-- Index pour la table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id_faq`),
  ADD KEY `faq_center_FK` (`id_center`);

--
-- Index pour la table `mainbasket`
--
ALTER TABLE `mainbasket`
  ADD PRIMARY KEY (`id_mainBasket`);

--
-- Index pour la table `measureunit`
--
ALTER TABLE `measureunit`
  ADD PRIMARY KEY (`id_measureUnit`);

--
-- Index pour la table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id_page`),
  ADD KEY `page_center_FK` (`id_center`);

--
-- Index pour la table `parameter`
--
ALTER TABLE `parameter`
  ADD PRIMARY KEY (`id_parameter`),
  ADD KEY `parameter_center_FK` (`id_center`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `product_category_FK` (`id_category`);

--
-- Index pour la table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id_promo`);

--
-- Index pour la table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id_purchase`),
  ADD KEY `purchase_user_FK` (`id_user`);

--
-- Index pour la table `socialmedia`
--
ALTER TABLE `socialmedia`
  ADD PRIMARY KEY (`id_socialMedia`),
  ADD KEY `socialMedia_center_FK` (`id_center`);

--
-- Index pour la table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id_supplier`),
  ADD KEY `supplier_commentary_FK` (`id_commentary`);

--
-- Index pour la table `supplier__category`
--
ALTER TABLE `supplier__category`
  ADD KEY `supplier__category_category_FK` (`id_category`),
  ADD KEY `supplier__category_supplier0_FK` (`id_supplier`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `user_center_FK` (`id_center`);

--
-- Index pour la table `user__basket`
--
ALTER TABLE `user__basket`
  ADD PRIMARY KEY (`id_basket`,`id_user`,`id_purchase`),
  ADD KEY `user__basket_user0_FK` (`id_user`),
  ADD KEY `user__basket_user1_FK` (`id_purchase`);

--
-- Index pour la table `user__mainbasket`
--
ALTER TABLE `user__mainbasket`
  ADD PRIMARY KEY (`id_mainBasket`,`id_user`),
  ADD KEY `user__mainBasket_mainBasket_FK` (`id_mainBasket`),
  ADD KEY `user__mainBasket_user0_FK` (`id_user`);

--
-- Index pour la table `user__promo`
--
ALTER TABLE `user__promo`
  ADD KEY `user__promo_user_FK` (`id_user`),
  ADD KEY `user__purchase_user_FK` (`id_purchase`),
  ADD KEY `user__promo_promo0_FK` (`id_promo`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `basket`
--
ALTER TABLE `basket`
  MODIFY `id_basket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `center`
--
ALTER TABLE `center`
  MODIFY `id_center` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `commentary`
--
ALTER TABLE `commentary`
  MODIFY `id_commentary` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `faq`
--
ALTER TABLE `faq`
  MODIFY `id_faq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `mainbasket`
--
ALTER TABLE `mainbasket`
  MODIFY `id_mainBasket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `measureunit`
--
ALTER TABLE `measureunit`
  MODIFY `id_measureUnit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `page`
--
ALTER TABLE `page`
  MODIFY `id_page` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `parameter`
--
ALTER TABLE `parameter`
  MODIFY `id_parameter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `promo`
--
ALTER TABLE `promo`
  MODIFY `id_promo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id_purchase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT pour la table `socialmedia`
--
ALTER TABLE `socialmedia`
  MODIFY `id_socialMedia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id_supplier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_Reference_article_center` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_mainBasket0_FK` FOREIGN KEY (`id_mainBasket`) REFERENCES `mainbasket` (`id_mainBasket`),
  ADD CONSTRAINT `basket_supplier_FK` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`);

--
-- Contraintes pour la table `basket__product`
--
ALTER TABLE `basket__product`
  ADD CONSTRAINT `basket__product_basket_FK` FOREIGN KEY (`id_basket`) REFERENCES `basket` (`id_basket`),
  ADD CONSTRAINT `basket__product_measureUnit1_FK` FOREIGN KEY (`id_measureUnit`) REFERENCES `measureunit` (`id_measureUnit`),
  ADD CONSTRAINT `basket__product_product0_FK` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Contraintes pour la table `basket__promo`
--
ALTER TABLE `basket__promo`
  ADD CONSTRAINT `basket__promo_basket_FK` FOREIGN KEY (`id_basket`) REFERENCES `basket` (`id_basket`),
  ADD CONSTRAINT `basket__promo_promo0_FK` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id_promo`);

--
-- Contraintes pour la table `commentary`
--
ALTER TABLE `commentary`
  ADD CONSTRAINT `commentary_user_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `faq`
--
ALTER TABLE `faq`
  ADD CONSTRAINT `faq_center_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `parameter`
--
ALTER TABLE `parameter`
  ADD CONSTRAINT `parameter_center_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_category_FK` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Contraintes pour la table `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `purchase_user_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `socialmedia`
--
ALTER TABLE `socialmedia`
  ADD CONSTRAINT `socialMedia_center_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `supplier_commentary_FK` FOREIGN KEY (`id_commentary`) REFERENCES `commentary` (`id_commentary`);

--
-- Contraintes pour la table `supplier__category`
--
ALTER TABLE `supplier__category`
  ADD CONSTRAINT `supplier__category_category_FK` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `supplier__category_supplier0_FK` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_center_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `user__basket`
--
ALTER TABLE `user__basket`
  ADD CONSTRAINT `user__basket_basket_FK` FOREIGN KEY (`id_basket`) REFERENCES `basket` (`id_basket`),
  ADD CONSTRAINT `user__basket_user0_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `user__promo_user1_FK` FOREIGN KEY (`id_purchase`) REFERENCES `purchase` (`id_purchase`);

--
-- Contraintes pour la table `user__mainbasket`
--
ALTER TABLE `user__mainbasket`
  ADD CONSTRAINT `user__mainBasket_mainBasket_FK` FOREIGN KEY (`id_mainBasket`) REFERENCES `mainbasket` (`id_mainBasket`),
  ADD CONSTRAINT `user__mainBasket_user0_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Contraintes pour la table `user__promo`
--
ALTER TABLE `user__promo`
  ADD CONSTRAINT `user__promo_promo0_FK` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id_promo`),
  ADD CONSTRAINT `user__promo_user_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `user__purchase_user_FK` FOREIGN KEY (`id_purchase`) REFERENCES `purchase` (`id_purchase`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
