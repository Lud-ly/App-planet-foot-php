delete from basket__promo
where id_basket=@id_basket;

delete from basket__product
where id_basket=@id_basket;

delete from basket
where id_basket=@id_basket;