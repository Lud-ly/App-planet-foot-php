-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 04 jan. 2021 à 13:38
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id_article` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) DEFAULT NULL,
  `article_title` varchar(255) NOT NULL,
  `article_subtitle` varchar(255) NOT NULL,
  `article_content` mediumtext NOT NULL,
  `article_url_img` varchar(255) NOT NULL,
  `article_date` datetime NOT NULL,
  `article_author` varchar(255) NOT NULL,
  `article_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_article`),
  KEY `FK_Reference_article_center` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id_article`, `id_center`, `article_title`, `article_subtitle`, `article_content`, `article_url_img`, `article_date`, `article_author`, `article_status`) VALUES
(1, 1, 'Les totos, les tomates', 'Venez voir nos belles tomates', 'Ici notre contenu', 'article_1.png', '2020-12-01 17:00:00', 'Pagan Jean-Jacques', 1),
(2, 1, 'Les Papas, les 100 patates', 'The Super Patates selon Mr Patates', 'Ici notre contenu', 'article_2.png', '2020-12-02 15:00:00', 'Pagan Jean-Jacques', 1),
(3, 1, 'Les Coucous, les courgettes', 'C\'est lhistoire d\'une courgette qui court et qui se jette.', 'Ici notre contenu', 'article_3.png', '2020-12-03 12:00:00', 'Pagan Jean-Jacques', 1),
(4, 1, 'Les babas, les bananes', 'La taille de la banane ne fait pas la force du gorille !', 'Ici notre contenu', 'article_4.png', '2020-12-04 16:00:00', 'Pagan Jean-Jacques', 1);

-- --------------------------------------------------------

--
-- Structure de la table `basket`
--

