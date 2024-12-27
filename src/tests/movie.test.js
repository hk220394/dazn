"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const db_1 = __importDefault(require("../config/db"));
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('Movies API', () => {
    let createdMovieId;
    it('should add a new movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
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
    }));
    it('should list all movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/movies');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    }));
    it('should search for a movie by title', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/movies/search?q=Matrix');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].title).toBe("The Matrix");
    }));
    it('should update an existing movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .put(`/movies/${createdMovieId}`)
            .send({
            rating: 9.0,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.rating).toBe(9.0);
    }));
    it('should delete a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .delete(`/movies/${createdMovieId}`);
        expect(response.statusCode).toBe(204);
        const fetchResponse = yield (0, supertest_1.default)(index_1.default)
            .get(`/movies/${createdMovieId}`);
        expect(fetchResponse.statusCode).toBe(404);
    }));
});
