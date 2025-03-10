ALTER TABLE `users` ADD `first_name` text(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` text(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `account_name` text(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `phone` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `delivery_address` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `card_number` text(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` text DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE UNIQUE INDEX `users_account_name_unique` ON `users` (`account_name`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `name`;