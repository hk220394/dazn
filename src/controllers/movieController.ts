import { Request, Response } from 'express';
import * as movieService from '../services/movieService';

export const listMovies = async (req: Request, res: Response): Promise<Response> => {
    const movies = await movieService.getAllMovies();
    return res.json(movies);
};

export const searchMovies = async (req: Request, res: Response): Promise<Response> => {
    const query = req.query.q as string;
    const movies = await movieService.searchMovies(query);
    return res.json(movies);
};

export const addMovie = async (req: Request, res: Response): Promise<Response> => {

    const { title, genre, rating, streamingLink } = req.body;
    if (!title || !genre || !rating || !streamingLink) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newMovie = await movieService.addMovie(req.body);
        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding movie', error });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<Response> => {

    try {
        const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
        if (!updatedMovie) return res.status(404).send('Movie not found');
        return res.json(updatedMovie);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating movie', error });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<Response> => {

    try {
        const deletedMovie = await movieService.deleteMovie(req.params.id);
        if (!deletedMovie) return res.status(404).send('Movie not found');
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting movie', error });
    }
};
