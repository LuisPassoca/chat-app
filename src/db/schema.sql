DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user'
);

CREATE TABLE messages(
    id INTEGER PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    sent_at TEXT NOT NULL,

    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
);