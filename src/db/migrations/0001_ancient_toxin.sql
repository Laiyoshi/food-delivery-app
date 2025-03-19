ALTER TABLE `orders` ADD `cart_id` text REFERENCES cart(id);--> statement-breakpoint
ALTER TABLE `cart` DROP COLUMN `order_id`;