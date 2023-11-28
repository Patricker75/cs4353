DO $$
DECLARE
	-- Declaring variables for user ids
	user_id_1 login.id%TYPE;
	user_id_2 login.id%TYPE;
	user_id_3 login.id%TYPE;
	user_id_4 login.id%TYPE;
BEGIN
	-- Creating dummy logins
	INSERT INTO login(email, password)
	VALUES ('user1@email.com', '!!123password456!!')
	RETURNING id INTO user_id_1;

	INSERT INTO login(email, password)
	VALUES ('user2@email.com', '!!weakpassword$1!!')
	RETURNING id INTO user_id_2;

	INSERT INTO login(email, password)
	VALUES ('user3@email.com', '!!securitykey123!!')
	RETURNING id INTO user_id_3;
	
	INSERT INTO login(email, password)
	VALUES ('user4@email.com', '!!password123!!')
	RETURNING id INTO user_id_4;

	-- Creating dummy profiles
	INSERT INTO profile(user_id, name, address_primary, address_aux, city, state, zip_code)
	VALUES (user_id_1, 'User One', '123 Street', NULL, 'Houston', 'TX', 12345);

	INSERT INTO profile(user_id, name, address_primary, address_aux, city, state, zip_code)
	VALUES (user_id_2, 'User Two', '456 Road', NULL, 'New York City', 'NY', 98765);

	INSERT INTO profile(user_id, name, address_primary, address_aux, city, state, zip_code)
	VALUES (user_id_3, 'User Three', '789 Lane', '135 Trail', 'San', 'CA', 246810);
	
	UPDATE profile
	SET returning_customer = true
	WHERE user_id = user_id_3;
	
	-- Create dummy fuel requests
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_date)
	VALUES (user_id_1, 1001, 1.74, 1741.74, '2023-12-31');
	
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_date)
	VALUES (user_id_2, 2000, 1.755, 3510, '2024-01-01');
	
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_date)
	VALUES (user_id_3, 5000, 1.74, 8700, '2024-01-02');
	
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_date)
	VALUES (user_id_3, 5000, 1.725, 8625, '2024-02-01');
END $$