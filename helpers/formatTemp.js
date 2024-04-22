export const formatTempBasedOnUnit = (temp, unit) => {
  const t = unit === "C" ? temp : (temp * 9) / 5 + 32;
  return Math.round(t).toFixed(0);
};
