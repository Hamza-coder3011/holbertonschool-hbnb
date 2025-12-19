-- =====================================
-- HBnB Database Schema (with ON DELETE CASCADE)
-- =====================================

-- Table User
CREATE TABLE IF NOT EXISTS "User" (
    id          CHAR(36) PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    is_admin    BOOLEAN DEFAULT FALSE
);

-- Table Place
CREATE TABLE IF NOT EXISTS "Place" (
    id          CHAR(36) PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL,
    latitude    FLOAT,
    longitude   FLOAT,
    owner_id    CHAR(36) NOT NULL,
    CONSTRAINT fk_place_owner
        FOREIGN KEY (owner_id) REFERENCES "User"(id) ON DELETE CASCADE
);

-- Table Amenity
CREATE TABLE IF NOT EXISTS "Amenity" (
    id   CHAR(36) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Table Review
CREATE TABLE IF NOT EXISTS "Review" (
    id        CHAR(36) PRIMARY KEY,
    text      TEXT,
    rating    INT NOT NULL,
    user_id   CHAR(36) NOT NULL,
    place_id  CHAR(36) NOT NULL,
    CONSTRAINT fk_review_user
        FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_place
        FOREIGN KEY (place_id) REFERENCES "Place"(id) ON DELETE CASCADE,
    CONSTRAINT uq_review_user_place
        UNIQUE (user_id, place_id),
    CONSTRAINT chk_review_rating
        CHECK (rating BETWEEN 1 AND 5)
);

-- Table Place_Amenity (Many-to-Many)
CREATE TABLE IF NOT EXISTS "Place_Amenity" (
    place_id   CHAR(36) NOT NULL,
    amenity_id CHAR(36) NOT NULL,
    PRIMARY KEY (place_id, amenity_id),
    CONSTRAINT fk_pa_place
        FOREIGN KEY (place_id) REFERENCES "Place"(id) ON DELETE CASCADE,
    CONSTRAINT fk_pa_amenity
        FOREIGN KEY (amenity_id) REFERENCES "Amenity"(id) ON DELETE CASCADE
);
