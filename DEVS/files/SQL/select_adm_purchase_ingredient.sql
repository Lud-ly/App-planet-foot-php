select basket__product.id_basket, basket_name, product_name
from basket inner join basket__product on basket.id_basket= basket__product.id_basket
inner join product on product.id_product = basket__product.id_product