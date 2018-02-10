// import React from 'react';
// import { formatFrames, getScores } from './helpers';

const Scoreboard = props => {
  const frames = formatFrames(props.frames);
  // console.log('out', frames);

  return React.createElement(
    'table',
    null,
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        getScores(props.frames).map(score => score !== null ? score : '.').map((score, i) => React.createElement(
          'td',
          { key: i },
          React.createElement(
            'table',
            null,
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  frames[i][0]
                ),
                React.createElement(
                  'td',
                  null,
                  frames[i][1]
                )
              ),
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  score
                )
              )
            )
          )
        ))
      )
    )
  );
};

// export default Scoreboard;

