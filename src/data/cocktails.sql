-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 07. Mrz 2014 um 20:38
-- Server Version: 5.5.34
-- PHP-Version: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `cocktails`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cocktail`
--

CREATE TABLE IF NOT EXISTS `cocktail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `recipedescription` varchar(500) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `orders` int(11) DEFAULT NULL,
  `offers` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Daten für Tabelle `cocktail`
--

INSERT INTO `cocktail` (`id`, `name`, `description`, `recipedescription`, `image`, `orders`, `offers`) VALUES
(1, 'Barbados', '', 'Stir ingredients in a cocktail shaker with ice. Strain into a cocktail glass.', '', 0, 0),
(2, 'Emerald Dreams', NULL, 'Mix and shake the ingredients.', NULL, 0, 0),
(3, 'Green Devil', NULL, 'Shake all ingredients with ice and strain into an old-fashioned glass over a few ice cubes.', NULL, 0, 0),
(4, 'Captain Chaos', '', 'Shake all ingredients with ice and strain into a long drink glass over a few ice cubes.', NULL, 0, 0),
(5, 'Men in blue', NULL, '', NULL, 0, 0),
(6, 'Santo Domingo', NULL, '', NULL, 0, 0),
(7, 'Swamp Water', NULL, 'Add ice to a 12oz cup, add vodka and brandy. Add equal parts of sweet & sour and 7-UP.', NULL, 0, 0),
(8, 'The Waikiki', NULL, '', NULL, 0, 0),
(9, 'Yellow G-Point', NULL, '', NULL, 0, 0),
(10, 'Soft Poison', NULL, '', NULL, 0, 0),
(11, 'Baltic', NULL, '', NULL, 0, 0),
(12, 'Gin and Juice', NULL, '', NULL, 0, 0),
(13, 'Green Eyes', NULL, '1. Place ice cubes in a highball glass<br/>\n2. Combine ingredients directly On the rocks', NULL, 0, 0),
(14, 'The Dodo', NULL, '', NULL, 0, 0),
(15, 'Hurricane', 'A rum drink.', 'Shake well with ice and strain into a hurricane glass filled with crushed ice.', NULL, 0, 0),
(16, 'Monkey Wrench', NULL, '', NULL, 0, 0),
(17, 'Rum Orange', NULL, 'Shake the ingredients.', NULL, 0, 0),
(18, 'Safari', NULL, '', NULL, 1, 0),
(19, 'Screwdriver', 'One of the most basic mixed alcoholic drinks, varieties exist changing the type of juice used, with grapefruit being a popular choice. Mixing vodka (or gin) with powdered juice (such as Tang) without the intermediary step of reconstituting the juice with water is an occasional fad in "coed gatherings" and not recommended.<br/><br/>\nSome bars use an actual screwdriver (the tool) as a stirrer/garnish.<br/><br/>\nOne variation adds a shot of Red Bull to make a "sonic screwdriver".', '1. Half fill the glass with ice and add the vodka.<br/>\n2. Top off with the orange juice.<br/>\n3. Garnish with slice of orange.', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ingredient`
--

CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `alcohol` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Daten für Tabelle `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `description`, `image`, `unit`, `alcohol`) VALUES
(1, 'Pineapple Juice', '', 'none.png', 'cl', 0),
(2, 'Maracuja Juice', '', 'none.png', 'cl', 0),
(3, 'Orange Juice', '', '', 'cl', 0),
(4, 'Lemon Juice', '', '', 'cl', 0),
(5, 'Blue Curacao', '', '', 'cl', 25),
(6, 'Gin', '', '', 'cl', 40),
(7, 'White Rum', '', '', 'cl', 40),
(8, 'Wodka', '', '', 'cl', 40);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
  `USER` int(11) NOT NULL DEFAULT '0',
  `AGE` int(11) DEFAULT NULL,
  `SEX` varchar(1) DEFAULT NULL,
  `COCKTAIL` int(11) NOT NULL DEFAULT '0',
  `BITTER` int(11) DEFAULT NULL,
  `SWEET` int(11) DEFAULT NULL,
  `FRUITY` int(11) DEFAULT NULL,
  `STRONG` int(11) DEFAULT NULL,
  `TASTE` int(11) DEFAULT NULL,
  `LOOK` int(11) DEFAULT NULL,
  `AM_STRAND` int(11) DEFAULT NULL,
  `FIRMENFEIER` int(11) DEFAULT NULL,
  `JUNGGESELLENABSCHIED` int(11) DEFAULT NULL,
  `HOCHZEIT` int(11) DEFAULT NULL,
  `COCKTAILBAR` int(11) DEFAULT NULL,
  `NACH_DEM_ESSEN` int(11) DEFAULT NULL,
  `AUF_DEM_SOFA` int(11) DEFAULT NULL,
  `VORGLUEHEN` int(11) DEFAULT NULL,
  `ERSTES_DATE` int(11) DEFAULT NULL,
  `DISCO` int(11) DEFAULT NULL,
  `WG_PARTY` int(11) DEFAULT NULL,
  `SOMMERABEND` int(11) DEFAULT NULL,
  `WINTERABEND` int(11) DEFAULT NULL,
  `NIE` int(11) DEFAULT NULL,
  PRIMARY KEY (`USER`,`COCKTAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`USER`, `AGE`, `SEX`, `COCKTAIL`, `BITTER`, `SWEET`, `FRUITY`, `STRONG`, `TASTE`, `LOOK`, `AM_STRAND`, `FIRMENFEIER`, `JUNGGESELLENABSCHIED`, `HOCHZEIT`, `COCKTAILBAR`, `NACH_DEM_ESSEN`, `AUF_DEM_SOFA`, `VORGLUEHEN`, `ERSTES_DATE`, `DISCO`, `WG_PARTY`, `SOMMERABEND`, `WINTERABEND`, `NIE`) VALUES
(0, 23, 'w', 3, 4, 1, 3, 5, 1, 4, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(0, 23, 'w', 5, 4, 2, 2, 4, 2, 5, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(0, 23, 'w', 8, 1, 5, 1, 5, 5, 5, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0),
(0, 23, 'w', 11, 1, 4, 5, 2, 5, 5, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(0, 23, 'w', 12, 5, 3, 4, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(1, 23, 'm', 9, 4, 3, 4, 2, 3, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0),
(1, 23, 'm', 12, 4, 3, 4, 1, 5, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0),
(1, 23, 'm', 13, 4, 3, 4, 2, 4, 4, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(1, 23, 'm', 15, 4, 3, 1, 3, 3, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(2, 24, 'w', 1, 5, 1, 1, 5, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1),
(2, 24, 'w', 4, 5, 2, 2, 5, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(2, 24, 'w', 6, 1, 5, 4, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 24, 'w', 11, 2, 5, 4, 1, 3, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 24, 'w', 17, 4, 2, 2, 4, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(3, 23, 'm', 4, 5, 3, 2, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(3, 23, 'm', 9, 1, 5, 4, 2, 5, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(3, 23, 'm', 12, 4, 3, 2, 3, 2, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(3, 23, 'm', 18, 2, 1, 3, 3, 5, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0),
(3, 23, 'm', 19, 4, 2, 1, 4, 3, 5, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(4, 26, 'w', 3, 4, 3, 3, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(4, 26, 'w', 7, 3, 4, 5, 4, 2, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(4, 26, 'w', 10, 1, 5, 4, 1, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(4, 26, 'w', 11, 1, 5, 5, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(4, 26, 'w', 15, 3, 4, 3, 4, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 22, 'm', 1, 4, 1, 1, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(5, 22, 'm', 10, 1, 4, 5, 2, 5, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(5, 22, 'm', 15, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 22, 'm', 17, 3, 3, 3, 3, 4, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 22, 'm', 18, 5, 1, 3, 4, 2, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(6, 25, 'm', 1, 5, 1, 1, 5, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 25, 'm', 11, 2, 4, 4, 1, 4, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0),
(6, 25, 'm', 16, 2, 4, 3, 4, 3, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(6, 25, 'm', 17, 5, 1, 2, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 25, 'm', 15, 2, 2, 3, 5, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(8, 23, 'w', 6, 3, 4, 2, 4, 3, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0),
(9, 23, 'm', 1, 4, 1, 2, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(9, 23, 'm', 3, 4, 2, 2, 5, 1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(9, 23, 'm', 7, 4, 3, 2, 4, 2, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0),
(10, 22, 'w', 5, 3, 3, 1, 5, 1, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0),
(10, 22, 'w', 6, 5, 3, 2, 3, 2, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(10, 22, 'w', 10, 2, 3, 3, 1, 5, 4, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(10, 22, 'w', 13, 4, 3, 2, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(11, 24, 'm', 15, 2, 2, 1, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 24, 'm', 11, 2, 4, 5, 1, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
(12, 24, 'm', 16, 2, 3, 2, 5, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(13, 23, 'm', 2, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(13, 23, 'm', 4, 3, 2, NULL, 5, 1, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(13, 23, 'm', 8, 2, 3, 4, 2, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(13, 23, 'm', 9, 3, 3, 4, 5, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
(13, 23, 'm', 12, 4, 2, 2, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 25, 'm', 6, 2, 4, 4, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0),
(14, 25, 'm', 7, 1, 1, 1, 5, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 24, 'm', 4, 4, 3, 2, 4, 2, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(15, 24, 'm', 5, 3, 1, 3, 4, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(15, 24, 'm', 6, 1, 4, 4, 2, 4, 3, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0),
(15, 24, 'm', 9, 3, 3, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0),
(15, 24, 'm', 17, 3, 2, 1, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0),
(16, 22, 'w', 2, 1, 3, 4, 3, 4, 4, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(16, 22, 'w', 15, 2, 2, 3, 5, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(17, 28, 'w', 1, 5, 1, 3, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(17, 28, 'w', 2, 1, 4, 4, 2, 4, 3, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0),
(17, 28, 'w', 5, 5, 1, 3, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(17, 28, 'w', 9, NULL, 1, 5, NULL, 3, 3, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0),
(17, 28, 'w', 13, 1, 3, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(18, 24, 'm', 4, 4, 2, 4, 4, 1, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(18, 24, 'm', 8, 2, 5, 5, 2, 4, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(18, 24, 'm', 11, 1, 4, 5, 3, 5, 4, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0),
(18, 24, 'm', 12, 4, 5, 5, 4, 4, 5, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(18, 24, 'm', 15, 4, 2, 3, 5, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(19, 23, 'w', 4, 5, 1, 1, 5, 1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(19, 23, 'w', 6, 1, 4, 5, 2, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0),
(19, 23, 'w', 8, 1, 4, 5, 3, 5, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0),
(19, 23, 'w', 11, 1, 5, 4, 3, 5, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(19, 23, 'w', 19, 4, 1, 1, 5, 2, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(20, 25, 'm', 3, 4, 3, 3, 5, 3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(20, 25, 'm', 8, 1, 4, 5, 1, 5, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(20, 25, 'm', 9, 2, 1, 4, 2, 4, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0),
(20, 25, 'm', 12, 4, 2, 2, 5, 2, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(20, 25, 'm', 13, 5, 2, 3, 4, 2, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0),
(21, 22, 'm', 2, 3, 3, 4, 2, 3, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(21, 22, 'm', 3, 4, 1, 1, 4, 3, 3, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(21, 22, 'm', 4, 1, 4, 4, 3, 4, 4, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(21, 22, 'm', 7, 4, 2, 2, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(21, 22, 'm', 15, 4, 4, 2, 5, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(22, 24, 'm', 9, 3, 3, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0),
(22, 24, 'm', 10, 1, 5, 4, 1, 5, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(22, 24, 'm', 11, 2, 3, 3, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 24, 'm', 13, 3, 2, 2, 4, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 24, 'm', 17, 4, 3, 2, 5, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(23, 24, 'm', 2, 1, 4, 4, 3, 4, 4, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(23, 24, 'm', 7, 5, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(23, 24, 'm', 12, 3, 3, 3, 4, 1, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0),
(23, 24, 'm', 15, 3, 4, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0),
(23, 24, 'm', 18, 2, 1, 2, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(24, 23, 'w', 2, 4, 1, 2, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(24, 23, 'w', 3, 5, 1, 1, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(24, 23, 'w', 8, 4, 3, 4, 4, 3, 4, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(24, 23, 'w', 10, 3, 3, 4, 2, 4, 2, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(24, 23, 'w', 11, 2, 5, 4, 3, 5, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(25, 23, 'm', 1, 5, 1, 1, 5, 1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(25, 23, 'm', 5, 4, 2, 3, 3, 2, 5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(25, 23, 'm', 11, 1, 3, 5, 2, 5, 5, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(25, 23, 'm', 14, 2, 4, 5, 2, 5, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(25, 23, 'm', 16, 4, 4, 3, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(26, 23, 'w', 3, 3, 3, 1, 4, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(26, 23, 'w', 5, 5, 1, 1, 5, 2, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 23, 'w', 13, 2, 3, 3, 3, 4, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 23, 'w', 14, 1, 3, 4, 3, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 23, 'w', 15, 3, 4, 4, 3, 4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 23, 'm', 5, 5, 1, 2, 4, 5, 5, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 23, 'm', 6, 3, 3, 3, 5, 4, 3, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(27, 23, 'm', 10, 2, 3, 4, 2, 4, 4, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 23, 'm', 11, 2, 4, 4, 2, 5, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 23, 'm', 19, 2, 3, 4, 5, 2, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(28, 23, 'm', 1, 4, 2, 2, 4, 2, 4, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0),
(28, 23, 'm', 4, 2, 4, 4, 3, 4, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(28, 23, 'm', 7, 3, 4, 4, 2, 4, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0),
(28, 23, 'm', 13, 2, 4, 4, 1, 4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(28, 23, 'm', 19, 3, 3, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(29, 41, 'm', 3, 2, 1, 1, 4, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(29, 41, 'm', 7, 3, 2, 2, 4, 2, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0),
(29, 41, 'm', 11, 2, 4, 4, 3, 4, 3, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0),
(29, 41, 'm', 17, 4, 1, 2, 5, 1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(29, 41, 'm', 18, 4, 1, 3, 4, 3, 4, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0),
(30, 41, 'm', 6, 1, 4, 4, 4, 4, 3, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0),
(30, 41, 'm', 9, 2, 4, 4, 2, 4, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0),
(30, 41, 'm', 14, 3, 1, 4, 3, 4, 4, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0),
(30, 41, 'm', 16, 4, 2, 1, 5, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 41, 'm', 18, 4, 1, 3, 4, 3, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0),
(31, 28, 'w', 13, 3, 4, 3, 3, 4, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0),
(31, 28, 'w', 17, 2, 2, 2, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(31, 28, 'w', 18, 4, 1, 1, 5, 1, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(32, 23, 'm', 4, 4, 1, 2, 2, 3, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(32, 23, 'm', 10, 4, 2, 4, 2, 4, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(32, 23, 'm', 16, 2, 3, 5, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(33, 25, 'm', 2, 2, 4, 4, 3, 4, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0),
(33, 25, 'm', 5, 2, 3, 3, 4, 4, 5, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 25, 'm', 15, 4, 4, 2, 5, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(33, 25, 'm', 18, 1, 3, 5, 3, 4, 5, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(33, 25, 'm', 19, 1, 4, 4, 2, 4, 5, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0),
(34, 25, 'm', 1, 3, 3, 2, 5, 1, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(34, 25, 'm', 10, 1, 5, 5, 1, 5, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(34, 25, 'm', 11, 1, 5, 4, 1, 4, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(34, 25, 'm', 15, 1, 4, 3, 4, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(34, 25, 'm', 17, 4, 2, 3, 3, 2, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0),
(35, 24, 'm', 2, 2, 2, 2, 4, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(35, 24, 'm', 3, 3, 3, 3, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(35, 24, 'm', 12, 2, 2, 1, 5, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(35, 24, 'm', 15, 2, 4, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(35, 24, 'm', 19, 4, 2, 2, 4, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0),
(36, 24, 'm', 2, 1, 3, 4, 2, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(36, 24, 'm', 6, 1, 4, 4, 4, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(36, 24, 'm', 7, 1, 4, 4, 4, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(36, 24, 'm', 8, 1, 4, 4, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(36, 24, 'm', 18, 1, 3, 4, 3, 5, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(37, 26, 'w', 5, 3, 2, 1, 5, 1, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(37, 26, 'w', 8, 1, 5, 4, 2, 3, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(37, 26, 'w', 12, 3, 2, 4, 5, 2, 5, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(37, 26, 'w', 13, 1, 5, 4, 3, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(37, 26, 'w', 19, 4, 3, 3, 5, 1, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(38, 23, '', 7, 1, 3, 4, 2, 5, 5, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(38, 23, '', 14, 1, 4, 5, 2, 4, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(39, 23, 'w', 2, 1, 1, 1, 5, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, 23, 'w', 10, 1, 5, 4, 1, 5, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(39, 23, 'w', 12, 5, 1, 1, 4, 3, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(39, 23, 'w', 14, 1, 5, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0),
(39, 23, 'w', 17, 1, 1, 1, 5, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(40, 23, 'm', 2, 1, 4, 3, 2, 4, 4, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(41, 25, 'm', 11, 1, 5, 4, 2, 5, 5, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0),
(41, 25, 'm', 16, 3, 3, 2, 5, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(123, 22, 'w', 11, 1, 4, 4, 2, 4, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `recipe`
--

CREATE TABLE IF NOT EXISTS `recipe` (
  `cocktailid` int(11) NOT NULL,
  `ingredientid` int(11) NOT NULL,
  `amount` double NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`cocktailid`,`ingredientid`,`order`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `recipe`
--

INSERT INTO `recipe` (`cocktailid`, `ingredientid`, `amount`, `order`) VALUES
(1, 1, 0.2, 0),
(1, 5, 0.2, 0),
(1, 7, 0.6, 0),
(2, 3, 0.6, 0),
(2, 5, 0.2, 0),
(2, 8, 0.2, 0),
(3, 3, 0.4, 0),
(3, 5, 0.2, 0),
(3, 7, 0.4, 0),
(4, 2, 0.2, 0),
(4, 3, 0.2, 0),
(4, 6, 0.2, 0),
(4, 7, 0.2, 0),
(4, 8, 0.2, 0),
(5, 4, 0.2, 0),
(5, 5, 0.4, 0),
(5, 8, 0.4, 0),
(6, 2, 0.2, 0),
(6, 3, 0.4, 0),
(6, 5, 0.2, 0),
(6, 7, 0.2, 0),
(7, 3, 0.2, 0),
(7, 4, 0.2, 0),
(7, 5, 0.2, 0),
(7, 7, 0.4, 0),
(8, 1, 0.8, 0),
(8, 8, 0.2, 0),
(9, 2, 0.4, 0),
(9, 4, 0.2, 0),
(9, 5, 0.2, 0),
(9, 8, 0.2, 0),
(10, 3, 0.8, 0),
(10, 5, 0.2, 0),
(11, 2, 0.15, 0),
(11, 3, 0.55, 0),
(11, 5, 0.15, 0),
(11, 8, 0.15, 0),
(12, 3, 0.6, 0),
(12, 6, 0.4, 0),
(13, 3, 0.6, 0),
(13, 5, 0.2, 0),
(13, 8, 0.2, 0),
(14, 1, 0.2, 0),
(14, 2, 0.3, 0),
(14, 4, 0.2, 0),
(14, 8, 0.3, 0),
(15, 1, 0.2, 0),
(15, 2, 0.2, 0),
(15, 3, 0.2, 0),
(15, 7, 0.4, 0),
(16, 1, 0.6, 0),
(16, 7, 0.4, 0),
(17, 3, 0.6, 0),
(17, 7, 0.4, 0),
(18, 4, 0.4, 0),
(18, 8, 0.6, 0),
(19, 3, 0.6, 0),
(19, 8, 0.4, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `cocktailid` int(11) NOT NULL,
  `tag` varchar(100) NOT NULL,
  PRIMARY KEY (`cocktailid`,`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
