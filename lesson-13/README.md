# Lesson 13

## Stopping Apps on Ports 3000 or 3001

If you get an error that port 3000 or 3001 is already in use, you may have a previous app still running. To kill any app running on these ports, run the following commands in your terminal:

```sh
# For port 3000:
lsof -ti:3000 | xargs kill -9
# For port 3001:
lsof -ti:3001 | xargs kill -9
```

## Getting Started: Syncing and Environment Setup

1. **Sync your fork with the upstream repository:**
   - Open a terminal in your Codespace or local IDE.
   - Make sure you are on the `main` branch:
     ```sh
     git checkout main
     ```
   - If you have uncommitted changes, stash them to avoid conflicts:
     ```sh
     git stash
     ```
   - Pull the latest changes from the upstream repository:
     ```sh
     git pull upstream main
     ```

## Setup: Running Client and Server in Two Terminals

You will need **two terminals** for this lesson: one for the client app and one for the server app.

### Terminal 1: Client

```sh
cd /workspaces/c2c-full-stack-102/lesson-13/app/client

# Create .env file:
cat > .env <<'EOF'
REACT_APP_API_BASE_URL=http://localhost:3001
EOF

# Install dependencies and start the client
npm install
npm start
```

This will launch the React app

### Terminal 2: Server

```sh
cd /workspaces/c2c-full-stack-102/lesson-13/app/server

# Create .env file (update DB_PASSWORD and DB_NAME as needed):
cat > .env <<'EOF'
# Environment configuration for the Express server
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=password
DB_NAME=ecommerce
PORT=3001
EOF

# Install dependencies and start the server
npm install
npm run dev
```

This will run the Express server with nodemon

## IDE Steps for Lesson 13: Adding Search Functionality

1. **Implement searchTerm state in App.js:**
   - Import `useState` from React.
   - Add:
     ```js
     const [searchTerm, setSearchTerm] = useState("");
     ```
   - Pass `searchTerm` and `setSearchTerm` as props to `NavBar` and `Shopping` components.

2. **Pass searchTerm and setSearchTerm as props:**
   - In your App.js:
     ```js
     <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <Route path="/shopping" element={<Shopping searchTerm={searchTerm} />} />
     ```

3. **Filter products in Shopping.js:**
   - Add `searchTerm` to Shopping's props.
   - Create a `filteredProducts` state and update it with a `useEffect`:
     ```js
     useEffect(() => {
       setFilteredProducts(
         products.filter((product) =>
           product.name.toLowerCase().includes(searchTerm.toLowerCase()),
         ),
       );
     }, [products, searchTerm]);
     ```
   - Render `filteredProducts` instead of `products` in your product list.

4. **Update the server endpoint for search:**
   - In `server/index.js`, update the `/api/ecommerce/products` endpoint:
     ```js
     app.get("/api/ecommerce/products", (req, res) => {
       const searchTerm = req.query.search || "";
       const sql = `SELECT * FROM products WHERE name LIKE ?`;
       const values = [`%${searchTerm}%`];
       db.query(sql, values, (err, result) => {
         res.setHeader("Content-Type", "application/json");
         res.json(result);
       });
     });
     ```

5. **Test your search bar:**
   - Start both the client and server apps.
   - Try searching for products using the search bar and verify the results update as expected.
