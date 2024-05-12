DROP DATABASE IF EXISTS PCS;

CREATE DATABASE IF NOT EXISTS PCS;

USE PCS;

CREATE TABLE user (
    ID INT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    access_token VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE preference (
    id INT PRIMARY KEY,
    lang CHAR(2),
    theme INT,
    FOREIGN KEY (id) REFERENCES user(ID)
);

CREATE TABLE location (
    id INT PRIMARY KEY,
    country VARCHAR(255),
    city VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE property (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    img_link VARCHAR(255),
    capacity INT,
    surface INT,
    room_count INT,
    estimate DECIMAL(10, 2),
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(id)
);

CREATE TABLE service (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    description TEXT
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    role_name VARCHAR(255)
);

CREATE TABLE image (
    id INT PRIMARY KEY,
    path VARCHAR(255)
);

CREATE TABLE review (
    id INT PRIMARY KEY,
    description TEXT,
    rating INT
);

CREATE TABLE message (
    id INT PRIMARY KEY,
    content TEXT,
    created_at DATETIME,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES user(ID),
    FOREIGN KEY (receiver_id) REFERENCES user(ID)
);