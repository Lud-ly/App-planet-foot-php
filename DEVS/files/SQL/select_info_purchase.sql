SELECT center_phoneNumber, center_withdrawall_place, center_withdrawall_schedule, center_validate_schedule, center_validate_schedule_below, withdrawall_date_available, 
order_date_topay, center_place_topay, parameter.parameter_status
from parameter
inner join center on parameter.id_center=center.id_center
inner join user on user.id_center=center.id_center
where user.id_user= @id_user and parameter_name= "crcdValidation"