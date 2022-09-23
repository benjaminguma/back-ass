DROP DATABASE IF EXISTS `ourpass_demo_blog`;
CREATE DATABASE `ourpass_demo_blog`; 
USE `ourpass_demo_blog`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL auto_increment,
  `email` varchar(70) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date ,
  `updated_at` date ,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `user` (`u_id`,`email`,`password`,`created_at`,`updated_at`) VALUES (1,'1@gmail.com','$2b$10$sARqKmx67AbQ21PNTvnCpO.ISN6iHGTAamyr/9GE.n5MTC7Ar7tMG','2022-07-22 18:00:15.514495','2022-07-22 18:00:15.514495');
INSERT INTO `user` (`u_id`,`email`,`password`,`created_at`,`updated_at`) VALUES (2,'2@gmail.com','$2b$10$re7yUd5772BbImS5tUsNcOoChPLwbZKvVptNR9.BHGzl6R7p34a4K','2022-07-22 18:05:26.553228','2022-07-22 18:05:26.553228');
INSERT INTO `user` (`u_id`,`email`,`password`,`created_at`,`updated_at`) VALUES (3,'3@gmail.com','$2b$10$v.T71fuIwoYfJ.apquWjoeh0IzC2aBpTovd2WXp4t0NiWcGjcQ5fy','2022-07-22 18:05:35.817222','2022-07-22 18:05:35.817222');
INSERT INTO `user` (`u_id`,`email`,`password`,`created_at`,`updated_at`) VALUES (4,'4@gmail.com','$2b$10$gskYuT/wBdhDEATaBoFhYeFF8Jy4pSi96LK/e9qaTC9QedszOBwUy','2022-07-22 18:28:46.771124','2022-07-22 18:28:46.771124');
INSERT INTO `user` (`u_id`,`email`,`password`,`created_at`,`updated_at`) VALUES (5,'5@gmail.com','$2b$10$5jt3RkF1vpl541uqYQSaauk417MMYOJNypuxyGmx8yI/eue4u4ReC','2022-07-22 19:29:09.407326','2022-07-22 19:29:09.407326');



CREATE TABLE `post_category`(
 `c_id` int not null auto_increment,
`title` Text ,
  primary key (`c_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
INSERT INTO `post_category` (`c_id`,`title`) VALUES (1,'wisdom');
INSERT INTO `post_category` (`c_id`,`title`) VALUES (2,'romance');
INSERT INTO `post_category` (`c_id`,`title`) VALUES (3,'comedy');



CREATE TABLE `post`(
 `p_id` int not null auto_increment,
  `title` varchar(255),
  `content` Text ,
  `category` int not null,
  `owner` int not null,
  primary key (`p_id`),
  foreign key (`category`) references `post_category` (`c_id`) on delete restrict on update cascade,
  foreign key (`owner`) references `user` (`u_id`)on delete restrict on update cascade
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (3,'the good the bad and the ugly','this post is about comedy',3,3);
INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (4,'Dc comics','oopsiee',3,4);
INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (5,'Edd Edd eddy','let do cad little doo',3,1);
INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (6,'come with me','when love rhythms start to play',2,1);
INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (7,'Romeo and juli','I love the way I are',2,5);
INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (8,'this post is about wisdom','how can one be soo dangerous',1,1);
INSERT INTO `post` (`p_id`,`title`,`content`,`category`,`owner`) VALUES (9,'Hitler','the stronger must dominate and not mate with the weak which would signify the sacrifice of his own higher nature',1,5);










