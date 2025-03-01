-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 01, 2025 at 02:22 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasktracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
CREATE TABLE IF NOT EXISTS `attachments` (
  `attachmentId` int NOT NULL AUTO_INCREMENT,
  `taskId` int NOT NULL,
  `fileUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploadedBy` int NOT NULL,
  `uploaded_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_At` datetime(3) NOT NULL,
  PRIMARY KEY (`attachmentId`),
  KEY `taskId` (`taskId`),
  KEY `uploadedBy` (`uploadedBy`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`attachmentId`, `taskId`, `fileUrl`, `uploadedBy`, `uploaded_At`, `updated_At`) VALUES
(1, 1, 'http://googledrive.com/iisjhwgvahsjw/req.docx', 7, '2025-01-25 06:30:44.473', '2025-01-25 06:30:44.473');

-- --------------------------------------------------------

--
-- Table structure for table `blacklisted_tokens`
--

DROP TABLE IF EXISTS `blacklisted_tokens`;
CREATE TABLE IF NOT EXISTS `blacklisted_tokens` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `expiry_time` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blacklisted_tokens_token_key` (`token`),
  KEY `blacklisted_tokens_token_idx` (`token`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blacklisted_tokens`
--

INSERT INTO `blacklisted_tokens` (`id`, `token`, `createdAt`, `expiry_time`) VALUES
('e1864594-b533-47d3-9e36-4e2e8459543b', '9c01c8e0175e181a1ad797183801ed9c934c40e09fccff325392e98e2253c667', '2025-01-27 09:49:14.733', '2025-01-27 10:46:52.000'),
('6d055c9d-49cc-4ee5-8884-64c2ea516fe5', '5b630a3df530569930af921067eaf05f254ef52caf7d0cf70f5d558d4954398b', '2025-01-27 09:46:04.065', '2025-01-27 10:04:38.000');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `taskId` int NOT NULL,
  `userId` int NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_At` datetime(3) NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `comments_taskId_idx` (`taskId`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentId`, `taskId`, `userId`, `content`, `created_At`, `updated_At`) VALUES
