-- Removes all constraints from fuel_request table
ALTER TABLE fuel_request DROP CONSTRAINT pk__fuel_request;
ALTER TABLE fuel_request DROP CONSTRAINT fk__fuel_request__profile;

-- Removes all constraints from profile table
ALTER TABLE profile DROP CONSTRAINT pk__profile;
ALTER TABLE profile DROP CONSTRAINT fk__profile__login;
ALTER TABLE profile DROP CONSTRAINT zip_code__length;

-- Removes all constraints from login table
ALTER TABLE login DROP CONSTRAINT pk__login;

DROP TABLE fuel_request;
DROP TABLE profile;
DROP TABLE login;