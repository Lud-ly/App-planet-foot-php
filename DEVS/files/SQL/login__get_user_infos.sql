SELECT
  `id_user`,
  `id_center`,
  `user_name`,
  `user_firstname`,
  `user_mail`,
  `user_identifier`,
  `user_phoneNumber`,
  `user_pwd`,
  `user_role`,
  `user_validation_code`,
  `user_gender`,
  `user_status`
FROM `user`
WHERE `user_mail` = "@userLogin";