"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.searchMovies = exports.listMovies = void 0;
const movieService = __importStar(require("../services/movieService"));
const listMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movieService.getAllMovies();
    return res.json(movies);
});
exports.listMovies = listMovies;
const searchMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    const movies = yield movieService.searchMovies(query);
    return res.json(movies);
});
exports.searchMovies = searchMovies;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, genre, rating, streamingLink } = req.body;
    if (!title || !genre || !rating || !streamingLink) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const newMovie = yield movieService.addMovie(req.body);
        return res.status(201).json(newMovie);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding movie', error });
    }
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedMovie = yield movieService.updateMovie(req.params.id, req.body);
        if (!updatedMovie)
            return res.status(404).send('Movie not found');
        return res.json(updatedMovie);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating movie', error });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMovie = yield movieService.deleteMovie(req.params.id);
        if (!deletedMovie)
            return res.status(404).send('Movie not found');
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting movie', error });
    }
});
exports.deleteMovie = deleteMovie;
