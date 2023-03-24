import request from 'supertest';
import app from '../../app';
import AppDataSource, { seedDb } from '../../dataSource';

let propertyId = 1;

describe('propertyRoutes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedDb();
  });

  describe('GET /properties', () => {
    it('should return all properties', async () => {
      const { body } = await request(app).get('/properties');

      expect(body).toHaveProperty('data');
      expect(body.data).toBeInstanceOf(Array);
      expect(body.data.length).toEqual(10); // paginated size

      expect(body.data[0]).toHaveProperty('address');
      expect(body.data[0].address).toEqual('74434 East Sweet Bottom Br #18393');
      expect(body.data[0]).toHaveProperty('price');
      expect(body.data[0].price).toEqual(20714261);
      expect(body.data[0]).toHaveProperty('bedrooms');
      expect(body.data[0].bedrooms).toEqual(2);
      expect(body.data[0]).toHaveProperty('bathrooms');
      expect(body.data[0].bathrooms).toEqual(5);
      expect(body.data[0]).toHaveProperty('type');
      expect(body.data[0].type).toEqual(null);

      expect(body).toHaveProperty('meta');
      expect(body.meta).toHaveProperty('page');
      expect(body.meta.page).toEqual(1);
      expect(body.meta).toHaveProperty('size');
      expect(body.meta.size).toEqual(10);
      expect(body.meta).toHaveProperty('total');
      expect(body.meta.total).toEqual(126);
      expect(body.meta).toHaveProperty('numOfPages');
      expect(body.meta.numOfPages).toEqual(13);
      expect(body.meta).toHaveProperty('hasNextPage');
      expect(body.meta.hasNextPage).toEqual(true);
      expect(body.meta).toHaveProperty('hasPreviousPage');
      expect(body.meta.hasPreviousPage).toEqual(false);
    });
  });

  describe('GET /properties/1', () => {
    it('should return single property by id', async () => {
      const { body } = await request(app).get('/properties/1');

      expect(body).toHaveProperty('address');
      expect(body.address).toEqual('74434 East Sweet Bottom Br #18393');
      expect(body).toHaveProperty('price');
      expect(body.price).toEqual(20714261);
      expect(body).toHaveProperty('bedrooms');
      expect(body.bedrooms).toEqual(2);
      expect(body).toHaveProperty('bathrooms');
      expect(body.bathrooms).toEqual(5);
      expect(body).toHaveProperty('type');
      expect(body.type).toEqual(null);
    });
  });

  describe('GET /properties/INVALID', () => {
    it('should return and 404 error', async () => {
      const response = await request(app).get('/properties/55555');
      const { body, statusCode } = response;

      expect(statusCode).toEqual(404);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('stack');
    });
  });

  describe('UPDATE /properties/1', () => {
    it('should return single property by id', async () => {
      const { body } = await request(app)
        .put('/properties/1')
        .send({ address: '459 Burilla' });

      expect(body).toHaveProperty('affected');
      expect(body.affected).toEqual(1);
    });
  });

  describe('UPDATE /properties/1 INVALID', () => {
    it('should return 500 error', async () => {
      const response = await request(app)
        .put('/properties/1')
        .send({ junk: '459 Burilla' });

      const { body, statusCode } = response;

      expect(statusCode).toEqual(500);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('stack');
    });
  });

  describe('CREATE /properties', () => {
    it('should add a single property', async () => {
      const sample = {
        address: '84431 East Sweet Bottom Br',
        price: 20714261,
        bedrooms: 5,
        bathrooms: 3,
      };

      const { body } = await request(app).post('/properties').send(sample);

      expect(body).toHaveProperty('raw');
      expect(body.raw).toEqual(expect.any(Number));

      propertyId = body.raw;
    });
  });

  describe('DELETE /properties/:id', () => {
    it('should delete a property by id', async () => {
      const { body } = await request(app).delete(`/properties/${propertyId}`);

      expect(body).toHaveProperty('affected');
      expect(body.affected).toEqual(1);
    });
  });

  describe('CREATE /properties INVALID', () => {
    it('should return 500 error', async () => {
      const response = await request(app)
        .post('/properties')
        .send({ junk: '459 Burilla' });

      const { body, statusCode } = response;

      expect(statusCode).toEqual(500);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('stack');
    });
  });

  describe('CREATE /properties INVALID type', () => {
    it('should return 500 error', async () => {
      const sample = {
        address: '84431 East Sweet Bottom Br',
        price: 20714261,
        bedrooms: 5,
        bathrooms: 3,
        type: 'junk',
      };
      const response = await request(app).post('/properties').send(sample);

      const { body, statusCode } = response;

      expect(statusCode).toEqual(500);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('stack');
    });
  });
});
