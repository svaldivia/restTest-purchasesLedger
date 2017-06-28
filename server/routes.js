const path = require('path');

module.exports = function (app) {
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};
