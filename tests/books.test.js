process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../src/app');

describe('Book API', () => {
  const sampleBook = {
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 20,
    isbn: '1234567890123',
    publishedDate: '2018-10-16'
  };

  it('creates a book', async () => {
    const response = await request(app).post('/api/v1/books').send(sampleBook);

    expect(response.statusCode).toBe(201);
    expect(response.body.data.title).toBe(sampleBook.title);
    expect(response.body.data.id).toBeDefined();
  });

  it('returns all books with pagination metadata', async () => {
    await request(app).post('/api/v1/books').send(sampleBook);

    const response = await request(app).get('/api/v1/books?page=1&limit=10');

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination.total).toBe(1);
  });

  it('returns a single book by id', async () => {
    const created = await request(app).post('/api/v1/books').send(sampleBook);

    const response = await request(app).get(`/api/v1/books/${created.body.data.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.author).toBe(sampleBook.author);
  });

  it('updates a book', async () => {
    const created = await request(app).post('/api/v1/books').send(sampleBook);

    const response = await request(app)
      .put(`/api/v1/books/${created.body.data.id}`)
      .send({ price: 25 });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.price).toBe(25);
  });

  it('deletes a book', async () => {
    const created = await request(app).post('/api/v1/books').send(sampleBook);

    const response = await request(app).delete(`/api/v1/books/${created.body.data.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app).post('/api/v1/books').send({
      title: '',
      author: '',
      price: -1
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Validation failed');
  });
});
