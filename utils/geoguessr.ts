export const getChallengeUrl = (challengeToken: string) =>
  `https://www.geoguessr.com/challenge/${challengeToken}`;

export const getAvatarUrl = (pinUrl: string, px: number = 128) =>
  `https://www.geoguessr.com/images/resize:auto:${px}:${px}/gravity:ce/plain/${pinUrl}`;
