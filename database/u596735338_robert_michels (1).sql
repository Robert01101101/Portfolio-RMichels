-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 27, 2021 at 03:39 PM
-- Server version: 10.4.14-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u596735338_robert_michels`
--

-- --------------------------------------------------------

--
-- Table structure for table `aspect`
--

DROP TABLE IF EXISTS `aspect`;
CREATE TABLE IF NOT EXISTS `aspect` (
  `term_id` int(10) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `aspect`
--

INSERT INTO `aspect` (`term_id`, `slug`, `title`) VALUES
(0, 'domestic-life', 'Domestic Life'),
(1, 'vitality', 'Vitality'),
(2, 'industry', 'Industry'),
(3, 'religion', 'Religion'),
(4, 'death', 'Death');

-- --------------------------------------------------------

--
-- Table structure for table `death`
--

DROP TABLE IF EXISTS `death`;
CREATE TABLE IF NOT EXISTS `death` (
  `term_id` int(10) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `death`
--

INSERT INTO `death` (`term_id`, `slug`, `title`) VALUES
(0, 'close-friend', 'Close Friend'),
(1, 'you', 'You'),
(2, 'community-member', 'Community Member'),
(3, 'family-member', 'Family Member');

-- --------------------------------------------------------

--
-- Table structure for table `fault`
--

DROP TABLE IF EXISTS `fault`;
CREATE TABLE IF NOT EXISTS `fault` (
  `term_id` int(10) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fault`
--

INSERT INTO `fault` (`term_id`, `slug`, `title`) VALUES
(0, 'you', 'You'),
(1, 'god', 'God'),
(2, 'the-public', 'The Public');

-- --------------------------------------------------------

--
-- Table structure for table `omen`
--

