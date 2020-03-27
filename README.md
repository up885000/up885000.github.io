# RecipeApp

[![Build Status](https://travis-ci.com/up885000/up885000.github.io.svg?branch=master)](https://travis-ci.com/up885000/up885000.github.io)

Software Engineering Theory and Practice CW

Deadline for this project is 27th March!

### Prerequisites

RecipeApp is a web app and so requires node, it also uses a mysql database.
Required modules are included in the package.json and can be installed via "npm install"

```
node.js (npm)
mysql
```

### Installing

Recipe app comes pre-packaged with a quick setup shell script, this script will automatically start whenever "npm start" is run.
Some steps may need to be taken for this to happen though.

```bash
git clone https://github.com/up885000/up885000.github.io.git
cd up885000.github.io
chmod +x quickSetup.bash
npm start
```

Now the server should be running locally with database built.

Documentation can be found [here.](https://up885000.github.io/out/index.html)

A test plan can be found [here](https://up885000.github.io/test/Test%20Plan.pdf) and automated testing can be found [here.](https://up885000.github.io/test/test.html) However, tests that require node to be running and so will show as false-negatives. To view the status of these tests please check the build log [here.](https://travis-ci.com/github/up885000/up885000.github.io)
