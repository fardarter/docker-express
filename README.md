# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run

`node app.js`

Visit http://localhost:8080 in your browser

### Tests

To run tests, run `npm run jest` in the console at root.

### High level application requirements

1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks

1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus

4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
>
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution

Explain what you have done here and why...

- Comments:

  - I've come to believe that dating comments is deeply useful as it allows a follow up reader to weight the comments against how recent they are.

- HTML:

  - From my knowledge of semantic HTML convention, buttons represent actions while anchor tags represent navigation.
    I know the underlying action is navigation with the `href`, but it still doesn't feel like correct semantics to me, but happy to be disagreed with.
  - I've also added an aria-label where for style I've removed the `label` tags.
  - I've added a hidden field on the front to pass the `toEdit` value back as I'm already uncomfortable
    enough managing state with mutating arrays and would rather make the routing function more pure.

- Methods:

  - Edit feature:
    To make the edit feature work I've added an edit method to select the index of the item to edit and also a way to cancel the edit. This permits me to render the box alongside. I've added a replace method to manage construction/insertion of the new todolist array.
  - Reset:
    Adding reset made this both easier to code and improved (IMO) the user experience.
  - Changing routes:
    Needed some organisation. Everything on `app` smells like a code smell.

  - Testing:
    - I suppose I should pretend everything went swimmingly. Actually this was really hard. I reorganised the routes to use `.render()` instead of redirect because it was the only way I was able to figure out how to look at the values I was rendering. I'm not overly pleased about testing by DOM lookup either, but give where state is residing none of the functions are pure and I wasn't able to come up with a scheme to make them so. In addition, I wasn't able to get the server to reset for each test, so the sad fact is that my tests here are stateful. The one good things I'll say for myself here is that the coverage is decent and I think I got some of the core needs tested. One comment I'll make is that it doesn't strike me that basic `express` functionality needs testing from something like a code exam as it would surely have been well tested by the organisation.
