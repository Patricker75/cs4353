DO $$
DECLARE
	-- Declaring variables for user ids
	user_id_1 login.id%TYPE;
	user_id_2 login.id%TYPE;
	user_id_3 login.id%TYPE;
	user_id_4 login.id%TYPE;
BEGIN
	-- Storing all dummy user ids
	SELECT
		id
	INTO
		user_id_1
	FROM
		login
	WHERE
		email = 'user1@email.com';
		
	SELECT
		id
	INTO
		user_id_2
	FROM
		login
	WHERE
		email = 'user2@email.com';
	
	SELECT
		id
	INTO
		user_id_3
	FROM
		login
	WHERE
		email = 'user3@email.com';
	
	SELECT
		id
	INTO
		user_id_4
	FROM
		login
	WHERE
		email = 'user4@email.com';
	
	-- Deleting all dummy data from all tables
	DELETE FROM fuel_request
	WHERE 
		user_id = user_id_1
	OR
		user_id = user_id_2
	OR
		user_id = user_id_3
	OR
		user_id = user_id_4;
	
	DELETE FROM profile
	WHERE 
		user_id = user_id_1
	OR
		user_id = user_id_2
	OR
		user_id = user_id_3
	OR
		user_id = user_id_4;
	
	DELETE FROM login
	WHERE 
		id = user_id_1
	OR
		id = user_id_2
	OR
		id = user_id_3
	OR
		id = user_id_4;
END $$