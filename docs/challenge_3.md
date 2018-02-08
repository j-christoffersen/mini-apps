# Connect Four

## Basic Requirements

Build a single-page app implementation of the Connect Four game using Express and React.

- Use Express to serve up an `index.html` file and its associated assets
- Build your UI using ReactJS and pre-compile your views using Babel
- Implement all the game logic in the client code

Build your Express app inside `server.js` and your client app inside the client folder. For the basic requirements, you may place all of your React components into one file, `app.js`. Link your transpiled component file from `index.html`.

To satisfy the basic requirements of this challenge, you must detect a win or tie and display an appropriate message. Refreshing the page should restart the game. Write at least four tests (one test for each of horizontal, vertical, diagonal wins and one for ties) to verify your end-of-game detection logic. You may choose to write your tests to run either with node or within the browser.

Apply a *minimal* amount of CSS styling so that your board *resembles* a Connect Four board. Do not spend any significant amount of time (30 min max) on styling: aim for resemblance, not similarity.

For ease of development, be sure to set Babel to watch for changes in your `app.js` file to recompile those changes immediately. Additionally, be sure to use `nodemon` to watch for changes in `server.js`.

Use the coding best practices you learned previously to ensure a clear separation of concerns with well-defined interfaces.

If you get stuck or are not sure how to proceed, you may look at the [hints file](docs/challenge_3) for this challenge to help you along. **DO NOT** look at the hints without deliberation as this reduces your learning potential. Hints are provided only for the basic requirements.

## Advanced Content

- Add some routes to your server to save the result of each game.
- Store your scores in a JSON file so they are not lost when the server restarts (such as reloading by `nodemon`).
- Add a scoreboard page that fetches the last 30 game results from the server.
- Separate your React components into their own files and configure webpack-dev to load those components into your client.
- Add a button to restart the game.
- Keep track of the winner from the last round and allow the winner (Red or Black) to make the first move on the next round of gameplay.
- Keep a tally of the number of times Red vs. Black won a game. Refreshing the page (CMD+R) should reset the tally.
- Let each player (Red vs. Black) enter their name. Display this name next to the player's symbol (Red vs. Black). Save the user's name along with the game results to the server.
- If not already done, refactor your app so that all game state is self-contained in one object or module. It is ok for this module to live in the same `app.js` file as the rest of your code. This will simplify your testing. Add more tests if needed.
- If not done, apply CSS styling to make your game look more realistic. Use an external style sheet.

## Nightmare Mode

- Add a twist to the game: after each move, rotate the board 90 degrees and apply gravity to the played squares, so they stack against the bottom of the board. Add a UI element to toggle this behavior (on/off) at the start of each game.
- Manage all your game state using a Flux pattern such as Redux.
- If you used a table for your game board, refactor to use divs instead. CSS will be necessary to align your elements correctly. If not already done so, refactor to use `flex-box` layout management.
- Refreshing or reloading the page should not reset the scoring tally. Add a button to explicitly reset the tally.
- Instead of storing your scores in a JSON file, add a database (your choice).
- Add pagination to your scoreboard.
- Deploy your app to Heroku.
