SELECT
	`id_user` AS userId,
	`user_firstname` AS userFirstName,
	`user_name` AS userName
FROM `user`
WHERE `user_role` = 0
ORDER BY `user_name` ASC;