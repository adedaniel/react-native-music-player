export const secondsToDuration = (secs) => {
  const pad = (n) => ("0" + n).slice(-2);

  if (secs < 0) {
    return "0:00";
  }
  const minutes = Math.floor(secs / 60);
  const seconds = pad(Math.floor(secs - minutes * 60));
  return `${minutes}:${seconds}`;
};

export const wordTruncate = (word, limit) => {
  // To replace part of a string with ellipsis after a certain length
  //   if (word.length > limit) {
  return (
    word
      // .toString()
      .slice(0, limit) + " ..."
    //   .concat("...")
  );
  //   } else {
  // return word;
  //   }
};
