CREATE TABLE logins (
    email VARCHAR(50),
    password VARCHAR(100),
    user_id INT,

    CONSTRAINT pk__logins PRIMARY KEY(email)
);

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR(50) NOT NULL,
    address_primary VARCHAR(100) NOT NULL,
    address_aux VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    zip_code VARCHAR(9) NOT NULL,
    new_customer BOOLEAN,

    CONSTRAINT pk__users PRIMARY KEY(user_id),

    CONSTRAINT zip_code__length CHECK (length(zip_code) >= 5)
);

CREATE TABLE fuel_requests (
    request_id INT GENERATED ALWAYS AS IDENTITY,
    customer_id INT,
    amount INT NOT NULL,
    total_price INT NOT NULL,
    delivery_date DATE,

    CONSTRAINT pk__fuel_requests PRIMARY KEY (request_id)
);

ALTER TABLE logins
ADD CONSTRAINT fk__users FOREIGN KEY(user_id) REFERENCES users(user_id);

ALTER TABLE fuel_requests
ADD CONSTRAINT fk__users FOREIGN KEY(customer_id) REFERENCES users(user_id);