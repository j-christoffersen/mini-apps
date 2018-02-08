# Tic Tac Toe

## Basic Requirements

Starting from a blank `index.html` and blank `app.js` file, build a single-page app for a simple Tic Tac Toe game, where:

- the first move always starts with player X
- the app detects a win or tie and displays an appropriate message
- a button resets the game for a new round of gameplay

A single page app means that once the page loads, no user-generated actions on the page may cause the entire page to reload. One way this rule could be broken in your implementation is that you might consider resetting the game state by refreshing the page. This technique is not permitted for this exercise.

For the initial version of this game, you may only **use native DOM methods** to listen for events and update the DOM as gameplay progresses. This means: no jQuery, React or any other libraries or frameworks. All your code should live in one file, `app.js`, and all your HTML should live in `index.html`.

For basic requirements, no CSS styling is necessary. Use the browser's default styling for all elements on your page.

MVC frameworks help you separate and manage the concerns associated with user input, rendering to the screen and managing app state. Even though you are not using any frameworks, this concept can be applied even while writing plain-vanilla javascript code. Be sure to build your app so that each category of behavior is grouped in one area of your `app.js` file. Use coding best practices to ensure a clear separation of concerns with well-defined interfaces.

If you get stuck or are not sure how to proceed:

- you may look at the [hints file](docs/hints_1.md) for this challenge to help you along.
- you may substitute the use of native DOM methods with jQuery.

**DO NOT** take any of these exits without deliberation as this reduces your learning potential. Hints are provided only for the basic requirements.

## Advanced Content

- If you used more than one event handler for listening to clicks on your game board, refactor to use a single event handler for handling all board events. (You may continue to use other event handlers that relate to starting a new game, for example.)
- Keep track of the winner from the last round and allow the winner (X or O) to make the first move on the next round of gameplay.
- Keep a tally of the number of times X vs. O won a game. Refreshing the page (CMD+R) should reset the tally.
- Let each player (X vs. O) enter their name. Display this name next to the player's symbol (X vs. O).
- If not already done, refactor your app so that all game state is self-contained in one object or module. It is ok for this module to live in the same `app.js` file as the rest of your code.
- If not already done, refactor all your presentation code so that it lives in one module or object. It is ok for this module to be in the same `app.js` file as the rest of your code. Carefully consider how this module will interact with the module that holds game state.
- If not already done, refactor all code related to user input so that this code lives in one module or object. It is ok for this module to be in the same `app.js` file as the rest of your code. Carefully consider how this module will interact with the other two modules above.
- Add a little CSS styling to make your game look more visually presentable.
- If not already done, move your CSS into an external style sheet.
- Add a twist to the game: after each move, rotate the board 90 degrees and apply gravity to the played squares, so they stack against the bottom of the board. Add a UI element to toggle this behavior (on/off) at the start of each game.
- Serve the game and its assets from an express server.

## Nightmare Mode

- Use one more ES6 class for managing state, move it into its own file and instantiate an instance of this class for each round of gameplay. Carefully choose the most appropriate data structures and add a comment in your code file justifying your selection.
- Use one more ES6 class for managing presentation logic, move it into its own file and instantiate an instance of this class for each round of gameplay.
- Use one more ES6 class for managing user input, move it into its own file and instantiate an instance of this class for each round of gameplay.
- Refactor your app to not use any global variables, except for the classes created in the previous steps.
- Refactor your app to not make use of any closure variables. All functions should be pure functions, meaning all their dependencies are supplied as inputs.
- If you used a table for your game board, refactor to use divs instead. CSS will be necessary to align your elements correctly. If not already done so, refactor to use `flex-box` layout management.
- Refreshing or reloading the page should not reset the scoring tally. Add a button to explicitly reset the tally.
- Move the Game Logic to the server and build an API to power the UI.