DROP TABLE IF EXISTS `omen`;
CREATE TABLE IF NOT EXISTS `omen` (
  `omen_id` int(10) NOT NULL AUTO_INCREMENT,
  `slug` varchar(50) NOT NULL,
  `title` varchar(512) NOT NULL,
  `statement` varchar(512) NOT NULL,
  `image_author` varchar(255) NOT NULL,
  `poem` varchar(512) NOT NULL,
  `poem_author` varchar(255) NOT NULL,
  `aspect_id` int(10) NOT NULL,
  `death_id` int(10) NOT NULL,
  `fault_id` int(10) NOT NULL,
  PRIMARY KEY (`omen_id`),
  KEY `fk_omen_aspect_id` (`aspect_id`),
  KEY `fk_omen_death_id` (`death_id`),
  KEY `fk_omen_fault_id` (`fault_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `omen`
--

INSERT INTO `omen` (`omen_id`, `slug`, `title`, `statement`, `image_author`, `poem`, `poem_author`, `aspect_id`, `death_id`, `fault_id`) VALUES
(1, 'cracked-bread', 'Have you baked bread, that has cracks upon its top?', 'You have baked bread, that has cracks upon its top.', 'Boy with a Basket of Bread, Evaristo Baschenis', 'morning blue sky--- / a bakery runs out / of croissants', 'Fred Masarani (2011)', 0, 0, 0),
(2, 'ringing-ears', 'Is there a ringing in your ears?', 'There is a ringing in your ear.', 'Gossip, 1055', 'he rings in my ears / and gets louder when I try / to bury our love', 'Shanna Moore', 1, 1, 0),
(3, 'lighted-carptenters-shop', 'Has a light suddenly and unaccountably been seen in a carpenter’s shop?', 'A light has suddenly and unaccountably been seen in a carpenter’s shop.', 'Rainy Night in the Old Quarter, Michael Handt', 'weight that shifts / with the news of a death / storm light', 'Lynne Rees (2017)', 2, 2, 2),
(4, 'umbrella', 'Have you opened an umbrella in your house?', 'You have opened an umbrella in your house.', 'The Chancellor Seguier, Charles Le Brun', 'my umbrella / flipped in the wind– / uncertain days', 'Adelaide Shaw (2014)', 0, 2, 0),
(5, 'bell-ringing', 'Has a bell rung of its own accord?', 'A bell has been rung of its own accord.', 'David playing bells. The Hague', 'she bows lower / than all the others— / temple bell', 'Sondra Byrnes (2016)', 3, 2, 1),
(6, 'funeral-procession', 'Did anyone arrive at the funeral, after the procession had begun?', 'Someone arrived at the funeral after the procession had begun.', 'Entierro del conde de orgaz, El Greco', 'headlights— /a possum crouches / by the roadside', 'Cynthia Rowe (2020)', 4, 2, 2),
(7, 'hair-pin', 'Has a hairpin fallen from your hair?', 'A hairpin has fallen from your hair.', 'Judith and Her Maidservant, Artemisia Gentileschi', 'rivulets of red / running down her pale young face / she clutches a doll', 'Armando Corneille (2011)', 0, 1, 0),
(8, 'sunday-corpse', 'Did you keep a corpse in the house over Sunday?', 'You kept a corpse in the house over Sunday.', 'The Three Ages of Man and Death, Hans Baldung\n(1541–1544)', 'darkening skies -- / the final hours / of the weekend', 'Paul David Mena (2013)', 4, 3, 0),
(9, 'looking-glass', 'Have you broken a looking-glass?', 'You have broken a looking-glass.', 'Portrait of cardinal Fernando Niño de Guevara, El Greco', 'a discolored wall / where the mirror / used to be', 'Paul David Mena (2019)', 0, 3, 0),
(10, 'gaping-scissors ', 'Have scissors been left gaping on a table?', 'Scissors have been left gaping on a table.', 'Miniature of Delilah cutting Samson\'s hair, 1445', 'cutting up red pepper / for the salad--- / a drop of blood', 'Fred Masarani (2007)', 0, 3, 2),
(11, 'dish-cloth', 'Has a dish-cloth been hung on a door-knob?', 'A dish-cloth has been hung on a door-knob.', 'Attesa IV, Michelle Arnold Paine', 'doing the dishes - / a tiny soap bubble rises / toward heaven', 'Gabi Greve (2006)', 0, 3, 2),
(12, 'house-hoe', 'Have you carried a hoe through your house?', 'You have carried a hoe through your house.', 'Gardeners at wrok, Abel Grimmer', 'spring blossoms ... / the old farmer / coughs blood', 'Gabi Greve (2009)', 2, 2, 0),
(13, 'breakfast-sneeze', 'Have you sneezed before breakfast on Sunday morning?', 'You have sneezed before breakfast on Sunday morning.', 'The Lunch, Diego Velázquez (1599-1660)', 'spring morning / one egg left / in the fridge', 'An Mayou (2016)', 1, 0, 0),
(14, 'lying-on-table', 'Have you laid down upon on a table?', 'You have laid down upon on a table.', 'Merry Company on a Terrace', 'morning sun / the crumbs on the table / have a shadow', 'André Duhaim (2001)', 0, 1, 0),
(15, 'singing-and-eating', 'Has there been singing at the table while your family is eating?', 'There has been singing at the table while your family was eating.', 'As the Old Sing, So Pipe the Young, Jan Steen', 'geriatric ward-- / the table groans / when they fold it up', 'Earl Keener (2004)', 0, 0, 2),
(16, 'three-raps', 'Have three raps been heard?', 'Three raps have been heard.', 'Le Pape Formose et Etienne VII, Jean Paul Laurens (1870)', 'insomnia / the rat trap / snapping shut', 'Cudd Cwmwl (2017)', 0, 3, 1),
(17, 'candle-coffin', 'Have you seen a coffin in a candle?', 'You have seen a coffin in a candle.', 'Burial, Antoine Wiertz', 'candle drippings / on the epitaph- / a broken word', 'Alegria Imperial (2012)', 0, 2, 1),
(18, 'unmolested-window-shades', 'Have window-shades fallen without being molested?', 'Window-shades have fallen without being molested.', 'The Calling of Saint Matthew-Caravaggo (1599-1600)', 'her empty nursery ... / a sudden breeze lifts / the floral curtains', 'Cynthia Rowe (2019)', 0, 2, 1),
(19, 'out-of-season-bloom', 'Have you seen a flower bloom out season?', 'You have seen a flower bloom out season.', 'Four Seasons in One Head, Giuseppe Arcimboldo', 'long illness – / pink dogwood blooming / without me', 'Debbi Antebi (2020)', 1, 2, 1),
(20, 'sparks-in-ashes', 'Were sparks unintentionally left in the ashes over night?', 'Sparks were unintentionally left in the ashes over night.', 'Trial by Fire, Fra Angelico', 'wild fires / in the mist / the ashes', 'Cindy Tebo (2003)', 0, 3, 2),
(21, 'motionless-clock', 'Has a long motionless clock suddenly begun to tick?', 'A long motionless clock suddenly began to tick.', 'Medieval clock with wheel-work and dials in book from c. 1450', 'lone guest gone – / the ticking / of the parlor clock', 'Brian Austin Darnell (2016)', 0, 3, 1),
(22, 'bonnet', 'Have you tied on a bonnet?', 'You tied on a bonnet.', 'Portrait of a Woman, Van der Weyden', 'first date -- / wondering if the hat / is too much', 'Carol Raisfeld (2016)', 0, 0, 0),
(23, 'sick-person-dress', 'Have you worked on a sick person\'s dress?', 'You worked on a sick person\'s dress.', 'Flemish School, circa 1630', 'dusk- / an unfinished sweater / on the rocking chair', 'Betty Kaplan (2011)', 2, 1, 0),
(24, 'ground-dance', 'Have you danced on the ground?', 'You danced on the ground.', 'Death and the miser. Frans II van Francken', 'heat lightning— / the first drop of sweat / on her chin', 'John Wisdom (2019)', 0, 1, 0),
(25, 'stuck-shears', 'During sickness, have you dropped shears that have stuck into the ground?', 'During sickness, you dropped shears that have stuck into the ground.', 'Delilah shearing Samson by Granger', 'social distancing / our new neighbour / sharpens the scythe', 'Eva Limbach (2020)', 1, 1, 0),
(26, 'looking-glass-corpse', 'Have you looked into a looking-glass while a corpse is in your house?', 'You looked into a looking-glass while a corpse is in your house.', 'The Arnolfini Wedding Portrait, Jan Van Eyck', 'bathroom mirror / always a stranger / in my place', 'Isabel Caves (2019)', 4, 1, 0),
(27, 'rain-open-grave', 'Did rain fall into an open grave?', 'Rain fell into an open grave.', 'The Rain, Claude Monet', 'winter rain / the sheets where she slept / grow colder', 'Darrell Byrd (2010)', 4, 2, 1),
(28, 'pass-through-funeral', 'Did you pass through a funeral procession?', 'You passed through a funeral procession.', 'A Jewish Funeral, Hein Burgers (1860–1899)', 'plastic bags / trapped on barbed wire / roadside cross', 'Sharon Rhutaseljones (2019)', 4, 1, 0),
(29, 'road-corpse', 'Has a corpse passed over the same road twice?', 'A corpse passed over the same road twice.', 'The Triumph of Death, Pieter Bruegel the Elder', 'year\'s end / there\'s a hearse / in the fast lane', 'Mark Holloway (2015)', 4, 2, 2),
(30, 'open-eyed-corpse', 'Have the eyes of a corpse opened of their own accord?', 'The eyes of a corpse opened of their own accord.', 'The Body of the Dead Christ in the Tomb, Hans Holbein (1520-22)', 'near the wall / of the cemetery / a condom', 'Geert Verbeke (2004)', 4, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(10) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_type` varchar(255) NOT NULL,
  `project_year` varchar(255) NOT NULL,
  `project_slug` varchar(255) NOT NULL,
  `project_indevelopment` bit(1) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_type`, `project_year`, `project_slug`, `project_indevelopment`) VALUES
(0, 'Amae', 'UX / UI', '2020', 'amae', b'0'),
(1, 'Cyberview', '2D Game', '2019', 'cyberview', b'0'),
(2, 'Harbingers Of Death', 'Website (Full-Stack)', '2020', 'harbingersOfDeath', b'0'),
(3, 'Future Earth', 'VR Game', '2020', 'futureEarth', b'0'),
(4, 'Understanding Climate Change', 'Website (Front-End)', '2020', 'understandingClimateChange', b'0'),
(5, 'Portfolio Website', 'Website (Full-Stack)', '2020', 'portfolio', b'1'),
(6, 'Chromakey & Color Matching', 'Java App', '2020', 'chromakeyAndColorMatching', b'1'),
(7, 'Pavilions', 'Spatial Design', '2019', 'pavilions', b'1'),
(8, 'Rising Waters', 'VR Game', '2019', 'risingWaters', b'1'),
(9, 'Achieve your goals', 'Android App', '2018', 'achieveYourGoals', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `project_roles`
--

DROP TABLE IF EXISTS `project_roles`;
CREATE TABLE IF NOT EXISTS `project_roles` (
  `project_id` int(10) NOT NULL,
  `role_id` int(10) NOT NULL,
  KEY `fk_project_roles_project_id` (`project_id`),
  KEY `fk_project_roles_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_roles`
--

INSERT INTO `project_roles` (`project_id`, `role_id`) VALUES
(0, 0),
(0, 1),
(1, 0),
(1, 4),
(8, 4),
(8, 6),
(8, 10),
(6, 0),
(6, 7),
(2, 8),
(2, 9),
(3, 0),
(3, 4),
(3, 10),
(4, 8),
(4, 0),
(4, 11),
(7, 1),
(7, 13),
(5, 1),
(5, 8),
(5, 9),
(5, 12),
(5, 6),
(9, 1),
(9, 14);

-- --------------------------------------------------------

--
-- Table structure for table `project_teammembers`
--

DROP TABLE IF EXISTS `project_teammembers`;
CREATE TABLE IF NOT EXISTS `project_teammembers` (
  `project_id` int(10) NOT NULL,
  `teammember_id` int(10) NOT NULL,
  KEY `fk_project_teammembers_project_id` (`project_id`),
  KEY `fk_project_teammembers_teammember_id` (`teammember_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_teammembers`
--

INSERT INTO `project_teammembers` (`project_id`, `teammember_id`) VALUES
(0, 0),
(0, 1),
(0, 2),
(0, 3),
(0, 4),
(1, 5),
(1, 6),
(1, 0),
(1, 7),
(8, 8),
(8, 9),
(8, 10),
(8, 0),
(6, 0),
(6, 11),
(2, 0),
(2, 12),
(3, 0),
(3, 13),
(3, 14),
(3, 15),
(4, 0),
(4, 16);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(10) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_slug` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `role_slug`) VALUES
(0, 'Project Manager', 'pm'),
(1, 'UX / UI / Ix Designer', 'design'),
(4, 'Game Designer & Developer', 'game'),
(6, '3D Modeller', '3d-model'),
(7, 'Java Developer', 'java-dev'),
(8, 'Front-End Developer', 'front-end'),
(9, 'Back-End Developer', 'back-end'),
(10, 'VR Designer & Developer', 'vr'),
(11, 'D3.js Developer', 'd3js'),
(12, 'Three.js Developer', 'threejs'),
(13, 'CAD Designer', 'cad'),
(14, 'Android Developer', 'android');

-- --------------------------------------------------------

--
-- Table structure for table `teammember`
--

DROP TABLE IF EXISTS `teammember`;
CREATE TABLE IF NOT EXISTS `teammember` (
  `teammember_id` int(10) NOT NULL,
  `teammember_fname` varchar(255) NOT NULL,
  `teammember_lname` varchar(255) NOT NULL,
  PRIMARY KEY (`teammember_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teammember`
--

INSERT INTO `teammember` (`teammember_id`, `teammember_fname`, `teammember_lname`) VALUES
(0, 'Robert', 'Michels'),
(1, 'Kaitlyn', 'Andres'),
(2, 'Akshay', 'Chawla'),
(3, 'Dawood', 'Shafqat'),
(4, 'Aditya', 'Mawlankar'),
(5, 'Carter', 'Glass'),
(6, 'Chris', 'Louie'),
(7, 'Rebecca', 'Singh'),
(8, 'Ricky', 'Lalli'),
(9, 'Jonathan', 'Lee'),
(10, 'Elene', 'Wanner'),
(11, 'Bianca', 'Pricop'),
(12, 'Samuel', 'Barnett'),
(13, 'Kahn', 'Dinh'),
(14, 'Keefe', 'Liew'),
(15, 'Yashu Estela', 'Xu'),
(16, 'Radu', 'Orlandea');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `full_name` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `password`, `created_at`, `full_name`, `email_address`, `date_of_birth`, `image_path`) VALUES
(4, '51eac6b471a284d3341d8c0c63d0f1a286262a18', '2020-12-04 21:32:16', 'Robert Michels', 'fxkingz@live.com', '1970-01-01', 'testImage'),
(5, '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2020-12-04 08:42:03', 'Robert Michels', 'rmichels@sfu.ca', '1970-01-01', 'testImage'),
(6, '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2020-12-04 08:42:30', 'Robert Michels', 'rmichels@sfu.caa', '1970-01-01', 'testImage'),
(7, '95cb0bfd2977c761298d9624e4b4d4c72a39974a', '2020-12-04 18:16:46', 'u7tyu', 'ty7', '1970-01-01', 'testImage'),
(8, 'f3921183f998574d4fa9c95773fbac5d97e4c952', '2020-12-04 19:24:16', 'rwerfd', 'faserd', '1970-01-01', 'testImage'),
(9, '45a046fe292a8418495cc0daa7644fbd551425a7', '2021-02-02 01:15:31', 'Robert Michels', 'fersargrth', '1970-01-01', 'testImage'),
(10, '6250625b226df62870ae23af8d3fac0760d71588', '2021-02-02 01:15:51', 'TestName', 'TestEmail', '1970-01-01', 'testImage'),
(11, '87bf9ae135c3adc440a0fafa7bca5b01e67fd062', '2021-02-18 23:47:40', 'Test Name', 'erfgreg', '1970-01-01', 'testImage'),
(12, '8a47964ce25e959a2aaf6040251c09e3b56a5aba', '2021-02-18 23:52:32', 'Test Name', 'testemail@email.com', '1970-01-01', 'testImage');

-- --------------------------------------------------------

--
-- Table structure for table `user_omen`
--

DROP TABLE IF EXISTS `user_omen`;
CREATE TABLE IF NOT EXISTS `user_omen` (
  `user_id` int(10) NOT NULL,
  `omen_id` int(10) NOT NULL,
  KEY `fk_user_omen_user_id` (`user_id`),
  KEY `fk_user_omen_omen_id` (`omen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_omen`
--

INSERT INTO `user_omen` (`user_id`, `omen_id`) VALUES
(4, 17),
(4, 26),
(4, 13),
(10, 22),
(10, 12),
(10, 4),
(10, 30),
(10, 7),
(10, 20),
(10, 29),
(10, 15);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `omen`
--
ALTER TABLE `omen`
  ADD CONSTRAINT `fk_omen_aspect_id` FOREIGN KEY (`aspect_id`) REFERENCES `aspect` (`term_id`),
  ADD CONSTRAINT `fk_omen_death_id` FOREIGN KEY (`death_id`) REFERENCES `death` (`term_id`),
  ADD CONSTRAINT `fk_omen_fault_id` FOREIGN KEY (`fault_id`) REFERENCES `fault` (`term_id`);

--
-- Constraints for table `project_roles`
--
ALTER TABLE `project_roles`
  ADD CONSTRAINT `fk_project_roles_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `fk_project_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

--
-- Constraints for table `project_teammembers`
--
ALTER TABLE `project_teammembers`
  ADD CONSTRAINT `fk_project_teammembers_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `fk_project_teammembers_teammember_id` FOREIGN KEY (`teammember_id`) REFERENCES `teammember` (`teammember_id`);

--
-- Constraints for table `user_omen`
--
ALTER TABLE `user_omen`
  ADD CONSTRAINT `fk_user_omen_omen_id` FOREIGN KEY (`omen_id`) REFERENCES `omen` (`omen_id`),
  ADD CONSTRAINT `fk_user_omen_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