(1, 1, 5, 'Hello guys! had you understood the requirement', '2025-01-24 13:56:05.587', '2025-01-24 14:36:50.023'),
(2, 1, 7, 'No i had a quite confusion in the requirement!', '2025-01-24 15:07:48.496', '2025-01-24 15:07:48.496'),
(3, 1, 5, 'Yes Rohith! what\'s your Doubt,please elaborate it', '2025-01-24 15:14:29.176', '2025-01-24 15:14:29.176'),
(4, 1, 7, 'I am facing issues in figma while designing the UI.It\'s restricting access ,due to subscription', '2025-01-24 15:44:11.922', '2025-01-24 15:46:24.766'),
(5, 1, 5, 'Yes, i will get in touch with Jack,So in a meanwhile,Give a LLD of E-fruits by tommorow', '2025-01-25 14:16:05.929', '2025-01-25 14:16:05.929'),
(6, 1, 5, 'Hey Rohith,i saw your Attachment file,which issue you were facing,i will rectify it', '2025-01-25 14:28:33.860', '2025-01-25 14:28:33.860');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ownerId` int NOT NULL,
  `created_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_At` datetime(3) NOT NULL,
  `Pid` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Pid`),
  KEY `projects_name_idx` (`name`),
  KEY `projects_ownerId_fkey` (`ownerId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`name`, `description`, `ownerId`, `created_At`, `updated_At`, `Pid`) VALUES
('EFruits', 'prepare an Online fruit cart,requirement will be shared soon', 9, '2025-01-21 10:35:28.384', '2025-01-21 10:35:28.384', 1),
('DentalWebsite', 'A dental clinic website for new place,should  finish within 1 sprint meeting', 9, '2025-01-21 10:39:34.594', '2025-01-21 10:39:34.594', 2),
('HR Portal', 'An HR Software Proect', 9, '2025-01-24 10:12:33.309', '2025-01-24 10:12:33.309', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `Tid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` datetime(3) NOT NULL,
  `status` enum('open','Inprogress','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `assignedTo` int DEFAULT NULL,
  `projectId` int NOT NULL,
  `created_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_At` datetime(3) NOT NULL,
  PRIMARY KEY (`Tid`),
  KEY `tasks_assignedTo_fkey` (`assignedTo`),
  KEY `tasks_projectId_fkey` (`projectId`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`Tid`, `title`, `description`, `due_date`, `status`, `assignedTo`, `projectId`, `created_At`, `updated_At`) VALUES
(1, 'UI design', 'make the UI design for the E fruits website using figma,requirements will be shared through link in attachment', '2025-02-03 00:00:00.000', 'Inprogress', 7, 1, '2025-01-22 10:31:04.642', '2025-01-23 11:39:25.203'),
(2, 'Low Level Design', 'prepare the class and entities for the given project and link properly', '2025-02-24 00:00:00.000', 'open', 7, 1, '2025-01-22 10:41:58.210', '2025-01-22 12:06:51.791'),
(4, 'Schema Design', 'Do the Schema Design and ER Diagram for the project', '2025-02-12 12:04:59.444', 'open', 4, 1, '2025-01-22 12:04:59.444', '2025-01-23 12:22:53.983'),
(5, 'HLD on E fruits', '**Task Title:** High-Level Design (HLD) for E-Fruits Application\n\n**Objective:** Create a comprehensive High-Level Design (HLD) document for the E-Fruits application, which is aimed at provid', '2025-02-28 00:00:00.000', 'open', 8, 1, '2025-01-26 09:38:48.556', '2025-01-26 09:38:48.556'),
(6, 'Make an UI for dental Project', '### Task Title: Create User Interface (UI) for Dental Project\n\n#### Task Objective:\nTo design and develop an intuitive and user-friendly User Interface (UI) for the Dental Project, ensuring i', '2025-02-02 00:00:00.000', 'open', 6, 2, '2025-01-27 06:01:40.104', '2025-01-27 06:01:40.104'),
(7, 'get domain for dental clinic', '**Task Title:** Acquire Domain Name for Dental Clinic\n\n**Task Objective:**\nTo secure a unique, memorable, and relevant domain name for the new dental clinic to establish an online presence an', '2025-02-02 00:00:00.000', 'open', 11, 2, '2025-01-27 06:07:04.303', '2025-01-27 06:07:04.303');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE IF NOT EXISTS `teams` (
  `teamId` int NOT NULL AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `Team_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_At` datetime(3) NOT NULL,
  PRIMARY KEY (`teamId`),
  KEY `teams_Team_name_idx` (`Team_name`),
  KEY `teams_projectId_fkey` (`projectId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `projectId`, `Team_name`, `created_At`, `updated_At`) VALUES
(1, 1, 'Fullstack Team', '2025-01-22 00:35:27.628', '2025-01-22 00:35:27.628'),
(2, 2, 'CMS Team', '2025-01-22 00:38:16.641', '2025-01-22 00:38:16.641'),
(3, 4, 'Backend and Deployment Team', '2025-01-22 00:42:16.914', '2025-01-22 00:42:16.914');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
CREATE TABLE IF NOT EXISTS `team_members` (
  `teamMemberId` int NOT NULL AUTO_INCREMENT,
  `teamId` int NOT NULL,
  `userId` int NOT NULL,
  `role` enum('owner','member') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`teamMemberId`),
  KEY `team_members_teamId_fkey` (`teamId`),
  KEY `team_members_userId_fkey` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`teamMemberId`, `teamId`, `userId`, `role`) VALUES
