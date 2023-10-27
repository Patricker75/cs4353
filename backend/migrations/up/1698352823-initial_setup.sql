CREATE TABLE logins (
    username VARCHAR(50),
    password VARCHAR(100),

    CONSTRAINT pk__logins PRIMARY KEY(username)
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
    username VARCHAR(50),

    CONSTRAINT pk__users PRIMARY KEY(user_id),
    
    CONSTRAINT fk__logins FOREIGN KEY(username) REFERENCES logins(username),

    CONSTRAINT zip_code__length CHECK (length(zip_code) >= 5)
);

CREATE TABLE fuel_requests (
    request_id INT GENERATED ALWAYS AS IDENTITY,
    customer_id INT,
    amount INT NOT NULL,
    total_price INT NOT NULL,
    delivery_date DATE,

    CONSTRAINT pk__fuel_requests PRIMARY KEY (request_id),

    CONSTRAINT fk__users FOREIGN KEY(customer_id) REFERENCES users(user_id)
);