SELECT *,polls.subject FROM poll_options
INNER JOIN polls ON polls.id=poll_options.poll_id 
WHERE polls.status = '1'
ORDER BY polls.created DESC
