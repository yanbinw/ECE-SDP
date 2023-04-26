CREATE TABLE IF NOT EXISTS itemTable (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    binid VARCHAR(8),
    datasheet TEXT,
    image TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tagTable (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS categoryTable (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS itemTag (
    itemid INTEGER,
    tagid INTEGER
);

CREATE TABLE IF NOT EXISTS itemCategory (
    itemid INTEGER,
    categoryid INTEGER
);
