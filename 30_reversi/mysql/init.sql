DROP DATABASE IF EXISTS reversi;
CREATE DATABASE reversi;
USE reversi;
CREATE TABLE games (
  id INT PRIMARY KEY AUTO_INCREMENT,
  started_at DATETIME NOT NULL
);
CREATE TABLE turns (
  id INT PRIMARY KEY AUTO_INCREMENT,
  game_id INT NOT NULL,
  turn_count INT NOT NULL,
  next_disc INT,
  end_at DATETIME NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games (id),
  UNIQUE (game_id, turn_count)
);
CREATE TABLE moves (
  id INT PRIMARY KEY AUTO_INCREMENT,
  turn_id INT NOT NULL,
  disc INT NOT NULL,
  x INT NOT NULL,
  y INT NOT NULL,
  FOREIGN KEY (turn_id) REFERENCES turns (id)
);
CREATE TABLE squares (
  id INT PRIMARY KEY AUTO_INCREMENT,
  turn_id INT NOT NULL,
  x INT NOT NULL,
  y INT NOT NULL,
  disc INT NOT NULL,
  FOREIGN KEY (turn_id) REFERENCES turns (id),
  UNIQUE (turn_id, x, y)
);
CREATE TABLE game_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  game_id INT NOT NULL,
  winner_disc INT NOT NULL,
  end_at DATETIME NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games (id)
);
SELECT 'OK' AS result;