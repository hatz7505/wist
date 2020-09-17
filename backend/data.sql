CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  picture TEXT NOT NULL,
  price FLOAT(2) NOT NULL,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  category TEXT NOT NULL,
  link TEXT NOT NULL,
  date_posted TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE procons (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL REFERENCES items ON DELETE CASCADE,
  comment TEXT NOT NULL,
  procon TEXT NOT NULL
);