-- ajout champ 'used_promo' pour définir si code promo utilisé ou non
ALTER TABLE `user__promo` ADD `used_promo` BOOLEAN NOT NULL DEFAULT FALSE AFTER `id_promo`;

-- possibilité promos illimitées en nombre
ALTER TABLE `promo` CHANGE `promo_quantity` `promo_quantity` TINYINT(4) NULL;