insert into user__Basket values (2, 1, 2);
insert into user__Basket values (3, 1, 3);
insert into user__Basket values (1, 2, 2);
insert into user__Basket values (3, 3, 1);
insert into user__Basket values (4, 3, 1);
insert into user__Basket values (1, 4, 5);
insert into Basket values (1, 5, 4, "Mon beau panier", "assortiment de fruits et légumes d'hiver", "BASK_WIN_584690", "2020-12-15 08:00:00", "2020-12-20 17:00:00", "2020-12-17 08:00:00", "2020-12-22 17:00:00" ,"2020-12-21 08:00:00" ,"2020-12-24 17:00:00", "basket_Wint1.png", 1);
insert into Basket values (2, 1, 4, "Panier de fruits", "Toute une selection de fruits de saison pour vous", "BASK_WIN_458470", "2020-12-28 08:00:00", "2021-01-04 17:00:00", "2021-01-01 08:00:00", "2021-01-03 17:00:00" ,"2021-01-03 08:00:00" ,"2021-01-06 17:00:00", "basket_Wint2.png", 0);
insert into Basket values (3, 2, 1, "Panier de Legumes", "Toute une selection de légumes de saison pour vous", "BASK_SPR_842540", "2021-03-17 08:00:00", "2021-03-22 17:00:00", "2021-03-21 08:00:00", "2021-03-23 17:00:00" ,"2021-03-23 08:00:00" ,"2021-03-25 17:00:00", "basket_Spr1.png", 1);
insert into Basket values (4, 6, 1, "Panier gourmand", "panier gourmand à partager…ou pas", "BASK_SPR_325890", "2021-03-21 08:00:00", "2021-03-27 17:00:00", "2021-03-26 08:00:00", "2021-03-28 17:00:00" ,"2021-03-27 08:00:00" ,"2020-03-29 17:00:00", "basket_Spr2.png", 1);
insert into Basket__promo values (2, NULL);
insert into Basket__promo values (3, 1);
insert into Basket__promo values (4, 1);
insert into Basket__promo values (3, 1);
insert into Basket__promo values (4, NULL);
insert into Basket__promo values (1, 2);
insert into promo values (1, "reduction de 5€", "Reduct_eloce5", 5, "€", "2020-12-15 08:00:00", "2020-12-16-12:00:00", 10, 1)
insert into promo values (2, "reduction de 10 %", "Reduct_eloce10", 10, "%", "2021-03-17-12:00:00", "null", 15, 1)
insert into promo values (3, "ajout de 10 tomates au panier", "Ajout_prod10", 10, "tomates", "2021-03-17 12:00:00", "2021-03-18 12:00:00", 1, 0)
insert into mainBasket values (1, "Spring", 1);
insert into mainBasket values (2, "Summer", 0);
insert into mainBasket values (3, "Fall", 0);
insert into mainBasket values (4, "Winter", 1);
insert into user__promo values (2, 3);
insert into user__promo values (3, 1);
insert into user__promo values (3, 2);
insert into user__promo values (4, 1);
insert into user__promo values (1, 2);
insert into measureUnit values (1, "gr", 1);
insert into measureUnit values (2, "kg", 1);
insert into measureUnit values (3, "L", 1);
insert into measureUnit values (4, "unités", 1);
insert into basket__product values (1, 1, 2, 2);
insert into basket__product values (1, 3, 4, 5);
insert into basket__product values (1, 5, 4, 10);
insert into basket__product values (2, 4, 2, 2);
insert into basket__product values (2, 5, 1, 500);
insert into basket__product values (3, 2, 2, 5);
insert into basket__product values (4, 3, 4, 3);
insert into basket__product values (4, 6, 4, 2);

alter table basket auto_increment = 5;
alter table promo auto_increment = 4;
alter table mainbasket auto_increment = 5;
alter table measureunit auto_increment = 5;