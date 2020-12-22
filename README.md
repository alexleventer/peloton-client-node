# peloton-client-node

A node client for making requests to the Peloton API. _Currently a work in progress._

## Usage

```js
const { peloton } = require('peloton-client-node');

async function example() {
  await peloton.authenticate({
    username: 'your-peloton-username-or-email',
    password: 'your-peloton-password',
  });

  // Get your own personal information
  const myInfo = await peloton.me();

  // Get your workout info
  const myLast10Workouts = await peloton.workouts({
    limit: 10,
    page: 0,
  });
}
```

## Documenation

- [`peloton.authenticate(options)`](#pelotonauthenticateoptions) - authenticate the session
- [`peloton.me()`](#pelotonme) - get authenticated user info
- [`peloton.workouts(options)`](#pelotonworkoutoptions) - get workouts of authetnicated user

### `peloton.authenticate(options)`

#### Description
Authenticates the session. Must be called before any other methods are called.

#### Arguments
- `options` - options object
  - `username` - the username or email of the authenticating Peloton account (**required**)
  - `password` - the password of the authenticating Peloton account (**required**)

### Usage
```js
await peloton.authenticate({
  username: 'your-peloton-username-or-email',
  password: 'your-peloton-password',
});
```

### `peloton.me()`

#### Description
Gets the authenticated users information. 
_Must have called `peloton.authenticate` before this method can be used._

#### Usage
```js
await peloton.me();
```

### `peloton.user(options)`

#### Description
Gets the details of the specified user or yourself if none is specified.

#### Arguments
- `options` - options object
  - `userId` - the ID of the user to fetch information of (default: authenticated userId)

#### Usage
```js
const userInfo = await peloton.user({ userId: 'some-user-id' });
```

### `peloton.workouts(options)`

#### Description
Gets the workouts of the authenticated user.

#### Arguments
- `options` - options object
  - `limit` - limit the number of workouts returned (default: `10`)
  - `page` - the page of the results to fetch (default: `0`)
  - `joins` - _UNSURE:_ some sort of join key. I believe it may expand the keys provided (default: `'ride'`)

### Usage
```js
const workoutsRes = await peloton.workouts({
  limit: 100,
  page: 0,
  joins: 'ride',
});
```

## References

This was inspred from [this](https://github.com/geudrik/peloton-client-library) python library as well as the [API Docs](https://github.com/geudrik/peloton-client-library/blob/master/API_DOCS.md) written there.