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

-- Policy to restrict access to the service role and the SECURITY DEFINER function
CREATE POLICY "allow_access_via_service_role" ON challenges
FOR SELECT
USING (auth.role() = 'service_role');ctio