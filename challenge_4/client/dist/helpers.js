const getScores = frames => {
  return frames.map((frame, i) => {
    if (i < 10 && frame[0] !== null) {
      if (frame[0] === 10) {
        if (frames[i + 1][0] === 10) {
          if (frames[i + 2][0]) {
            return 20 + frames[i + 2][0];
          }
        } else if (frames[i + 1][0] !== null && frames[i + 1][1] !== null) {
          return 10 + frames[i + 1][0] + frames[i + 1][1];
        }
      } else if (frame[1] !== null) {
        if (frame[0] + frame[1] === 10) {
          if (frames[i + 1][0] !== null) {
            return 10 + frames[i + 1][0];
          }
        } else {
          return frame[0] + frame[1];
        }
      }
    }

    return null;
  });
};

const formatFrames = frames => {
  // console.log('in', frames);
  return frames.map(frame => {
    const newFrame = [];

    if (frame[0] === 10) {
      newFrame[0] = 'X';
    } else if (frame[0] !== null) {
      newFrame[0] = String(frame[0]);
    } else {
      newFrame[0] = '.';
    }

    if (frame[1] === null) {
      newFrame[1] = '.';
    } else if (frame[0] + frame[1] === 10) {
      newFrame[1] = '/';
    } else {
      newFrame[1] = frame[1];
    }

    return newFrame;
  });
};

// export { getScores, formatFrames };

