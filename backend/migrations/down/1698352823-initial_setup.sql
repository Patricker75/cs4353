-- Removes all constraints from fuel_requests table
ALTER TABLE fuel_requests DROP CONSTRAINT pk__fuel_requests;
ALTER TABLE fuel_requests DROP CONSTRAINT fk__users;

-- Removes all constraints from users table
ALTER TABLE users DROP CONSTRAINT pk__users;
ALTER TABLE users DROP CONSTRAINT fk__logins;
ALTER TABLE users DROP CONSTRAINT zip_code__length;

-- Removes all constraints from logins table
ALTER TABLE logins DROP CONSTRAINT pk__logins;

DROP TABLE fuel_requests;
DROP TABLE users;
DROP TABLE logins;