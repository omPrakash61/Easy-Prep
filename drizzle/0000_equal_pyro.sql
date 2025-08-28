CREATE TABLE `courses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`cid` varchar(100) NOT NULL,
	`name` varchar(100),
	`description` varchar(1000),
	`no_of_chapters` int NOT NULL DEFAULT 1,
	`include_video` boolean DEFAULT false,
	`level` varchar(50) NOT NULL,
	`category` varchar(50),
	`course_json` json,
	`bannerImageUrl` varchar(1000),
	`courseContent` json DEFAULT ('{}'),
	`user_email` varchar(100) NOT NULL,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enrollCourse` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`cid` varchar(100),
	`userEmail` varchar(100),
	`completeChapters` json DEFAULT ('{}'),
	CONSTRAINT `enrollCourse_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`full_name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`subscription_id` int,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_user_email_users_email_fk` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `enrollCourse` ADD CONSTRAINT `enrollCourse_cid_courses_cid_fk` FOREIGN KEY (`cid`) REFERENCES `courses`(`cid`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `enrollCourse` ADD CONSTRAINT `enrollCourse_userEmail_users_id_fk` FOREIGN KEY (`userEmail`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;