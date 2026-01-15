# Lesson 3 — IDE Work

## Goal

Add a Bootstrap-styled search input + search button to your React app.

- When the user types in the input, log the key being pressed.
- When the user clicks **Search**, log `clicked button`.

## 1) Create your `.env` file (do this first)

This project reads your API credentials from a local `.env` file.

1. Open **Terminal** and go to the Lesson 3 app folder:

```bash
cd /workspaces/c2c-full-stack-102/lesson-03/music-app
```

2. Create `.env` from the example file:

```bash
cp example.env .env
```

3. Open `.env` and replace the placeholders with your real values (you will paste these in by hand):

```env
REACT_APP_CLIENT_ID=your_client_id_here
REACT_APP_CLIENT_SECRET=your_client_secret_here
```

Important: do not commit `.env` (it contains secrets).

## 2) Open the app

You should already have a terminal open and already be in the Lesson 3 app folder.

1. Confirm you’re in the right directory:

```bash
pwd
```

You should see something like:

`/workspaces/c2c-full-stack-102/lesson-03/music-app`

If you’re not there, run:

```bash
cd /workspaces/c2c-full-stack-102/lesson-03/music-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server (leave this running while you work — it hot reloads as you edit files):

```bash
npm start
```

4. Open the app in your browser (usually at `http://localhost:3000`).

5. Open your browser developer tools (Console tab) so you can see your `console.log(...)` output as you work.

## 3) Add `useEffect` to fetch an auth token

In `src/App.js`, you will add:

- a `useEffect` that fetches an auth token when the app loads

### Where to put this code

1. Open `src/App.js`.
2. Confirm `CLIENT_ID` and `CLIENT_SECRET` already exist near the top of the file (right after your imports).
3. Confirm `accessToken` state already exists in the starter code inside `function App() { ... }`.
4. Put the `useEffect` block inside `function App() { ... }` and **above** the `return (...)`.

### Code to add

Still inside `function App() { ... }` (above `return (...)`), add this `useEffect`:

```js
useEffect(() => {
  // API Access Token
  var authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET,
  };
  fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((result) => result.json())
    .then((data) => {
      setAccessToken(data.access_token);
      console.log("retrieved token:", data.access_token);
    });
}, []);
```

## 4) Add the search UI (Bootstrap components)

Before you update the `return (...)`, make sure `src/App.js` imports the Bootstrap components you’re using:

```js
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
```

Open `src/App.js`, find the `return ( ... )` inside `function App() { ... }`, and replace the contents of the `return` with this:

```jsx
return (
  <Container className="py-4">
    <h1 className="mb-3">Music Search</h1>

    <InputGroup className="mb-3" size="lg">
      <FormControl
        placeholder="Enter an artist name"
        value={searchInput}
        type="input"
        onKeyDown={(event) => console.log("key pressed:", event.key)}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <Button
        variant="primary"
        onClick={() => {
          console.log("clicked button");
        }}
      >
        Search
      </Button>
    </InputGroup>
  </Container>
);
```

## 5) Run and test

With the dev server already running from Step 2, you can immediately verify your changes in the browser.

Then:

1. Type an artist name in the input.
2. Click **Search**.
3. Open the browser dev tools console and confirm you see:

- `key pressed: ...` when typing
- `clicked button` when clicking Search

## 6) Wire up the Search button click handler

Right now, your button is logging `clicked button` using an inline function. Next, you’ll change it so it calls your real click handler function: `search`.

In `src/App.js`, inside your `return (...)`, find the original button code:

```jsx
<Button
  variant="primary"
  onClick={() => {
    console.log("clicked button");
  }}
>
  Search
</Button>
```

Replace it with this version (wired to the handler):

```jsx
<Button variant="primary" onClick={search}>
  Search
</Button>
```

## 7) Call the API when Search is clicked

Now you’ll update your click handler so it makes an authenticated request.

In `src/App.js`, find your `search` function and update it to call the api.

```js
const search = async () => {
  console.log("clicked button");

  var searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  var artistID = await fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
    searchParameters
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
```

## 8) Call `search` when Enter is pressed

Now wire the Enter key so users can press Enter to search.

In `src/App.js`, find your `<FormControl ... />` and update `onKeyDown` to call `search()` when the Enter key is pressed:

```jsx
onKeyDown={(event) => {
  console.log("key pressed:", event.key);
  if (event.key === "Enter") {
    search();
  }
}}
```

## Lesson 3 “Done” checklist

- Bootstrap is installed and the CSS import is present in `src/index.js`
- The page shows a search input and a Search button
- Clicking Search logs: `clicked button`
- `accessToken` exists and is set by `useEffect` on page load
- Clicking Search makes a request and logs the returned JSON
- Pressing Enter in the input triggers `search`