DROP TABLE IF EXISTS `basket`;
CREATE TABLE IF NOT EXISTS `basket` (
  `id_basket` int(11) NOT NULL AUTO_INCREMENT,
  `id_supplier` int(11) NOT NULL,
  `id_mainBasket` int(11) NOT NULL,
  `basket_name` varchar(255) NOT NULL,
  `basket_image` varchar(255) NOT NULL,
  `basket_description` text NOT NULL,
  `basket_reference` varchar(15) NOT NULL,
  `basket_price` decimal(5,2) NOT NULL,
  `basket_begin_date` datetime NOT NULL,
  `basket_end_date` datetime NOT NULL,
  `basket_payment_begin_date` datetime NOT NULL,
  `basket_payment_end_date` datetime NOT NULL,
  `basket_withdrawal_begin_date` datetime NOT NULL,
  `basket_withdrawal_end_date` datetime NOT NULL,
  `basket_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_basket`),
  KEY `basket_supplier_FK` (`id_supplier`),
  KEY `basket_mainBasket0_FK` (`id_mainBasket`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket`
--

INSERT INTO `basket` (`id_basket`, `id_supplier`, `id_mainBasket`, `basket_name`, `basket_image`, `basket_description`, `basket_reference`, `basket_price`, `basket_begin_date`, `basket_end_date`, `basket_payment_begin_date`, `basket_payment_end_date`, `basket_withdrawal_begin_date`, `basket_withdrawal_end_date`, `basket_status`) VALUES
(1, 5, 4, 'Mon beau panier', 'panier.png', 'assortiment de fruits et légumes d\'hiver', 'BASK_WIN_584690', '10.50', '2020-12-15 08:00:00', '2020-12-20 17:00:00', '2020-12-17 08:00:00', '2020-12-22 17:00:00', '2020-12-21 08:00:00', '2020-12-24 17:00:00', 1),
(2, 1, 4, 'Panier de fruits', 'panier_2.png', 'Toute une selection de fruits de saison pour vous', 'BASK_WIN_458470', '9.99', '2020-12-28 08:00:00', '2021-01-04 17:00:00', '2021-01-01 08:00:00', '2021-01-03 17:00:00', '2021-01-03 08:00:00', '2021-01-06 17:00:00', 0),
(3, 2, 1, 'Panier de Legumes', 'vin.png', 'Toute une selection de légumes de saison pour vous', 'BASK_SPR_842540', '13.50', '2021-03-17 08:00:00', '2021-03-22 17:00:00', '2021-03-21 08:00:00', '2021-03-23 17:00:00', '2021-03-23 08:00:00', '2021-03-25 17:00:00', 1),
(4, 6, 1, 'Panier gourmand', 'noel.jpg', 'panier gourmand à partager…ou pas', 'BASK_SPR_325890', '12.99', '2021-03-21 08:00:00', '2021-03-27 17:00:00', '2021-03-26 08:00:00', '2021-03-28 17:00:00', '2021-03-27 08:00:00', '2020-03-29 17:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `basket__product`
--

DROP TABLE IF EXISTS `basket__product`;
CREATE TABLE IF NOT EXISTS `basket__product` (
  `id_basket` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_measureUnit` int(11) DEFAULT NULL,
  `product_quantity` int(11) NOT NULL,
  KEY `basket__product_basket_FK` (`id_basket`),
  KEY `basket__product_product0_FK` (`id_product`),
  KEY `basket__product_measureUnit1_FK` (`id_measureUnit`)
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
(3, 2, 2, 5),
(4, 3, 4, 3),
(4, 6, 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `basket__promo`
--

DROP TABLE IF EXISTS `basket__promo`;
CREATE TABLE IF NOT EXISTS `basket__promo` (
  `id_basket` int(11) NOT NULL,
  `id_promo` int(11) DEFAULT NULL,
  KEY `basket__promo_basket_FK` (`id_basket`),
  KEY `basket__promo_promo0_FK` (`id_promo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket__promo`
--

INSERT INTO `basket__promo` (`id_basket`, `id_promo`) VALUES
(2, NULL),
(3, 1),
(4, 1),
(4, NULL),
(1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `category_status`) VALUES
(1, 'Fruits', 1),
(2, 'Legumes', 1),
(3, 'Poisson', 1),
(4, 'Viande', 1),
(5, 'Fromage', 1);

-- --------------------------------------------------------

--
-- Structure de la table `center`
--

DROP TABLE IF EXISTS `center`;
CREATE TABLE IF NOT EXISTS `center` (
  `id_center` int(11) NOT NULL AUTO_INCREMENT,
  `center_name` varchar(255) NOT NULL,
  `center_phoneNumber` varchar(20) NOT NULL,
  `center_address` varchar(255) NOT NULL,
  `center_complement_address` varchar(255) DEFAULT NULL,
  `center_zipCode` varchar(5) NOT NULL,
  `center_city` varchar(255) NOT NULL,
  `center_schedule` text NOT NULL,
  `center_contact_mail` varchar(255) NOT NULL,
  `center_withdrawal_place` text NOT NULL,
  `center_withdrawal_schedule` text NOT NULL,
  `center_urlGoogleMap` varchar(255) NOT NULL,
  PRIMARY KEY (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `center`
--

INSERT INTO `center` (`id_center`, `center_name`, `center_phoneNumber`, `center_address`, `center_complement_address`, `center_zipCode`, `center_city`, `center_schedule`, `center_contact_mail`, `center_withdrawal_place`, `center_withdrawal_schedule`, `center_urlGoogleMap`) VALUES
(1, 'AFPA Saint-Jean-de-Védas', '0467985632', '12 rue Jean Mermoz', 'Zone Industriel de La Lauze', '34430', 'Saint-Jean-de-Védas', 'Horaire de 8h00 à 16h00 du lundi au vendredi', 'afpa.vedas@contact.com', 'Bat 14', 'Jeudi de 12h00 à 14H00', 'https://www.google.com/maps/dir/43.6007954,3.8757129/afpa+saint+jean+de+vedas/@43.5814544,3.8471799,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x12b6b1e78790b019:0x5fe2ea1bc7b758d9!2m2!1d3.8450793!2d43.5645741'),
(2, 'AFPA Toulouse', '0467985632', '1 allée Griffon', '', '31400', 'Toulouse', 'Horaire de 8h00 à 16h00 du lundi au vendredi', 'afpa.toulouse@contact.com', 'Bat 8', 'Jeudi de 12h00 à 14H00', 'https://www.google.com/maps/dir//afpa+toulouse/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x12aebc61977f04b5:0xa2d0bb5b5e267d3a?sa=X&ved=2ahUKEwjbk4Pbu7HtAhUk5eAKHd_0CcYQ9RcwE3oECCIQBA');

-- --------------------------------------------------------

--
-- Structure de la table `commentary`
--

DROP TABLE IF EXISTS `commentary`;
CREATE TABLE IF NOT EXISTS `commentary` (
  `id_commentary` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `commentary_text` mediumtext NOT NULL,
  `commentary_note` tinyint(4) NOT NULL,
  `commentary_date` datetime NOT NULL,
  `commentary_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_commentary`),
  KEY `commentary_user_FK` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

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

DROP TABLE IF EXISTS `faq`;
CREATE TABLE IF NOT EXISTS `faq` (
  `id_faq` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `faq_question` varchar(255) NOT NULL,
  `faq_answer` mediumtext NOT NULL,
  `faq_order` int(11) NOT NULL,
  `faq_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_faq`),
  KEY `faq_center_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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

DROP TABLE IF EXISTS `mainbasket`;
CREATE TABLE IF NOT EXISTS `mainbasket` (
  `id_mainBasket` int(11) NOT NULL AUTO_INCREMENT,
  `mainBasket_name` varchar(255) NOT NULL,
  `mainBasket_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_mainBasket`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `mainbasket`
--

INSERT INTO `mainbasket` (`id_mainBasket`, `mainBasket_name`, `mainBasket_status`) VALUES
(1, 'Spring', 1),
(2, 'Summer', 0),
(3, 'Fall', 0),
(4, 'Winter', 1);

-- --------------------------------------------------------

--
-- Structure de la table `measureunit`
--

DROP TABLE IF EXISTS `measureunit`;
CREATE TABLE IF NOT EXISTS `measureunit` (
  `id_measureUnit` int(11) NOT NULL AUTO_INCREMENT,
  `measureUnit_name` varchar(255) NOT NULL,
  `measureUnit_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_measureUnit`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `measureunit`
--

INSERT INTO `measureunit` (`id_measureUnit`, `measureUnit_name`, `measureUnit_status`) VALUES
(1, 'gr', 1),
(2, 'kg', 1),
(3, 'L', 1),
(4, 'unités', 1);

-- --------------------------------------------------------

--
-- Structure de la table `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id_page` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `page_url_name` varchar(255) NOT NULL,
  `page_title` varchar(255) NOT NULL,
  `page_content` mediumtext NOT NULL,
  `page_order` int(11) NOT NULL,
  `page_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_page`),
  KEY `page_center_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `page`
--

INSERT INTO `page` (`id_page`, `id_center`, `page_url_name`, `page_title`, `page_content`, `page_order`, `page_status`) VALUES
(1, 1, 'https://afpa.fr', 'cgv', 'Le contenu', 1, 1),
(2, 1, 'https://afpa.fr', 'legal mention', 'Le lois', 2, 1),
(3, 2, 'https://afpa.fr', 'cgv', 'Le contenu', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
CREATE TABLE IF NOT EXISTS `parameter` (
  `id_parameter` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `parameter_name` varchar(255) NOT NULL,
  `parameter_value` int(11) NOT NULL,
  `parameter_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_parameter`),
  KEY `parameter_center_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parameter`
--

INSERT INTO `parameter` (`id_parameter`, `id_center`, `parameter_name`, `parameter_value`, `parameter_status`) VALUES
(1, 1, 'name_1', 1, 1),
(2, 1, 'name_2', 1, 1),
(3, 2, 'name_3', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `id_category` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_product`),
  KEY `product_category_FK` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `id_category`, `product_name`, `product_status`) VALUES
(1, 2, 'Tomates', 1),
(2, 3, 'Lieu', 1),
(3, 2, 'Poireaux', 1),
(4, 1, 'Framboises', 1),
(5, 1, 'Pommes', 1),
(6, 5, 'Camembert', 1);

-- --------------------------------------------------------

--
-- Structure de la table `promo`
--

DROP TABLE IF EXISTS `promo`;
CREATE TABLE IF NOT EXISTS `promo` (
  `id_promo` int(11) NOT NULL AUTO_INCREMENT,
  `promo_label` varchar(255) NOT NULL,
  `promo_reference` varchar(15) NOT NULL,
  `promo_number` int(11) DEFAULT NULL,
  `promo_type` varchar(255) DEFAULT NULL,
  `promo_begin_date` datetime NOT NULL,
  `promo_end_date` datetime DEFAULT NULL,
  `promo_quantity` tinyint(4) NOT NULL,
  `promo_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_promo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `promo`
--

INSERT INTO `promo` (`id_promo`, `promo_label`, `promo_reference`, `promo_number`, `promo_type`, `promo_begin_date`, `promo_end_date`, `promo_quantity`, `promo_status`) VALUES
(1, 'reduction de 5€', 'Reduct_eloce5', 5, '€', '2020-12-15 08:00:00', '2020-12-16 12:00:00', 10, 1),
(2, 'reduction de 10 %', 'Reduct_eloce10', 10, '%', '2021-03-17 12:00:00', NULL, 15, 1),
(3, 'ajout de 10 tomates au panier', 'Ajout_prod10', 10, 'tomates', '2021-03-17 12:00:00', '2021-03-18 12:00:00', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE IF NOT EXISTS `purchase` (
  `id_purchase` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `purchase_reference` varchar(10) NOT NULL,
  `purchase_reservationNotif_read` tinyint(1) NOT NULL,
  `purchase_paymentNotif_read` tinyint(1) NOT NULL,
  `purchase_withdrawal_read` tinyint(1) NOT NULL,
  `purchase_status` int(11) DEFAULT '1',
  PRIMARY KEY (`id_purchase`),
  KEY `purchase_user_FK` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `purchase`
--

INSERT INTO `purchase` (`id_purchase`, `id_user`, `purchase_date`, `purchase_reference`, `purchase_reservationNotif_read`, `purchase_paymentNotif_read`, `purchase_withdrawal_read`, `purchase_status`) VALUES
(1, 1, '2020-10-01 12:00:00', 'TRADE15', 0, 0, 0, 1),
(2, 1, '2020-11-18 09:00:00', 'DEAL20', 0, 0, 1, 1),
(3, 1, '2020-12-01 17:00:00', 'CUT10', 1, 1, 1, 2),
(4, 1, '2020-12-03 16:00:00', 'NO30', 1, 1, 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `socialmedia`
--

DROP TABLE IF EXISTS `socialmedia`;
CREATE TABLE IF NOT EXISTS `socialmedia` (
  `id_socialMedia` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `socialMedia_name` varchar(255) NOT NULL,
  `socialMedia_url` varchar(255) NOT NULL,
  `socialMedia_logo` varchar(255) NOT NULL,
  `socialMedia_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_socialMedia`),
  KEY `socialMedia_center_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `id_supplier` int(11) NOT NULL AUTO_INCREMENT,
  `id_commentary` int(11) NOT NULL,
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
  `supplier_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_supplier`),
  KEY `supplier_commentary_FK` (`id_commentary`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

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

DROP TABLE IF EXISTS `supplier__category`;
CREATE TABLE IF NOT EXISTS `supplier__category` (
  `id_category` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL,
  KEY `supplier__category_category_FK` (`id_category`),
  KEY `supplier__category_supplier0_FK` (`id_supplier`)
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
(4, 6);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_identifier` varchar(20) NOT NULL,
  `user_phoneNumber` varchar(20) NOT NULL,
  `user_pwd` varchar(255) NOT NULL,
  `user_role` int(11) DEFAULT '0',
  `user_validation_code` varchar(6) NOT NULL,
  `user_gender` int(11) NOT NULL,
  `user_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_user`),
  KEY `user_center_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `id_center`, `user_name`, `user_firstname`, `user_mail`, `user_identifier`, `user_phoneNumber`, `user_pwd`, `user_role`, `user_validation_code`, `user_gender`, `user_status`) VALUES
(1, 1, 'Pagan', 'Jean-Jacques', 'pagan.jijou@gmail.com', '2154987654', '0636231456', 'Poos654654usnks', 1, 'BDL398', 1, 1),
(2, 1, 'Hautefeuille', 'Ludovic', 'hautefeuille.ludo@orange.com', '98765431', '0658961235', 'HdhghdJ654OIUlkj', 1, 'DTHD65', 1, 1),
(3, 1, 'Vigneron', 'Virginie', 'Vigneron.Vivi@sfr.com', '3215687', '0679641325', 'JHGS5465SLKJlk', 1, 'THS965', 0, 1),
(4, 1, 'Perez', 'Guy', 'perez.guy@gmail.com', '95135789', '0697463165', 'KJHK654DD', 1, 'ULKJ69', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user__basket`
--

DROP TABLE IF EXISTS `user__basket`;
CREATE TABLE IF NOT EXISTS `user__basket` (
  `id_basket` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_purchase` int(11) NOT NULL,
  `ordered_quantity` int(11) NOT NULL,
  PRIMARY KEY (`id_basket`,`id_user`,`id_purchase`),
  KEY `user__basket_user0_FK` (`id_user`),
  KEY `user__basket_user1_FK` (`id_purchase`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user__basket`
--

INSERT INTO `user__basket` (`id_basket`, `id_user`, `id_purchase`, `ordered_quantity`) VALUES
(1, 2, 2, 4),
(1, 4, 3, 5),
(2, 1, 1, 2),
(3, 1, 1, 3),
(3, 3, 1, 1),
(4, 3, 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user__promo`
--

DROP TABLE IF EXISTS `user__promo`;
CREATE TABLE IF NOT EXISTS `user__promo` (
  `id_user` int(11) NOT NULL,
  `id_promo` int(11) NOT NULL,
  KEY `user__promo_user_FK` (`id_user`),
  KEY `user__promo_promo0_FK` (`id_promo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user__promo`
--

INSERT INTO `user__promo` (`id_user`, `id_promo`) VALUES
(2, 3),
(3, 1),
(3, 2),
(4, 1),
(1, 2);

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
-- Contraintes pour la table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `page_center_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

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
-- Contraintes pour la table `user__promo`
--
ALTER TABLE `user__promo`
  ADD CONSTRAINT `user__promo_promo0_FK` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id_promo`),
  ADD CONSTRAINT `user__promo_user_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
