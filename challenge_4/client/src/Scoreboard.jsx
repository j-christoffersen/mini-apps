// import React from 'react';
// import { formatFrames, getScores } from './helpers';

const Scoreboard = (props) => {
  const frames = formatFrames(props.frames);
  // console.log('out', frames);

  return (
    <table>
      <tbody>
        <tr>
          {
            getScores(props.frames)
              .map(score => score !== null ? score : '.')
              .map((score, i) => (
                <td key={i}><table><tbody>
                  <tr>
                    <td>{frames[i][0]}</td>
                    <td>{frames[i][1]}</td>
                  </tr>
                  <tr>
                    <td>{score}</td>
                  </tr>
                </tbody></table></td>
              ))
          }
        </tr>
      </tbody>
    </table>
  );
}

// export default Scoreboard;
