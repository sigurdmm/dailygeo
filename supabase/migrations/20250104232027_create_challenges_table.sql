-- Recreate the challenges table
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  map TEXT NOT NULL,
  forbid_moving BOOLEAN NOT NULL,
  forbid_rotating BOOLEAN NOT NULL,
  forbid_zooming BOOLEAN NOT NULL,
  time_limit INTEGER NOT NULL,
  rounds INTEGER NOT NULL
);

-- Enable Row-Level Security (RLS)
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Policy to allow all authenticated users to read challenges
CREATE POLICY "allow_read_all" ON challenges
FOR SELECT
USING (true);

-- Policy to restrict insert, update, and delete to the service role only
CREATE POLICY "restrict_modifications" ON challenges
FOR ALL
USING (auth.role() = 'service_role');
