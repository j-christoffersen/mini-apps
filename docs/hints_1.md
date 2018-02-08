# Challenage 1 Hints

If you are looking at these hints, it means you are struggling to meet the basic requirements. Below is a process you can follow to acheive the goals of the basic requirements. The hints are organized in a way that lets you ignore hints not related to your current step.

Your goal is to use native DOM methods, but if you are struggling with those methods, you may switch to using jQuery methods. Remember, jQuery methods are simply an abstraction to the native DOM methods (i.e. they rely on the DOM methods to do their work, but offer a simpler interface to the developer).

## Basic File Setup

- Add `html`, `head` and `body` tags to your html file.
- Add a `script` tag to load the `app.js` file. 
- Verify it's all working by putting a single `console.log` statement into `app.js` -- you should see your message in the browser's console after loading the html page.

## Initial Board Setup
- Within `index.html` make a 3x3 table 
- Inside `app.js`, add an click event listener for each square on the board. When a sqaure is clicked, add an X to that sqaure.

## Event Listener Not Working
- It's best to place the `script` tag for your `app.js` file just before the closing tag of your body (at the end of your `index.html` file) with all of your HTML above the script tag. 
- A better aproach is to listen for a DOM-Ready event and only add event listeners for the board when this event fires.

## Alternate between X and O
- Instead of placing a X each time the board is clicked, create a variable that keeps track of which player's turn is next. A boolean works but other options work too.
- After you place an X or O, swap the state of this variable for the next play.

## Implement the rules of Tic Tac Toe
- Before placing an X or O, ensure the clicked board square is empty. If the position is already occupied, don't place an X or O and do not move on to the next player's turn.
- After each play, look for 3 in a row, either diagonally, horizontally and vertically. Also be sure to check to see if the board is full.
- If either condition is met, display a message and do not allow any additional plays.

## Resetting the Game
- Add a button in `index.html` and a corresponding event listener inside `app.js`. When clicked, reset the state of the player (X vs O) and clear the board. Don't forget to clear the message too.

## Separation of Concerns
- Don't rely on the DOM to tell you if a square is occupied. Rather, use an object to track which player is where and ask that object if the next play is possible (the next play is being considered each time a click event fires on one of the squares). When you attempt to make a play, the function should report if the play was allowed.
- Don't modify the player turn inside the event handler. Rather, store this state in an object that encapsulates state and behavior (toggling player turn) and invoke that function switch player turns. Use the information from the previous step to determine the appropriate course of action.
- Don't manipulate the DOM inside the event handler. Instead, write a  function that places an X or O at a specific location and call that functions from the event handler if the play is allowed. Obtain the appropriate value (X vs O) from the object that is tracking player turns.


