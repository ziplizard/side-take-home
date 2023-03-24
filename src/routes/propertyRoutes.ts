import express from 'express';
// import bodyParser from 'body-parser'; // Deprecated as of Express 4.0
import { PropertyService } from '../services';
const { validator, notFound } = require('../middlewares');

export const propertyRoutes = express.Router();

// propertyRoutes.use(bodyParser.json());
propertyRoutes.use(express.json()); // Built into Express as of 4.0

// By nature of this endpoint - no need to validate via Joi
propertyRoutes.get('/', async (req, res, next) => {
  let result;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const size = req.query.size ? parseInt(req.query.size as string) : 10; // maybe default this to null so they truly can get 'all'
  // maybe enforce max size - so cannot overloaded

  try {
    result = await PropertyService.getAll(page, size);

    // no results: return 404
    if (result.data.length === 0) {
      return notFound(req, res, next); // 204 would only be if match was found - but it was empty
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
});

// By nature of this endpoint - no need to validate via Joi
propertyRoutes.get('/:id', async (req, res, next) => {
  let result;

  const propertyId = parseInt(req.params.id as string);

  try {
    result = await PropertyService.getById(propertyId);

    // not found: return 404
    if (!result) {
      return notFound(req, res, next);
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
});

propertyRoutes.post('/', validator('create'), async (req, res, next) => {
  let result;

  try {
    result = await PropertyService.create(req.body);

    res.send(result); // todo: more elegant standardized response
  } catch (error) {
    next(error);
  }
});

propertyRoutes.put('/:id', validator('update'), async (req, res, next) => {
  let result;
  const propertyId = parseInt(req.params.id as string);

  try {
    result = await PropertyService.update(propertyId, req.body);

    res.send(result); // todo: more elegant standardized response
  } catch (error) {
    next(error);
  }
});

// By nature of this endpoint - no need to validate via Joi
propertyRoutes.delete('/:id', async (req, res, next) => {
  let result;
  const id = parseInt(req.params.id as string);

  try {
    result = await PropertyService.delete(id);

    res.send(result); // todo: more elegant standardized response
  } catch (error) {
    next(error);
  }
});
