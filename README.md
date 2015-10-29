# Giant Bomb API
Package for NodeJS to query and access the Giant Bomb API

[![NPM](https://nodei.co/npm/giantbombapi.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/giantbombapi/)

# Getting Started
To get started you'll need to install this package:

```
npm install --save giantbombapi
```

Then wherever you want to use it you'll need to require the package:

```js
let GiantBombAPI = require('giantbombapi');
```

Finally to use the API you need to create a new object:

```js
let GBAPI = new GiantBombAPI('api-key');
```

You must insert your API Key as the first argument, to which if you don't have you, you can get one from [here](http://www.giantbomb.com/api/).

# Game Searching
To search for a game by a name or a name partial you can use the following:

```js
GBAPI.searchGames('Counter Strike').then(
    function(games) {
        console.log(games);
    },
    function(err) {
        console.error(err);
    }
);
```

The results of this will be an array of game matches returned from Giant Bomb's API.

You can optionally pass an object as the second parameter which has the following options:

```js
{
    namesOnly: true, // Will return an array of the game names only. Defaults to false
    limit: 25 // Will only get this amount of results from the API. Defaults to 100
}
```

# License
This work is licensed under the GNU General Public License v3.0. To view a copy of this license, visit http://www.gnu.org/licenses/gpl-3.0.txt.