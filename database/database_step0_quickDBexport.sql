
CREATE TABLE `project` (
    `project_id` int(10)  NOT NULL ,
    `project_name` varchar(255)  NOT NULL ,
    `project_type` varchar(255)  NOT NULL ,
    `project_year` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `project_id`
    )
);

CREATE TABLE `project_roles` (
    `project_id` int(10)  NOT NULL ,
    `role_id` int(10)  NOT NULL 
);

CREATE TABLE `role` (
    `role_id` int(10)  NOT NULL ,
    `role_name` varchar(255)  NOT NULL ,
    `role_slug` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `role_id`
    )
);

CREATE TABLE `project_teammembers` (
    `project_id` int(10)  NOT NULL ,
    `teammember_id` int(10)  NOT NULL 
);

CREATE TABLE `teammember` (
    `teammember_id` int(10)  NOT NULL ,
    `teammember_name` varchar(255)  NOT NULL ,
    PRIMARY KEY (
        `teammember_id`
    )
);

ALTER TABLE `project_roles` ADD CONSTRAINT `fk_project_roles_project_id` FOREIGN KEY(`project_id`)
REFERENCES `project` (`project_id`);

ALTER TABLE `project_roles` ADD CONSTRAINT `fk_project_roles_role_id` FOREIGN KEY(`role_id`)
REFERENCES `role` (`role_id`);

ALTER TABLE `project_teammembers` ADD CONSTRAINT `fk_project_teammembers_project_id` FOREIGN KEY(`project_id`)
REFERENCES `project` (`project_id`);

ALTER TABLE `project_teammembers` ADD CONSTRAINT `fk_project_teammembers_teammember_id` FOREIGN KEY(`teammember_id`)
REFERENCES `teammember` (`teammember_id`);

