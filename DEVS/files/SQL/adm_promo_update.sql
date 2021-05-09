update promo 
set promo_label="@promo_label", promo_reference="@promo_reference", promo_number="@promo_number", promo_type="@promo_type", promo_begin_date="@promo_begin_date", promo_begin_time="@promo_begin_time", promo_end_date="@promo_end_date", promo_end_time="@promo_end_time", promo_quantity="@promo_quantity"
where id_promo= @id_promo