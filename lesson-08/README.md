# Lesson 08: Search Function (React + Express + MySQL)

In this lesson you will add a **search feature** to the CRUD app you built in Lesson 07.

## Learning Objectives (SWBAT)

- Build a search UI using React state + a GET request
- Use SQL `SELECT ... WHERE ...` to retrieve specific rows from MySQL
- Display search results in the React UI

## What You Start With (Starter Code)

If you choose to start from the provided starter (Option B in Step 0), it already includes the Lesson 07 baseline so you can focus on **search**:

- React client with an **insert form**: `/workspaces/c2c-full-stack-102/lesson-08/starter/app/client`
- Express server with a **MySQL connection + insert route**: `/workspaces/c2c-full-stack-102/lesson-08/starter/app/server`

You will do your work in:

- `/workspaces/c2c-full-stack-102/lesson-08/app` (you will create this by copying one of the options below)

You will add:

- A new React component: `Search.js`
- A new Express route: `GET /api/customers/search`

## Requirements / Resources

- MySQL connection info (dev container defaults):
  - Host: `127.0.0.1`
  - Port: `3306`
  - User: `root`
  - Password: `password`
- SQL `SELECT` reference: https://www.w3schools.com/sql/sql_select.asp

## One-time Database Setup (if you don’t already have it)

In MySQL (Database Client extension or terminal), create the database/table used by the starter:

```sql
CREATE DATABASE IF NOT EXISTS example;

USE example;

CREATE TABLE IF NOT EXISTS customers (
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100),
	dob VARCHAR(20)
);
```

## Step 0: Create Your Working App Folder

Before you start coding, create the working folder for this lesson by copying an `app/` directory into `lesson-08/app`.

Option A: copy **your completed app from the prior lesson**:

```bash
cp -r /workspaces/c2c-full-stack-102/lesson-07/app /workspaces/c2c-full-stack-102/lesson-08/app
```

Option B: if you don’t have a working prior lesson app yet, copy the provided starter:

```bash
cp -r /workspaces/c2c-full-stack-102/lesson-08/starter/app /workspaces/c2c-full-stack-102/lesson-08/app
```

After this step, you should have:

- `/workspaces/c2c-full-stack-102/lesson-08/app/client`
- `/workspaces/c2c-full-stack-102/lesson-08/app/server`

## Run the App (2 terminals)

Server:

```bash
cd /workspaces/c2c-full-stack-102/lesson-08/app/server
npm install
npm run devStart
```

Client:

```bash
cd /workspaces/c2c-full-stack-102/lesson-08/app/client
npm install
npm run start
```

Open the client at `http://localhost:3000`.

### Codespaces note (fixing the common “CORS” error)

If you’re running this in a GitHub Codespace, **do not hard-code** `http://localhost:3001` in your React app.

In Codespaces, your browser is not “inside” the container, so `localhost:3001` points to your own computer—not the Codespace—so requests fail and often show up as a CORS error.

Fix (recommended): use the React dev server proxy + relative URLs.

1. In the client `package.json`, add:

```json
"proxy": "http://localhost:3001"
```

2. In your React code, call the API with **relative paths**:

- `Axios.post("/api/insert", ...)`
- `axios.get("/api/customers/search?lastName=...", ...)`

Example (insert from `App.js`):

```js
Axios.post("/api/insert", {
  firstName: firstName,
  lastName: lastName,
  email: email,
  dob: dob,
});
```

3. Restart the React dev server after changing `package.json`.

## Section 1: Build the Search Component (client)

### Step 1: Create `Search.js`

Create a new file:

- `/workspaces/c2c-full-stack-102/lesson-08/app/client/src/Search.js`

Use this structure (adapt labels/text as you like):

```js
import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send searchTerm as a query parameter
      const response = await axios.get(
        `/api/customers/search?lastName=${searchTerm}`,
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3>Search customers by last name</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <button type="submit">Search</button>

      <div className="search-results">
        {searchResults.map((customer, index) => (
          <div key={`${customer.email}-${index}`}>
            <h4>
              {customer.first_name} {customer.last_name}
            </h4>
            <p>Email: {customer.email}</p>
            <p>DOB: {customer.dob}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default Search;
```

### Step 2: Display the Search Component in `App.js`

Open:

- `/workspaces/c2c-full-stack-102/lesson-08/app/client/src/App.js`

Then:

1. Import the component at the top:

```js
import Search from "./Search";
```

2. Render it somewhere in the return (example):

```jsx
<div id="search">
  <Search />
</div>
```

## Section 2: Add the Search Route (server)

Open:

- `/workspaces/c2c-full-stack-102/lesson-08/app/server/index.js`

Create a new GET route:

- `GET /api/customers/search`

Requirements for your route:

1. Extract the query parameter from the request:

```js
const lastName = req.query.lastName;
```

2. Run a parameterized SELECT query:

```sql
SELECT * FROM customers WHERE last_name = ?;
```

3. Send the results back as JSON.
4. If there is an error, respond with status `500`.

Example shape:

```js
app.get("/api/customers/search", (req, res) => {
  const lastName = req.query.lastName;
  const query = "SELECT * FROM customers WHERE last_name = ?";

  db.query(query, [lastName], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.json(results);
  });
});
```

## Checkpoint: Test the Feature

1. Insert a few customers using the form.
2. Use the search bar to search for a last name you inserted.
3. Confirm you see a list of matching customers.

## End State Reference

The completed Lesson 08 app is provided in:

- `/workspaces/c2c-full-stack-102/lesson-09/starter/app`
