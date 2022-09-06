import React, { useEffect, useState } from 'react'
import "./DeleteMovies.css";
import styled from "styled-components";
import db from "../firebase";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


function DeleteMovies() {

    const getData = () =>{
        db.collection("movies").get().then((querySnapshot) => {
            
            querySnapshot.forEach(element => {
                var data = element.data();
                // setTemp({element.id ,...data.title});
                setTemp(prevMovie => [
                    ...prevMovie,
                    {id: element.id, title: data.title},
                ])
                setMovies( arr => [...arr , data]);
            });
        })
    }


    const [movies,setMovies] = useState([]);
    const [temp,setTemp] = useState([]);
    // const [sortedMovies,setSortedMovies] = useState([]);
    useEffect(()=>{
        db.collection("movies").get().then((querySnapshot) => {
            
            querySnapshot.forEach(element => {
                var data = element.data();
                // setTemp({element.id ,...data.title});
                setTemp(prevMovie => [
                    ...prevMovie,
                    {id: element.id, title: data.title},
                ])
                setMovies( arr => [...arr , data]);
            });
        })
        // console.log(temp);
    },[])

    const uniqueIds = [];

    const uniquemovies =  temp.filter(element => {
        const isDuplicate = uniqueIds.includes(element.title);

        if (!isDuplicate) {
        uniqueIds.push(element.title);

        return true;
        }

        return false;
    });



    const [Delmovie, setDelMovie] = React.useState('');

    const handleChange = (event) => {
        setDelMovie(event.target.value);
    };


    const deleteMovie = (title) =>{

        if(title !== ""){
            uniquemovies.map((movie)=>{
                if(movie.title === title){
                    console.log(movie.id);
                    db.collection("movies").doc(movie.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                        alert("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                    getData();
                }
            })
            
        }
        else{
            alert("select movie")
        }
    }


    return (
        <div>
            <Container>
                <h1>Delete Movies</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" focused>Select Movie</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Delmovie}
                        label="Select Movie"
                        onChange={handleChange}
                        sx={{color : "white"}}
                    >
                        {
                            uniquemovies.map((data) => (
                                // <p key={data.title}>{data.title}</p>
                                <MenuItem key={data.title} value={data.title}>{data.title}</MenuItem>
                            ))    
                            
                        }
                        {/* <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                    </FormControl>
                    <Button 
                        onClick={()=>deleteMovie(Delmovie)}
                        variant="contained"
                        sx={{ m: 2 }}
                        style={{
                            padding: "11px",
                            color: "white"
                        }}>
                        Delete
                    </Button>
                        
            </Container>
        </div>
    )
}

export default DeleteMovies

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;