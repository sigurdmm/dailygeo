CREATE OR REPLACE FUNCTION public.get_latest_challenge()
RETURNS challenges AS $$
DECLARE
  latest_challenge challenges%ROWTYPE;
BEGIN
  SELECT *
  INTO latest_challenge
  FROM challenges
  ORDER BY created_at DESC
  LIMIT 1;

  RETURN latest_challenge;
END;
$$ LANGUAGE plpgsql;