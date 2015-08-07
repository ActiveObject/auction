## Development

You need [node.js](https://nodejs.org/download) installed on your machine.

Install dependencies:
```
npm install
```

Run api server:
```
npm start
```

Run webpack dev server:
```
npm run dev
```

Now you should be able to access the app on http://localhost:5004

## Deploy

Api server is running on Heroku platform. You don't need to run deploy manually, just push changes to master branch
and heroku will automatically build a new version of the api server.

Browser app is running on http://surge.sh platform.

Deploy browser app:

```
npm run deploy
```

Now you can see results on http://auction.activeobject.me

