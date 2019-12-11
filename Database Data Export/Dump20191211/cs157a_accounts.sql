-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cs157a
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `username` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('aaronsmith','aaron.smtih@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('as','testing@gmail.com','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('bones','bones@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('data','data@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('dudeman','dudeman@sjsu.edu','sha1$86217096$1$0325a4ea87b747e3cc6e72e65d93333cbab31dde'),('jadzia','jadzia@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('jimkirk','mrkirk@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('picard','picard@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('redshirt','redshirt@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('spock','spock@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('test','test@gmail.com','sha1$adaf2950$1$62881f895aa40380e4dd3bcbce3811af340d9e22'),('test1','test1@email.com','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('test12','test12@gmail.com','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('test123','test123@gmail.c','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('testing','something@gmail.com','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('testingagain','testingagain@gmail.com','sha1$3a78a2e3$1$3dc4dd6cdb322557576d869d74621d495d5947e9'),('uhura','uhura@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717'),('user','hello@gmail.com','sha1$f375fa63$1$4d4adcc68850773fcc3c329db695688ef749b772'),('user1','test45@gmail.com','sha1$642d83bc$1$672aecad390158fea0bdf709f1540f86a43ca34b'),('worf','worf@sjsu.edu','sha1$de40904e$1$60ff5e2ef6e581ef63ea1419de7e6e9475217717');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-11 10:32:59
