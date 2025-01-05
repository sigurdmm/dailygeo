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

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Policy to restrict access to the service role and the SECURITY DEFINER function
CREATE POLICY "allow_access_via_service_role" ON challenges
FOR SELECT
USING (auth.role() = 'service_role');

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

-- Enable RLS
ALTER TABLE player_challenge_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Allow players to see their scores
CREATE POLICY select_own_scores 
ON player_challenge_scores
FOR SELECT
USING (player_id = current_user);
