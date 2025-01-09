CREATE OR REPLACE FUNCTION get_overall_standings()
RETURNS TABLE (player_id TEXT, player_name TEXT, pin_url TEXT, victories INT)
LANGUAGE SQL
AS $$
SELECT 
  p.player_id,
  p.player_name,
  p.pin_url,
  count(p.player_id) as victories
FROM challenge_scores cs
LEFT JOIN player p ON p.player_id = cs.winning_player_id
GROUP BY p.player_id
ORDER BY victories DESC;
$$;


CREATE OR REPLACE FUNCTION get_best_rounds()
RETURNS TABLE(
  created_at timestamp,
  challenge_token text,
  player_id text,
  player_name text,
  pin_url text,
  total_score integer
)
LANGUAGE sql
AS $$
  SELECT 
    c.created_at,
    pcs.challenge_token,
    p.player_id,
    p.player_name,
    p.pin_url,
    pcs.total_score
  FROM player_challenge_scores pcs
  LEFT JOIN player p ON p.player_id = pcs.player_id
  LEFT JOIN challenges c ON c.challenge_token = pcs.challenge_token
  ORDER BY pcs.total_score DESC;
$$;

