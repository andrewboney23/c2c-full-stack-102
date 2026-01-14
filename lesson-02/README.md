# Lesson 2 — IDE Work

## Goal

Set up the starter **Spotify Music Search** React app in your Codespace/IDE. By the end of Lesson 2, your app should run locally with a Bootstrap-styled search input and have React state set up for:

- the user’s search input (`searchInput`)
- the Spotify API token (`accessToken`)

## 1) Open the React app (already created)

These steps assume you have already run `npx create-react-app music-app`.

1. Open **Terminal** in VS Code.
2. Navigate into the app folder:

   ```bash
   cd /workspaces/c2c-full-stack-102/lesson-02/music-app
   ```

3. Install Bootstrap + React Bootstrap:

```bash
npm install bootstrap react-bootstrap
```

4. Start the dev server:

   ```bash
   npm start
   ```

5. In Codespaces, open the **Ports** tab and open port `3000` in the browser.

## 2) Add Bootstrap

Import Bootstrap CSS.

- Open `music-app/src/index.js`
- Add this line near the top (above your app render):

  ```js
  import "bootstrap/dist/css/bootstrap.min.css";
  ```

## 3) useState Setup Guide

Use this checklist to add the `searchInput` and `accessToken` state variables inside your `App` component.

### Your goal in this step

You are going to set up a state variable for what the user types into the search bar.

By the end of this step, your `App` component should include:

```js
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
}
```

### Where you will work

Open this file in your project:

- `src/App.js` (or `src/App.jsx` depending on your setup)

### Step-by-step instructions

#### 1) Make sure `useState` is imported

At the top of your file, you should see something like:

```js
import { useState, useEffect } from "react";
```

If you do not see `useState` in the import, add it. (You might not use `useEffect` until the next step, and that's okay.)

#### 2) Find the start of your `App` component

Scroll until you see:

```js
function App() {
```

#### 3) Add your `useState` line(s) inside the `App` function

Right after `function App() {` (and above the `return (...)`), add:

```js
const [searchInput, setSearchInput] = useState("");
```

Then copy that pattern to create your access token state:

```js
const [accessToken, setAccessToken] = useState("");
```

### Quick “check your work”

- Your state lines must be inside `function App() { ... }`
- They must be above `return ( ... )`
- You should have: `searchInput` starting as `""` (empty string)
- You should have: `accessToken` starting as `""` (empty string)

## 4) Spotify credentials (outside the IDE, then back in)

You’ll need to create a Spotify Developer app to get:

- **Client ID**
- **Client Secret**

Then come back to `music-app/src/App.js` and paste those values into `CLIENT_ID` and `CLIENT_SECRET`.

## Lesson 2 “Done” checklist

- `lesson-02/music-app` exists and runs with `npm start`
- Bootstrap styles are loaded
- The page shows a search input + button
- `App` contains:
  - `const [searchInput, setSearchInput] = useState("");`
  - `const [accessToken, setAccessToken] = useState("");`
