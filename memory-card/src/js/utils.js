export function generateSeed(length) {
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    Array(length),
    () => pool[Math.floor(Math.random() * pool.length)],
  ).join("");
}