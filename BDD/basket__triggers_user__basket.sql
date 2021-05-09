-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  lun. 08 fév. 2021 à 15:37
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

drop table if exists `basket`;

CREATE TABLE `basket` (
  `id_basket` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL,
  `id_mainBasket` int(11) NOT NULL,
  `basket_name` varchar(255) NOT NULL,
  `basket_image` varchar(255) NOT NULL,
  `basket_description` text NOT NULL,
  `basket_reference` varchar(15) NOT NULL,
  `basket_number` int(3) NOT NULL,
  `basket_price` decimal(5,2) NOT NULL,
  `basket_begin_date` datetime NOT NULL,
  `basket_end_date` datetime NOT NULL,
  `basket_payment_begin_date` datetime NOT NULL,
  `basket_payment_end_date` datetime NOT NULL,
  `basket_withdrawal_begin_date` datetime NOT NULL,
  `basket_withdrawal_end_date` datetime NOT NULL,
  `basket_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket`
--

INSERT INTO `basket` (`id_basket`, `id_supplier`, `id_mainBasket`, `basket_name`, `basket_image`, `basket_description`, `basket_reference`, `basket_number`, `basket_price`, `basket_begin_date`, `basket_end_date`, `basket_payment_begin_date`, `basket_payment_end_date`, `basket_withdrawal_begin_date`, `basket_withdrawal_end_date`, `basket_status`) VALUES
(1, 5, 4, 'Mon beau panier', 'panier.png', 'assortiment de fruits et légumes d\'hiver', 'BASK_WIN_584690', 20, '10.50', '2020-12-15 08:00:00', '2020-12-20 17:00:00', '2020-12-17 08:00:00', '2020-12-22 17:00:00', '2020-12-21 08:00:00', '2020-12-24 17:00:00', 1),
(2, 5, 4, 'Panier de fruits', 'panier_2.png', 'Toute une selection de fruits de saison pour vous', 'BASK_WIN_458470', 20, '9.99', '2020-12-28 08:00:00', '2021-01-04 17:00:00', '2021-01-01 08:00:00', '2021-01-03 17:00:00', '2021-01-03 08:00:00', '2021-01-06 17:00:00', 0),
(3, 2, 1, 'Panier de Legumes', 'vin.png', 'Toute une selection de légumes de saison pour vous', 'BASK_SPR_842540', 20, '13.50', '2021-03-17 08:00:00', '2021-03-22 17:00:00', '2021-03-21 08:00:00', '2021-03-23 17:00:00', '2021-03-23 08:00:00', '2021-03-25 17:00:00', 1),
(4, 2, 1, 'Panier gourmand', 'noel.jpg', 'panier gourmand à partager…ou pas', 'BASK_SPR_325890', 20, '12.99', '2021-03-21 08:00:00', '2021-03-27 17:00:00', '2021-03-26 08:00:00', '2021-03-28 17:00:00', '2021-03-27 08:00:00', '2020-03-29 17:00:00', 1),
(5, 6, 5, 'Panier leger', 'panier-garni-brise-gourmande.jpg', 'Petit panier pour les petits gourmands fan de terrines', 'BASK_PAQUES_84', 20, '10.50', '2021-02-09 09:00:00', '2021-02-14 16:00:00', '2021-02-15 09:00:00', '2021-02-17 17:00:00', '2021-02-19 12:00:00', '2021-02-19 17:00:00', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id_basket`),
  ADD KEY `basket_supplier_FK` (`id_supplier`),
  ADD KEY `basket_mainBasket0_FK` (`id_mainBasket`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `basket`
--
ALTER TABLE `basket`
  MODIFY `id_basket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_mainBasket0_FK` FOREIGN KEY (`id_mainBasket`) REFERENCES `mainbasket` (`id_mainBasket`),
  ADD CONSTRAINT `basket_supplier_FK` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`);


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `afpanier_v3`
--

-- --------------------------------------------------------
--
-- Déclencheurs `user__basket`
--
DELIMITER $$
CREATE TRIGGER `Ajout_panier` AFTER DELETE ON `user__basket` FOR EACH ROW BEGIN 
update basket inner join user__basket on basket.id_basket=user__basket.id_basket
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




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
