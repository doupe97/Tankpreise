-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 11. Feb 2022 um 15:30
-- Server-Version: 10.4.21-MariaDB
-- PHP-Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `TankpreiseDB`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `favorite`
--

CREATE TABLE `favorite` (
  `fav_id` int(50) NOT NULL,
  `fav_user_id` int(50) NOT NULL,
  `fav_gs_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `favorite`
--

INSERT INTO `favorite` (`fav_id`, `fav_user_id`, `fav_gs_id`) VALUES
(78, 55, 'b3359dad-56f8-42d9-a257-f3a7d4205652'),
(79, 55, '3de25454-a313-435e-88b0-742daaeb8927'),
(80, 56, '3de25454-a313-435e-88b0-742daaeb8927'),
(82, 56, 'b3359dad-56f8-42d9-a257-f3a7d4205652'),
(83, 45, '3de25454-a313-435e-88b0-742daaeb8927'),
(84, 45, 'c37bb8dd-2b6a-4a79-b457-9895ac11a6ab'),
(88, 45, 'b8e3ed13-9f54-4140-9719-9992065b4563'),
(89, 45, '005056ba-7cb6-1ed2-bceb-861bfb458d30');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `session`
--

CREATE TABLE `session` (
  `session_id` int(50) NOT NULL,
  `session_key` varchar(200) NOT NULL,
  `session_user_id` int(50) NOT NULL,
  `session_start` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `session`
--

INSERT INTO `session` (`session_id`, `session_key`, `session_user_id`, `session_start`) VALUES
(165, '1.8ryj2spvft', 45, '2022-01-24 12:47:04'),
(166, '1.yhjzc3wish', 45, '2022-01-24 12:48:52'),
(172, '1.2e9mha6lr0f', 45, '2022-01-26 20:36:14'),
(175, '1.v6vrpctrii', 45, '2022-01-26 20:44:04'),
(179, '1.zvyaku9gn4', 45, '2022-01-27 18:02:56'),
(185, '1.ugwra8cxr2', 45, '2022-02-07 15:03:30'),
(186, '1.xptpap10vn', 45, '2022-02-07 15:12:42');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_id` int(50) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `user_password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`) VALUES
(45, 'nico', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e'),
(55, 'mii', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e'),
(56, 'tom', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae'),
(57, 'nico', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e'),
(58, 'nico', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`fav_id`);

--
-- Indizes für die Tabelle `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `favorite`
--
ALTER TABLE `favorite`
  MODIFY `fav_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT für Tabelle `session`
--
ALTER TABLE `session`
  MODIFY `session_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
