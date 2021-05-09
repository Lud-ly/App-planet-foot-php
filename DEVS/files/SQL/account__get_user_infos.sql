SELECT
  `id_user` AS userId,
  `id_center` AS centerId,
  `user_name` AS userName,
  `user_firstname` AS userFirstName,
  `user_mail` AS userEmail,
  `user_identifier` AS userIdentifier,
  `user_phoneNumber` AS userPhoneNumber,
  `user_pwd` AS userPwd,
  `user_role` AS userRole,
  `user_validation_code` AS userValidationCode,
  `user_gender` AS userGender,
  `user_status` AS userStatus
FROM `user`
WHERE `id_user` = "@userId";