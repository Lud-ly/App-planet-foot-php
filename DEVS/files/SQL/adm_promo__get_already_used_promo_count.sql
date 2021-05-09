SELECT
	COUNT(*) AS compteur
FROM
	user__promo
WHERE
	`used_promo` = 1
 AND
	`id_promo` = @promoId;