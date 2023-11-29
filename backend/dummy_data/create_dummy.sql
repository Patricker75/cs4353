DO $$
DECLARE
	-- Declaring variables for user ids
	user_id_1 login.id%TYPE;
	user_id_2 login.id%TYPE;
	user_id_3 login.id%TYPE;
	user_id_4 login.id%TYPE;
BEGIN
	-- Creating dummy logins
	-- password: password123
	INSERT INTO login(email, password)
	VALUES ('user1@email.com', '$2b$04$mEUs.ph04uHf/V4ofdTRf.EHTuwFDS.M9JKSmHQ5uLIdnZN5e3M8y')
	RETURNING id INTO user_id_1;

	-- password: password456
	INSERT INTO login(email, password)
	VALUES ('user2@email.com', '$2b$04$Y.WiYsckfxgMauFzN4hekermSbR2MR.5Mbd6VECivHHXCw2OblZDC')
	RETURNING id INTO user_id_2;

	-- password: password789
	INSERT INTO login(email, password)
	VALUES ('user3@email.com', '$2b$04$xTq2t7rwJsyTxbOzA8VQS.LpPUu94I4hyEKkWwXAdLU88XQ6moloy')
	RETURNING id INTO user_id_3;
	
	-- password: password135
	INSERT INTO login(email, password)
	VALUES ('user4@email.com', '$2b$04$Lvxlk2y4UNi5NfBsGMiFLevWq3A05PQescOWfd2SY3iV7hxQhGMES')
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
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_address, delivery_date)
	VALUES (user_id_1, 1001, 1.74, 1741.74, '123 Street', '2023-12-31');
	
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_address, delivery_date)
	VALUES (user_id_2, 2000, 1.755, 3510, '456 Road', '2024-01-01');
	
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_address, delivery_date)
	VALUES (user_id_3, 5000, 1.74, 8700, '789 Lane', '2024-01-02');
	
	INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_address, delivery_date)
	VALUES (user_id_3, 5000, 1.725, 8625, '135 Trail', '2024-02-01');
END $$