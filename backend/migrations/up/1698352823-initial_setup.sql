CREATE TABLE login (
    id INT GENERATED ALWAYS AS IDENTITY, 
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,

    CONSTRAINT pk__login PRIMARY KEY(id)
);

CREATE TABLE profile (
    user_id INT,
    name VARCHAR(50) NOT NULL,
    address_primary VARCHAR(100) NOT NULL,
    address_aux VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    zip_code VARCHAR(9) NOT NULL,
    new_customer BOOLEAN,

    CONSTRAINT pk__profile PRIMARY KEY(user_id),

    CONSTRAINT fk__profile__login FOREIGN KEY(user_id) REFERENCES login(id),

    CONSTRAINT zip_code__length CHECK (length(zip_code) >= 5)
);

CREATE TABLE fuel_request (
    request_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    total_price MONEY NOT NULL,
    delivery_date DATE,

    CONSTRAINT pk__fuel_request PRIMARY KEY (request_id),

    CONSTRAINT fk__fuel_request__profile FOREIGN KEY(user_id) REFERENCES profile(user_id)
);