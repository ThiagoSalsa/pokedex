import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import PokemonCard from "../components/PokemonCard";
import { Container, Grid } from "@mui/material";
import axios from "axios";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        getPokemons()   
    }, []);

    const getPokemons = () => {
        var endpoints = [];
        for(var i = 1; i < 50 ; i++ ) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        console.log(endpoints);
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
        return response;
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err));
    };
    
    
    return(
        <div>
            <Navbar />
            <Container maxWidth="xg">
                <Grid container>
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={3} key={key}>
                            <PokemonCard name={pokemon.name}/>
                        </Grid> 
                    ))}
                </Grid>
            </Container>
        </div>
    );
}