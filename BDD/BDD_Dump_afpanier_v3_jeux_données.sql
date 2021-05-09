-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  mer. 13 jan. 2021 à 14:21
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
-- Structure de la table `promo`
--

CREATE TABLE `promo` (
  `id_promo` int(11) NOT NULL,
  `promo_label` varchar(255) NOT NULL,
  `promo_reference` varchar(15) NOT NULL,
  `promo_number` int(11) DEFAULT NULL,
  `promo_type` varchar(255) DEFAULT NULL,
  `promo_begin_date` datetime NOT NULL,
  `promo_end_date` datetime DEFAULT NULL,
  `promo_quantity` tinyint(4) NOT NULL,
  `promo_status` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `promo`
--

INSERT INTO `promo` (`id_promo`, `promo_label`, `promo_reference`, `promo_number`, `promo_type`, `promo_begin_date`, `promo_end_date`, `promo_quantity`, `promo_status`) VALUES
(1, 'reduction de 5€', 'Reduct_eloce5', 5, '€', '2020-12-15 08:00:00', '2020-12-16 12:00:00', 10, 1),
(2, 'reduction de 10 %', 'Reduct_eloce10', 10, '%', '2021-03-17 12:00:00', NULL, 15, 1),
(3, 'ajout de 10 tomates au panier', 'Ajout_prod10', 10, 'tomates', '2021-03-17 12:00:00', '2021-03-18 12:00:00', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id_promo`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `promo`
--
ALTER TABLE `promo`
  MODIFY `id_promo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
