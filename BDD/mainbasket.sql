-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  mer. 10 fév. 2021 à 13:12
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `afpanier_v3`
--

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
(5, 'Le super panier', 'panier_garni_noel.jpg', '1 Bouteille de vin + 3 terrines', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `mainbasket`
--
ALTER TABLE `mainbasket`
  ADD PRIMARY KEY (`id_mainBasket`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `mainbasket`
--
ALTER TABLE `mainbasket`
  MODIFY `id_mainBasket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
