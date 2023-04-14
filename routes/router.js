// Define the routes
const express = require('express');
const router = express.Router();
const Shipwreck = require('../models/shipwreck');


// GET /search - Render search form template
router.get('/search', (req, res) => {
  res.render('search-form');
});

// POST /search - Handle search form submission
router.post('/search', async (req, res) => {
  try {
    const page = parseInt(req.body.page);
    const perPage = parseInt(req.body.perPage);
    const depth = parseInt(req.body.depth);
    const skip = (page - 1) * perPage;
    const filter = depth ? { depth: depth } : {};
    console.log(filter);
    const shipwrecks = await Shipwreck.find(filter).skip(skip).limit(perPage);
    console.log(shipwrecks)
    res.render('search-result', { shipwrecks });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// POST /api/data - Add a new "shipwreck" document to the collection
router.post('/data', async (req, res) => {
    try {
      const { recrd, vesslterms, feature_type, chart, latdec, londec, gp_quality, depth, sounding_type, history, quasou, watlev, coordinates } = req.body;
      console.log(recrd)
      const newShipwreck = new Shipwreck({
        recrd,
        vesslterms,
        feature_type,
        chart,
        latdec,
        londec,
        gp_quality,
        depth,
        sounding_type,
        history,
        quasou,
        watlev,
        coordinates,
      });
  
      await newShipwreck.save();
      res.status(201).send(newShipwreck);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  // GET /api/data - Get all "shipwreck" objects for a specific page and optional depth filter
  router.get('/data', async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const perPage = parseInt(req.query.perPage);
      const depth = parseInt(req.query.depth);
      const skip = (page - 1) * perPage;
      const filter = depth ? { depth: depth } : {};
      console.log(filter);
      const shipwrecks = await Shipwreck.find(filter).skip(skip).limit(perPage);
      res.send(shipwrecks);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  // GET /api/data/:id - Get a specific "shipwreck" object by ID
  router.get('/data/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const shipwreck = await Shipwreck.findById(id);
      if (!shipwreck) {
        res.status(404).send();
      } else {
        res.send(shipwreck);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  // PUT /api/data/:id - Update a specific "shipwreck" object by ID
  router.put('/data/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      console.log(updates);
      const options = { new: true };
      const shipwreck = await Shipwreck.findByIdAndUpdate(id, updates, options);
      if (!shipwreck) {
        res.status(404).send();
      } else {
        res.send(shipwreck);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  // DELETE /api/data/:id - Delete a specific "shipwreck" object by ID
  router.delete('/data/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const shipwreck = await Shipwreck.findByIdAndDelete(id);
      if (!shipwreck) {
        res.status(404).send();
      } else {
        res.send(shipwreck);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  






  // Export the router
  module.exports = router;  