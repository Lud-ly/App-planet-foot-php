select product.id_category, id_product, category_name, product_name
from product
inner join category on product.id_category =category.id_category