import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, CardMedia, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { apiurl } from '../../../Constants/Apiurl';

const ProducerDetails = () => {
    const { id } = useParams(); // Get the producer ID from the URL
    const [producer, setProducer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducerDetails = async () => {
            try {
                const response = await axios.get(`${apiurl}/producer/${id}`); // Adjust the URL as necessary
                const data = response.data;
                setProducer(data);
            } catch (error) {
                console.error("Error fetching producer details:", error);
            }
        };

        fetchProducerDetails();
    }, [id]);

    if (!producer) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4" align="center">{producer.name}</Typography>
            {producer.ProducerImages.length > 0 && (
                <CardMedia
                    component="img"
                    alt={producer.name}
                    height="200" // Adjusted height for the image
                    image={producer.ProducerImages[0]} // Display the first image
                    style={{ display: 'block', margin: '0 auto' }} // Center the image
                />
            )}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Detail</strong></TableCell>
                            <TableCell><strong>Information</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>{new Date(producer.dob).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>{producer.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bio</TableCell>
                            <TableCell>{producer.bio}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" align="center" className="my-4">Movies Produced:</Typography>
            <Grid container spacing={2} justifyContent="center">
                {producer.movies.map((movie) => (
                    <Grid item key={movie._id} xs={12} sm={6} md={4}>
                        <Card style={{ height: '100%' }}> {/* Make card full height */}
                            <CardMedia
                                component="img"
                                alt={movie.name}
                                height="200" // Adjusted height for movie images
                                image={movie.movieImages[0]} // Display the first image
                                style={{ display: 'block', margin: '0 auto' }} // Center the movie image
                            />
                            <CardContent>
                                <Typography variant="h6" align="center">{movie.name}</Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Description: {movie.plot || 'No description available'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Release Date: {new Date(movie.releaseDate).toLocaleDateString() || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Genre: {movie.genre || 'N/A'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className='flex justify-center gap-6'>
                <Button onClick={() => navigate('/')} variant="contained" color="primary" style={{ marginTop: '20px' }}>Back</Button>
                <Button onClick={() => navigate('/update')} variant="contained" color='secondary' style={{ marginTop: '20px' }}>Update</Button>
            </div>
        </Container>
    );
};

export default ProducerDetails;
