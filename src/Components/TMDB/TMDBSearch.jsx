import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const TMDB_API_KEY = '0271e07fb7d5c0183c6e21f0a2a0932a'; // Replace with your actual TMDB API key
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for TMDB images

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            query: query,
            api_key: TMDB_API_KEY, // Include your API key here
          },
        });
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Overview</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Popularity</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Release Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>
                  {movie.poster_path ? (
                    <img
                      src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </TableCell>
                <TableCell>{movie.overview}</TableCell>
                <TableCell>{movie.vote_average}</TableCell>
                <TableCell>{movie.popularity}</TableCell>
                <TableCell>{movie.original_language}</TableCell>
                <TableCell>{movie.release_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchResults;
