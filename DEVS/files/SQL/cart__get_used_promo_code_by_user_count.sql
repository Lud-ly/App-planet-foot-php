SELECT
	COUNT(*) AS compteur
FROM
	user__promo
WHERE
	`id_user` = @userId
 AND
	`used_promo` = 1
 AND
	`id_promo` = (SELECT id_promo FROM `promo` WHERE promo_reference LIKE '@promoCode');