-- Insérer l'utilisateur administrateur
INSERT INTO User (id, first_name, last_name, email, password, is_admin)
VALUES (
    '36c9050e-ddd3-4c3b-9731-9f487208bbc1',
    'Admin',
    'HBnB',
    'admin@hbnb.io',
    '$2b$12$Q8eF2E.5tEflgP8Xbd86GeByxFfF8M8Ddi5qJ4SlEw7VmYpJCKTtC',
    TRUE
);

-- Insérer les amenities avec des UUID4 générés
INSERT INTO Amenity (id, name) VALUES
    ('4e7c7b54-8b35-4c71-960f-94a7b6b6a111', 'WiFi'),
    ('73d6f9c4-8912-4f0b-b2f1-22c78b9f8b22', 'Swimming Pool'),
    ('9a1c2b3d-4e5f-678a-9b0c-1d2e3f4a5b33', 'Air Conditioning');

