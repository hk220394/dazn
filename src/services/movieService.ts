import Movie, { IMovie } from '../models/Movie';

export const getAllMovies = async (): Promise<IMovie[]> => {
    return await Movie.find();
};

export const searchMovies = async (query: string): Promise<IMovie[]> => {
    return await Movie.find({
        $or: [{ title: new RegExp(query, 'i') }, { genre: new RegExp(query, 'i') }],
    });
};

export const addMovie = async (movieData: IMovie): Promise<IMovie> => {
    const movie = new Movie(movieData);
    return await movie.save();
};

export const updateMovie = async (id: string, movieData: Partial<IMovie>): Promise<IMovie | null> => {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
};

export const deleteMovie = async (id: string): Promise<IMovie | null> => {
    return await Movie.findByIdAndDelete(id);
};
