DELETE FROM `user__promo`
WHERE
	`id_user` = @userId
AND
	`id_purchase` IS NULL
AND
	`id_promo` = (SELECT id_promo FROM `promo` WHERE promo_reference LIKE '@promoCode');