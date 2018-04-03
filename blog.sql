-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:8889
-- Généré le :  Mar 03 Avril 2018 à 07:45
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `note` int(11) NOT NULL DEFAULT '3',
  `datePublication` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `articles`
--

INSERT INTO `articles` (`id`, `category_id`, `title`, `description`, `photo`, `active`, `note`, `datePublication`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(53, 1, 'Grève à la SNCF : un TER et un Transilien sur cinq circulent aujourd\'hui et seulement un TGV sur huit', 'La \"bataille du rail\" commence. Mardi 3 avril, les cheminots lancent leur grand mouvement de grève contre la réforme de la SNCF proposée par le gouvernement. Avec un cheminot sur deux et 77% des conducteurs en grève, la mobilisation s\'annonce massive. Résultat : le trafic ferroviaire est considérablement perturbé dans toute la France et certaines lignes sont même complètement coupées.\n\n', 'https://cdn.radiofrance.fr/s3/cruiser-production/2018/03/8d12ad21-366e-4b8b-b1f5-303d5ccdd3d5/870x489_maxstockworld356376.jpg', 1, 3, '2018-04-29', '2018-04-02 20:52:32', '2018-04-02 20:52:32', '0000-00-00 00:00:00'),
(54, 4, 'Alpes : le guide Emmanuel Cauchy tué dans une avalanche\n', 'Les skieurs, une quinzaine de Français, ont été surpris par une avalanche, alors qu\'ils évoluaient en hors-piste, lundi 2 avril, sur un sommet du massif des Aiguilles Rouges (Haute-Savoie), à 2 400 mètres d\'altitude. Aussitôt alertés, les gendarmes du peloton de haute montagne de Chamonix ont pu évacuer quatre blessés par hélicoptère, mais n\'ont pu sauver Emmanuel Cauchy, un guide de haute montagne et médecin urgentiste.\n\n', 'http://alpesdusud.alpes1.com/media/news/thumb/870x580_avalanche-anena.jpeg', 0, 3, '2018-04-26', '2018-04-02 20:55:37', '2018-04-02 20:55:37', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `titre` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `titre`, `description`) VALUES
(1, 'actu', 'Toutes les actualités de la presse'),
(2, 'sport', 'Tous les sports'),
(3, 'technologie', 'Toutes actualités des technologies'),
(4, 'economie', 'Toute l\'actualité de l\'économie');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `articles_id` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `comments`
--

INSERT INTO `comments` (`id`, `articles_id`, `content`, `visible`, `createdAt`, `updatedAt`) VALUES
(1, 53, 'Encore une grève!', 0, '2018-04-03 07:44:33', '2018-04-03 07:44:33'),
(2, 54, 'Attention aux avalanches :(', 0, '2018-04-03 07:44:33', '2018-04-03 07:44:33');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `last_login`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Wild Code School', 'julien.boyer@wildcodeschool.fr', '$2y$10$7qO9Oc.vXvyq9lVvA8TquOgQgtsUWigqpYUMBTwHj6aORN6QaCzZm', '2018-04-02 15:59:20', 1, '2017-12-08 17:47:01', '2017-12-08 17:47:01'),
(12, 'Boyer Julien', 'julien@meetserious.com', '$2a$10$X8hAO8TNAKe75eZJBeyTxeNh6yO9VMeUkLgxhy6/qibaaB.PkE8fW', '2018-04-02 16:20:46', 1, '2018-04-02 16:20:46', '2018-04-02 16:20:46');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_id` (`articles_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
