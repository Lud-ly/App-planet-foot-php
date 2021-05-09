SELECT
	COUNT(*) AS compteur
FROM
	user__promo
WHERE
	(`used_promo` = 0 AND `id_purchase` IS NULL)
 AND
	`id_promo` = @promoId;