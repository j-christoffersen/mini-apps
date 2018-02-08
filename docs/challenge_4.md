# Bowling

## Basic Requirements

Build a single-page app implementation of a 10-pin Bowling game using Express and React.

- Use Express to serve up an `index.html` file and its associated assets
- Build your UI using ReactJS and pre-compile your views using Babel
- Implement the individual gameplay logic in the client code

To satisfy the minimum requirements of this challenge, start with a user interface that allows for pin quantity selection only; i.e. the UI allows the player to select the number of pins hit on each bowl, not which pins where hit. Suggestion: create a telephone keypad-style UI that includes '10'. No CSS styling is necessary. Use the browser's default styling for all elements on your page.

Additionally, simplify gameplay by initially making this a one-person game. This allows you to focus on building and modeling the scoring algorithm, data structures and React components for a single player. As each bowl and turn progresses, keep track of the score for each bowl, turn and the total score. Use React components to display the game progression and total score in the UI.

Write tests to ensure all the nuances of the scoring rules for bowling are correctly implemented.

For this final challenge, minimal [hints](docs/challenge_4) are provide since the hints for basic requirements are covered by prior hints.

## Advanced Content

- Add some routes to your server to save the result of each game.
- Store your scores in MongoDB, so they are not lost when the server restarts (such as reloading by `nodemon`). You should use the `mongoose` DB adapter to interface with MongoDB.
- Add a scoreboard view that fetches the last 30 game results from the server.
- Add pagination to the scoreboard.
- Modify the UI such that it displays the actual pins selected and when the user selects a pin quantity for a bowl, a random set of pins is selected.
- Add the ability to switch between automatic (random) pin selection or manual pin selection on each round.
- Separate your React components into their own files and configure webpack-dev to load those components into your client.
- Add CSS styling to make the UI presentation pleasant. Use an external style sheet.

## Nightmare Mode

- Turn this into a multiplayer game
