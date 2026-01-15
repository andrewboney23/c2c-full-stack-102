# Lesson 4 — IDE Work

## 0) Create your `.env` file (do this first)

This project reads your API credentials from a local `.env` file.

1. Open **Terminal** and go to the Lesson 4 app folder:

```bash
cd /workspaces/c2c-full-stack-102/lesson-04/music-app
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

## 1) Update `search` to store the Artist ID

Next, you’ll update your `search` function so it grabs the **Artist ID** from the first search result, stores it in a variable named `artistID`, and logs it.

In `src/App.js`, find your `search` function and update the Spotify search fetch so it looks like this:

```js
var artistID = await fetch(
  "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
  searchParameters
)
  .then((response) => response.json())
  .then((data) => {
    return data.artists.items[0].id;
  });
```

## 2) Use the Artist ID to fetch albums

Now that you have an `artistID`, you can use it to fetch a list of albums from that artist.

In `src/App.js`, directly after your `artistID` code, add this next fetch:

```js
// Get request with Artist ID grab all the albums from that artist
var returnedAlbums = await fetch(
  "https://api.spotify.com/v1/artists/" +
    artistID +
    "/albums" +
    "?include_groups=album&market=US&limit=50",
  searchParameters
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

## 3) Store the returned albums in `useState`

Right now we can **see** album data in the console, but we want to **store** it in React state so we can display it on the page.

### 3a) Add an `albums` state variable

In `src/App.js`, add this `useState` hook near your other state variables:

```js
const [albums, setAlbums] = useState([]);
```

### 3b) Set `albums` from the fetch response

Update your albums fetch so it assigns the returned album list into state:

```js
var returnedAlbums = await fetch(
  "https://api.spotify.com/v1/artists/" +
    artistID +
    "/albums" +
    "?include_groups=album&market=US&limit=50",
  searchParameters
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setAlbums(data.items);
    return albums;
  });
```

## 4) Display the album results in the UI

Now that `albums` is stored in state, let’s display it on the page.

### 4a) Import `Row` and `Card`

In `src/App.js`, update your React-Bootstrap import to include `Row` and `Card`:

```js
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
```

### 4b) Add a results container that maps over `albums`

In `src/App.js`, inside your `return (...)`, add this **below** the `<InputGroup ...>`:

```jsx
<Container>
  <Row className="mx-2 row row-cols-4">
    {albums.map((album, i) => {
      console.log(album);
      return (
        <Card key={i}>
          <Card.Img src={album.images[0].url} />
          <Card.Body>
            <Card.Title>{album.name}</Card.Title>
          </Card.Body>
        </Card>
      );
    })}
  </Row>
</Container>
```