(3, 1, 5, 'owner'),
(4, 1, 4, 'member'),
(5, 1, 7, 'member'),
(6, 1, 8, 'member'),
(7, 2, 6, 'member'),
(8, 2, 13, 'owner'),
(9, 2, 11, 'member'),
(10, 2, 10, 'member');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation_role` enum('sde','project_manager','technical_lead') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sde',
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_At` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_email_idx` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `designation_role`, `phone`, `company_name`, `is_active`, `created_At`, `updated_At`) VALUES
(2, 'testuser', 'test@gmail.com', '$2a$12$5nvEuYD9wZxW6HpAZvLDtu15Y5yE38jerHSTD8wn0I6CilpVThw7.', 'sde', NULL, NULL, 1, '2025-01-20 09:10:38.278', '2025-01-20 09:10:38.278'),
(3, 'demoUser', 'demo@gmail.com', '$2a$12$Y543v8s7aFV8ods6Ei5MlO0Ug5SoOAAVPvFbZaCkgK1n48gs8KDBK', 'technical_lead', '8090778171', 'NTT Data', 0, '2025-01-20 09:19:35.703', '2025-01-20 09:19:35.703'),
(4, 'Naresh rao', 'naresh@gmail.com', '$2a$12$TZ/cE8SxMQVM2BZsZ1xQmuvSyAl/vguRQFv2kqEqa1vUCCUC90uIO', 'sde', NULL, 'Strivers Pvt ltd', 1, '2025-01-20 13:56:36.896', '2025-01-20 13:56:36.896'),
(5, 'Ganesh Reddy', 'reddy@gmail.com', '$2a$12$xh4BnXkfZcUzE90TIkm3Ve64L4rEQrmXMfiAaW44k1c9/v14WrTPO', 'technical_lead', NULL, NULL, 1, '2025-01-20 14:35:42.245', '2025-01-20 14:35:42.245'),
(6, 'Zubah Khan', 'zubah@gmail.com', '$2a$12$HWz8XUmmpVRs9rgAJcQS1eb/swBFdGSsiUdkU5sdN4EcjP77bg0WS', 'sde', NULL, NULL, 1, '2025-01-20 14:42:12.603', '2025-01-20 14:42:12.603'),
(7, 'Rohith Murthy', 'murthy@gmail.com', '$2a$12$Vbf64PZh3IuVgca2Jb3smeavsgHxANSfuWRNs4u4RGAh8DVIf04ra', 'sde', NULL, NULL, 1, '2025-01-20 14:51:55.752', '2025-01-20 14:51:55.752'),
(8, 'Shivram', 'shiv.231@gmail.com', '$2a$12$QJREMRVRUzdeeCD3A/G/MeVWVwqcnh7qYhQgwyGOylhW0duWF1H3W', 'sde', NULL, NULL, 1, '2025-01-20 14:54:31.041', '2025-01-20 14:54:31.041'),
(9, 'Jackie sonu', 'Jack.boss@gmail.com', '$2a$12$DqYddGyjSDFqyMjWhZEQ/ef.6wPq6tWsjpgJIhr9ahmhWvfIRMtRm', 'project_manager', NULL, NULL, 1, '2025-01-20 15:55:41.979', '2025-01-20 15:55:41.979'),
(10, 'Meenakshi gowda', 'meen.981@gmail.com', '$2a$12$kjP9ZitlM2nTi38KyZY5hOiWtrYZt2aci.eOzNVI1dvCU6pcuV/UG', 'sde', NULL, NULL, 1, '2025-01-23 12:40:11.545', '2025-01-23 12:40:11.545'),
(11, 'Stan pierera', 'stan.rock@gmail.com', '$2a$12$6iTahlBgmA2./TeOjBKgoO3BRns3BHDNzrfZWQuPlSOiA4di0RMyq', 'sde', NULL, NULL, 1, '2025-01-23 12:42:58.498', '2025-01-23 12:42:58.498'),
(12, 'Surana Mehta', 'suran.mehta@gmail.com', '$2a$12$pOmxOedcHit8jpQDQyNYF.HRVAyld1ojGt6SVzp2citgJDnk0lXri', 'sde', NULL, NULL, 1, '2025-01-23 12:45:15.707', '2025-01-23 12:45:15.707'),
(13, 'Pavan kumar', 'pavan.345@gmail.com', '$2a$12$VbjphiZACzkxqN8D.KS3FuCUdU4M5vwTLoeTU2lnTJ50kAmCWlb5W', 'technical_lead', NULL, NULL, 1, '2025-01-24 07:10:58.568', '2025-01-24 07:10:58.568');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('5b5ffa77-c62e-4d30-9c48-e0ccd2197d2a', '68bed9ff268f01ff75c4c660260676dd00ed4a6eb323c93007e0f44661e9150d', '2025-01-20 07:00:46.031', '20250120070046_create_users_table', NULL, NULL, '2025-01-20 07:00:46.016', 1),
('36436268-4009-4d36-8eed-8af05425b371', '9e073a8631258b5948727e66de1fee673fb0de41cf84af940774a81ae382f5ca', '2025-01-21 05:33:24.689', '20250121053324_create_project_table', NULL, NULL, '2025-01-21 05:33:24.566', 1),
('b8394074-331c-4c79-91a7-5410bc57560f', '47eda72a5ac4292f4ee5c4cb91fee1627ddd575e6c1277a826cf405567f6dfed', '2025-01-21 05:44:28.530', '20250121054428_add_user_projects_relation', NULL, NULL, '2025-01-21 05:44:28.419', 1),
('6f69ef93-9f10-44df-9ce0-eb4085dbecee', 'dce4d6219270e3f8341ddc9a62d49d3a67f03e7a76bbaf280ba9b227838b0b61', '2025-01-21 06:06:58.793', '20250121060658_update_project_table', NULL, NULL, '2025-01-21 06:06:58.653', 1),
('048fcd1a-7d43-42f0-ab42-cfbf51424fd6', 'a264c3951a45008421666121e3f8e667c7b1327d6f4f9873cc276f50824f4638', '2025-01-21 06:46:16.580', '20250121064616_create_task_table', NULL, NULL, '2025-01-21 06:46:16.464', 1),
('7e25d61f-e186-498f-ad47-f7fcc0e2363e', '898fcd7beb7030a66b8f05f87e93814a4f46a140b37783e7bce910bd4b622e9f', '2025-01-21 07:21:46.382', '20250121072146_add_user_project_tasks_relation', NULL, NULL, '2025-01-21 07:21:46.245', 1),
('0a912b0a-167a-41e5-871b-450923653222', 'e3a22e8d4f056e5d429d5cccd7ebc83e53ed3a7661a5a767d1541ef675c04364', '2025-01-21 13:40:54.936', '20250121134054_create_team_table', NULL, NULL, '2025-01-21 13:40:54.645', 1),
('e25efad1-25c6-4a06-855c-01e4b07aa3d9', '3e656961441f57f551e2aface771769dc98568d9bb728fb0497887f4f9d57b26', '2025-01-21 14:11:47.976', '20250121141147_update_relations', NULL, NULL, '2025-01-21 14:11:47.350', 1),
('f8476b2e-3d92-472b-a19f-f2c50896417d', '8076cadf4d095e189383ffae48eae2a7cca17420815c29239ae37b41c4dc2025', '2025-01-23 01:22:46.644', '20250123012245_add_blacklisted_tokens', NULL, NULL, '2025-01-23 01:22:45.860', 1),
('94701dae-0516-4625-9b37-e02013e5fa99', 'f36da23bbf4423dad69ff41cf2bb45e20b3266ac1db354fdba7b81169d4d2751', '2025-01-23 01:30:51.590', '20250123013050_add_blacklisted_tokens', NULL, NULL, '2025-01-23 01:30:50.796', 1),
('f64e8ecd-27cc-466c-9d39-e3e5b03eeb65', '331f99a5ca0866fad6c39c951407be66367d55ae2f95877b081210ab4f6f5ca3', '2025-01-23 03:51:51.616', '20250123035150_update_blacklisted_tokens', NULL, NULL, '2025-01-23 03:51:51.002', 1),
('12fc5d6d-6745-4560-88bf-9f61930bdde7', 'd60c132d07141ff6e69c66108dc0680d8ea7917d0b922407ffcf607da982e5e7', '2025-01-23 06:08:21.654', '20250123060820_update_blacklisted_tokens', NULL, NULL, '2025-01-23 06:08:20.880', 1),
('0dfdf638-623e-49b0-b5d4-d3fe76335815', 'd6e2a5c5d4767c90e71c67b7ef4a64ced867b429a8ccd3e26db732d7c05f8e62', '2025-01-23 12:04:47.587', '20250123120446_update_tasks_table', NULL, NULL, '2025-01-23 12:04:46.713', 1),
('ed2d1c6b-8628-4ffd-b90f-bb66019d7340', '47ef00d683ac39e9766f63e810285c1c97f5bf60bcaa1440c8a3999bdd9f42a9', '2025-01-23 14:08:10.690', '20250123140810_create_comment_table', NULL, NULL, '2025-01-23 14:08:10.302', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
