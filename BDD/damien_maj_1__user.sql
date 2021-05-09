-- Jean-Jacques : bénéficie du rôle SuperAdmin
UPDATE `user` SET `user_role` = '4' WHERE `user`.`id_user` = 1;

-- ajout utilisateur (Damien)
INSERT INTO `user` (`id_user`, `id_center`, `user_name`, `user_firstname`, `user_mail`, `user_identifier`, `user_phoneNumber`, `user_pwd`, `user_role`, `user_validation_code`, `user_gender`, `user_status`) VALUES (NULL, '1', 'Grember', 'Damien', 'dgrember@gmail.com', '123456789', '0632993386', 'aaaaaa', '0', '', '1', '1');

-- ajout utilisateur (Ludo M)
INSERT INTO `user` (`id_user`, `id_center`, `user_name`, `user_firstname`, `user_mail`, `user_identifier`, `user_phoneNumber`, `user_pwd`, `user_role`, `user_validation_code`, `user_gender`, `user_status`) VALUES (NULL, '1', 'Mouly', 'Ludovic', 'ludo_mouly_fausse_adresse@gmail.com', '12345678', '0612345678', 'aaaa', '0', '', '1', '1');

-- ajout utilisateur (Antoine)
INSERT INTO `user` (`id_user`, `id_center`, `user_name`, `user_firstname`, `user_mail`, `user_identifier`, `user_phoneNumber`, `user_pwd`, `user_role`, `user_validation_code`, `user_gender`, `user_status`) VALUES (NULL, '1', 'Malinnn', 'Antoine', 'antoine_malinnn_fausse_adresse@gmail.com', '1234567', '0612345678', 'aaaa', '0', '', '1', '1');