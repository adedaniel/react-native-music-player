export const secondsToDuration = (secs) => {
  const pad = (n) => ("0" + n).slice(-2);

  if (secs < 0) {
    return "0:00";
  }
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = pad(Math.floor(secs - minutes * 60));
  return `${hours > 0 ? hours : ""} ${minutes}:${seconds}`;
};

export const secondsToHHMM = (secs) => {
  const pad = (n) => ("0" + n).slice(-2);

  if (secs < 0) {
    return "0:00";
  }
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = pad(Math.floor(secs - minutes * 60));
  return `${hours > 0 ? `${hours} hrs` : ""} ${
    minutes > 0 ? `${minutes} min` : ""
  } ${seconds > 0 ? `${seconds} secs` : ""}`;
};

export const wordTruncate = (word, limit) => {
  // To replace part of a string with ellipsis after a certain length
  if (word?.length > limit) {
    return word.toString().slice(0, limit).concat("...");
  } else {
    return word;
  }
};
