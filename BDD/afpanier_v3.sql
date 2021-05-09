-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 08 fév. 2021 à 13:07
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
  `article_date` date NOT NULL,
  `article_author` varchar(255) NOT NULL,
  `article_status` tinyint(1) DEFAULT '1',
  `article_time` time DEFAULT NULL,
  PRIMARY KEY (`id_article`),
  KEY `FK_Reference_article_center` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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
-- Structure de la table `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE IF NOT EXISTS `page` (
  `id_page` int(11) NOT NULL AUTO_INCREMENT,
  `id_center` int(11) NOT NULL,
  `page_url_name` varchar(255) NOT NULL,
  `page_title` varchar(255) NOT NULL,
  `page_content_title` varchar(255) NOT NULL,
  `page_content` mediumtext NOT NULL,
  `page_order` int(11) NOT NULL,
  `page_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_page`),
  KEY `page_center_FK` (`id_center`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

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

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_Reference_article_center` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);

--
-- Contraintes pour la table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `page_center_FK` FOREIGN KEY (`id_center`) REFERENCES `center` (`id_center`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
