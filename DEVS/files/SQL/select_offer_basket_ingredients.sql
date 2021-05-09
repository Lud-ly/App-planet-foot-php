select basket.id_basket, basket.id_mainBasket, basket_name, product.id_product, measureunit.id_measureUnit, product_quantity, product_name, measureUnit_name
from basket 
left join basket__product on basket.id_basket = basket__product.id_basket
left join measureunit on basket__product.id_measureUnit = measureunit.id_measureUnit
left join product on basket__product.id_product = product.id_product
order by product.product_name Asc;