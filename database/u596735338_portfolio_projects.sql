-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2021 at 02:45 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u596735338_portfolio_projects`
--

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
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_type`, `project_year`, `project_slug`) VALUES
(0, 'Amae', 'UX / UI', '2020', 'amae'),
(1, 'Cyberview', '2D Game', '2019', 'cyberview'),
(2, 'Rising Waters', 'VR Game', '2019', 'rising_waters'),
(3, 'Chromakey & Color Matching', 'Java App', '2020', 'chromakey_and_color_matching'),
(4, 'Harbingers Of Death', 'Website (Full-Stack)', '2020', 'harbingers_of_death'),
(5, 'Future Earth', 'VR Game', '2020', 'future_earth'),
(6, 'Understanding Climate Change', 'Website (Front-End)', '2020', 'understanding_climate_change'),
(7, 'Pavilions', 'Spatial Design', '2019', 'pavilions'),
(8, 'Portfolio (v2)', 'Website (Full-Stack)', '2020', 'portfolio'),
(9, 'Achieve your goals', 'Android App', '2018', 'achieve_your_goals');

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
(2, 4),
(2, 6),
(2, 10),
(3, 0),
(3, 7),
(4, 8),
(4, 9);

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
(2, 8),
(2, 9),
(2, 10),
(2, 0),
(3, 0),
(3, 11),
(4, 0),
(4, 12);

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
(12, 'Samuel', 'Barnett');

--
-- Constraints for dumped tables
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
