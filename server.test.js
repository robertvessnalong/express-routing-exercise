const request = require('supertest');
const app = require('./server');
describe('Mean, Median, and Mode', () => {
  test('should return the mean', async () => {
    const res = await request(app).get('/mean?nums=1,2,3,4');
    expect(res.body).toEqual({ operation: 'mean', value: 2.5 });
  });
  test('should return the median', async () => {
    const res = await request(app).get('/median?nums=100,200,300,400');
    expect(res.body).toEqual({ operation: 'median', median: 250 });
  });
  test('should return the mode', async () => {
    const res = await request(app).get('/modes?nums=100,200,300,400');
    expect(res.body).toEqual({
      operation: 'modes',
      mode: { 100: 1, 200: 1, 300: 1, 400: 1 },
    });
  });
  test('should throw error', async () => {
    const res = await request(app).get('/modes');
    expect(res.body).toEqual({
      error: { message: 'Nums was not included in parameters', status: 400 },
    });
    expect(res.statusCode).toEqual(400);
  });
});
