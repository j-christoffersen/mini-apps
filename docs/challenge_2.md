# CSV Report Generator

## Basic Requirements

Use Express to build a single-page client-server app that generates CSV reports from JSON data.

- Use Express to serve up an `index.html` file and its associated assets
- The client app should be able to submit JSON data to the server, receive a CSV-formatted response and then display the result on the same page.
- Implement all the report generation logic on the server. Do not use any external libraries (such as via npm).

Build your Express app inside `server.js` and your client app inside the client folder. Don't forget to create a `package.json` to store your project's dependencies. 

For basic requirements, data-entry of the JSON on the client should be done using an HTML `form` with a `textarea` input field and a `submit`button. When the user clicks submit, POST the form data to the server.

A single page app means that once the page loads, no user-generated actions on the page may cause the entire page to reload. One way this rule could be broken in your implementation is through the use of an HTML form for submitting your JSON data. You will know the page is reloading if you see a change in your URL. You must prevent this behavior from occurring.

You are allowed to use jQuery to make ajax requests, manipulate the DOM and handle any DOM events. For ease of development, be sure to use `nodemon` to watch for changes in your project. Additionally, no CSS styling is necessary. Use the browser's default styling for all elements on your page.

You may assume the JSON data has a regular structure and hierarchy (see included sample file). The server must flatten the JSON hierarchy, mapping each item in the JSON to a single line of CSV report (see included sample output). You may assume child records in the JSON will always be in a property called `children` but you may **not** assume a JSON record has any other specific properties; i.e. any properties that exist besides `children` must be mapped to a column in your CSV report.

Use the coding best practices you learned previously to ensure a clear separation of concerns with well-defined interfaces.

If you get stuck or are not sure how to proceed:
- you may look at the [hints file](docs/hints_2.md) for this challenge to help you along.
- you may use a CSV generator library from npmjs.org.

**DO NOT** take any of these exits without deliberation as this reduces your learning potential. Hints are provided only for the basic requirements.

## Advanced Content

- Add a field to the CSV report that contains a unique identifier (an autoincrementing integer is fine) for each row of the CSV report.
- Add another field to the CSV report that specifies the ID of the parent record. For top-level objects in the JSON, this field will be empty. For any child objects in the JSON hierarchy, this field will refer to the unique identifier in the prior step.
- Add a form field that allows the user to enter a string, which, when present will filter (remove from the CSV report) any records that contain that string.
- Adjust the generation of unique identifiers such that they remain consecutive (no gaps) even after filtering. Ensure that ID references from the child rows to their respective parents are still correct. If a record is filtered that has children, then all children should also be removed.
- Allow some fields to be optional; i.e. some items in the JSON data might have fewer attributes. Collate attributes across all items you encounter and where missing, leave those fields blank in final CSV report.
- Allow the `children` property to be optional. When omitted it means there are no children.
- Format the CSV report that is received from the server and make it look more readable.
- If not already done, reset the form after each submission but leave the last CSV report on the page.
- Submit the JSON data using a file picker/upload or `textarea` and use AJAX to serialize the form and submit the data to the server.
- Refactor to using `fetch` instead of AJAX (`fetch` is the modern approach to server communication).

## Nightmare Mode

- Refactor to use ES6 classes on the server and client. Transpile using `babel`. Add a build script to your `package.json`
- Store each conversion in a database (suggestion: MongoDB)
- Create a page that shows historical conversions and page that lets you view any single conversion. Render all pages using server-side rendering techniques. Be sure to include some navigation.
- Add support for drag and drop of JSON files
