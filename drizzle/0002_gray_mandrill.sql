CREATE TABLE `analytics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`dustbin_id` integer NOT NULL,
	`date` text NOT NULL,
	`waste_collected_kg` text NOT NULL,
	`fill_level_avg` integer NOT NULL,
	`collections_count` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dustbin_id`) REFERENCES `dustbins`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`dustbin_id` integer NOT NULL,
	`scheduled_date` text NOT NULL,
	`completed_date` text,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dustbin_id`) REFERENCES `dustbins`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dustbins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`location_name` text NOT NULL,
	`latitude` text NOT NULL,
	`longitude` text NOT NULL,
	`fill_level` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'empty' NOT NULL,
	`last_collection_date` text,
	`next_collection_date` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`dustbin_id` integer,
	`message` text NOT NULL,
	`type` text NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dustbin_id`) REFERENCES `dustbins`(`id`) ON UPDATE no action ON DELETE cascade
);
