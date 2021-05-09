select parameter_name, center_phoneNumber
from parameter
inner join center on parameter.id_center= center.id_center
where parameter_status= 1 and parameter_name= "crcdValidation" and parameter.id_center= 1;