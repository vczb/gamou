export const devMode = (process?.env?.NODE_ENV || '').includes('development');

export const rollVariant = (percent: number): boolean => {
  const random = Math.floor(Math.random() * 10) + 1; // 1 to 10
  return random <= percent;
};
