# database client_referals
# ------------------------------------------------------------

CREATE DATABASE client_referals;


# table user
# ------------------------------------------------------------

CREATE TABLE client_referals.user (
    `id` bigint(20) NOT NULL AUTO_INCREMENT, 
    `name` varchar(20) NOT NULL DEFAULT '', 
    `password` varchar(255), 
    `phone_number` varchar(15) DEFAULT NULL,
    `address` varchar(30) DEFAULT NULL, 
    `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_phone_number_IDX` (`phone_number`),
    PRIMARY KEY (`id`)
);


# table lead
# ------------------------------------------------------------

CREATE TABLE client_referals.lead (
    `id` bigint(20) NOT NULL AUTO_INCREMENT, 
    `user_id` bigint(20), 
    `name` varchar(20) NOT NULL DEFAULT '', 
    `phone_number` varchar(15) DEFAULT NULL,
    `address` varchar(30) DEFAULT NULL, 
    `status` ENUM("New", "In pipeline", "Successful", "Junk") DEFAULT NULL, 
    `rewards` varchar(20) DEFAULT 25000,
    `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_phone_number_IDX` (`phone_number`),
    CONSTRAINT `lead_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

