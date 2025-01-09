CREATE TABLE challenges (
  challenge_token TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  map TEXT NOT NULL,
  forbid_moving BOOLEAN NOT NULL,
  forbid_rotating BOOLEAN NOT NULL,
  forbid_zooming BOOLEAN NOT NULL,
  time_limit INTEGER NOT NULL,
  rounds INTEGER NOT NULL
);

CREATE TABLE player (
  player_id TEXT PRIMARY KEY,
  player_name TEXT NOT NULL,
  pin_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE challenge_scores (
  challenge_token TEXT PRIMARY KEY,
  winning_player_id TEXT,
  winning_score INTEGER,
  FOREIGN KEY (challenge_token) REFERENCES challenges (challenge_token) ON DELETE CASCADE,
  FOREIGN KEY (winning_player_id) REFERENCES player (player_id) ON DELETE CASCADE
);

CREATE TABLE player_challenge_scores (
  challenge_token TEXT,
  player_id TEXT,
  total_score INTEGER,
  PRIMARY KEY (challenge_token, player_id),
  FOREIGN KEY (player_id) REFERENCES player (player_id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_token) REFERENCES challenges (challenge_token) ON DELETE CASCADE
);