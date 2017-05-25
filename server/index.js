'use strict'

const express = require('express');
const http = require('http');
const parser = require('xml2json');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

if (!process.env.APIKEY) {
  console.error('No APIKEY specified');
  process.exit(1);
}

app.post('/api/cats/:imageId/favorite', (req, res) => {

  var options = {
    hostname: 'thecatapi.com',
    path: `/api/images/favourite?api_key=${process.env.APIKEY}&image_id=${req.params.imageId}`
  };

  http.get(options, (xmlRes) => {
    var buffer = '';
    xmlRes.on('data', (chunk) => {
      buffer += chunk;
    });

    xmlRes.on('end', () => {
      res.status(200).json({success:true})
    });
  });
});

app.post('/api/cats/:imageId/vote', (req, res) => {
  if(!req.body.score) {
    return res.status(400).send('Missing parameters');
  }

  var options = {
    hostname: 'thecatapi.com',
    path: `/api/images/vote?api_key=${process.env.APIKEY}&image_id=${req.params.imageId}&score=${req.body.score}`
  };

  http.get(options, (xmlRes) => {
    var buffer = '';
    xmlRes.on('data', (chunk) => {
      buffer += chunk;
    });

    xmlRes.on('end', () => {
      res.status(200).json({success:true})
    });
  });
});

app.get('/api/cats', (req, res) => {

  var options = {
    hostname: 'thecatapi.com',
    path: `/api/images/get?format=xml&results_per_page=20&api_key=${process.env.APIKEY}`
  };

  http.get(options, (xmlRes) => {
    var buffer = '';
    xmlRes.on('data', (chunk) => {
      buffer += chunk;
    });

    xmlRes.on('end', () => {
      var json = parser.toJson(buffer, {object: true});
      res.json(json);
    });
  });

});

app.get('/api/cats/favorites', (req, res) => {

  var options = {
    hostname: 'thecatapi.com',
    path: `/api/images/getfavourites?api_key=${process.env.APIKEY}`
  };

  http.get(options, (xmlRes) => {
    var buffer = '';
    xmlRes.on('data', (chunk) => {
      buffer += chunk;
    });

    xmlRes.on('end', () => {
      var json = parser.toJson(buffer, {object: true});
      res.json(json);
    });
  });

});

app.get('/api/cats/votes', (req, res) => {

  var options = {
    hostname: 'thecatapi.com',
    path: `/api/images/getvotes?api_key=${process.env.APIKEY}`
  };

  http.get(options, (xmlRes) => {
    var buffer = '';
    xmlRes.on('data', (chunk) => {
      buffer += chunk;
    });

    xmlRes.on('end', () => {
      var json = parser.toJson(buffer, {object: true});
      res.json(json);
    });
  });

});

app.listen(3000, () => {
  console.log('Server running on :3000');
});
