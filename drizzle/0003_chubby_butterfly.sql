CREATE INDEX `analytics_user_id_idx` ON `analytics` (`user_id`);--> statement-breakpoint
CREATE INDEX `analytics_user_id_date_idx` ON `analytics` (`user_id`,`date`);--> statement-breakpoint
CREATE INDEX `analytics_dustbin_id_idx` ON `analytics` (`dustbin_id`);--> statement-breakpoint
CREATE INDEX `collections_user_id_idx` ON `collections` (`user_id`);--> statement-breakpoint
CREATE INDEX `collections_user_id_status_idx` ON `collections` (`user_id`,`status`);--> statement-breakpoint
CREATE INDEX `collections_scheduled_date_idx` ON `collections` (`scheduled_date`);--> statement-breakpoint
CREATE INDEX `collections_dustbin_id_idx` ON `collections` (`dustbin_id`);--> statement-breakpoint
CREATE INDEX `dustbins_user_id_idx` ON `dustbins` (`user_id`);--> statement-breakpoint
CREATE INDEX `dustbins_user_id_is_active_idx` ON `dustbins` (`user_id`,`is_active`);--> statement-breakpoint
CREATE INDEX `dustbins_status_idx` ON `dustbins` (`status`);--> statement-breakpoint
CREATE INDEX `dustbins_type_idx` ON `dustbins` (`type`);--> statement-breakpoint
CREATE INDEX `dustbins_fill_level_idx` ON `dustbins` (`fill_level`);--> statement-breakpoint
CREATE INDEX `notifications_user_id_idx` ON `notifications` (`user_id`);--> statement-breakpoint
CREATE INDEX `notifications_user_id_is_read_idx` ON `notifications` (`user_id`,`is_read`);--> statement-breakpoint
CREATE INDEX `notifications_created_at_idx` ON `notifications` (`created_at`);