import request from 'supertest';
import app from '../index';
import connectDB from '../config/db';
import mongoose from 'mongoose';

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Movies API', () => {

    let createdMovieId: string;

    it('should add a new movie', async () => {
        const response = await request(app)
            .post('/movies')
            .send({
                title: "The Matrix",
                genre: "Sci-Fi",
                rating: 8.7,
                streamingLink: "http://example.com/matrix"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("The Matrix");
        createdMovieId = response.body._id;
    });

    it('should list all movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should search for a movie by title', async () => {
        const response = await request(app).get('/movies/search?q=Matrix');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].title).toBe("The Matrix");
    });

    it('should update an existing movie', async () => {
        const response = await request(app)
            .put(`/movies/${createdMovieId}`)
            .send({
                rating: 9.0,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.rating).toBe(9.0);
    });

    it('should delete a movie', async () => {
        const response = await request(app)
            .delete(`/movies/${createdMovieId}`);

        expect(response.statusCode).toBe(204);


        const fetchResponse = await request(app)
            .get(`/movies/${createdMovieId}`);

        expect(fetchResponse.statusCode).toBe(404);
    });
});
