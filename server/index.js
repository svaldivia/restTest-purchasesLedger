const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.set('appPath',__dirname.replace('server', '') + 'app');

app.use(express.static(app.get('appPath')));
app.use(bodyParser.json());

// Routes
require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
