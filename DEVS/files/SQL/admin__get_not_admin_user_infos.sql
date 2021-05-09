SELECT
	`user_firstname` AS userFirstName,
	`user_name` AS userName,
	`user_gender` AS userGender,
	`user_mail` AS userEmail,
	`user_identifier` AS userIdentifier,
	`user_phoneNumber` AS userPhoneNumber,
	`user_role` AS userRole
FROM `user`
WHERE `id_user` = @userId;


