delete from user__basket
where id_user= @id_user and id_purchase=@id_purchase;

delete from user__promo
where id_user= @id_user and id_purchase=@id_purchase;

delete from purchase
where id_user= @id_user and id_purchase=@id_purchase;