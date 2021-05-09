update mainbasket
set mainBasket_name= "@mainBasket_name"
where id_mainBasket= @id_mainBasket;

update basket
set basket_name = "@basket_name", basket_image="@basket_image", basket_description="@basket_description",
basket_number = @basket_number, basket_quantity = @basket_quantity, basket_price=@basket_price
where id_basket = @id_basket;
