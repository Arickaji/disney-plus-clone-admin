import React, { useEffect, useState } from 'react'
import "./DeleteMovies.css";
import styled from "styled-components";
import db from "../firebase";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';




function UpdateMovies() {

    const [title, setTitle] = useState("");
    const [subTitle, setsubTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [backgroundImage, setBackGroundImage] = useState("");
    const [cardImg, setCardImg] = useState("");
    const [titleImg, setTitleImg] = useState("");
    const [updataId, setUpdateId] = useState("");

    const getData = () => {
        db.collection("movies").get().then((querySnapshot) => {

            querySnapshot.forEach(element => {
                var data = element.data();
                // setTemp({element.id ,...data.title});
                setTemp(prevMovie => [
                    ...prevMovie,
                    {
                        id: element.id, title: data.title, titleImg: data.titleImg, type: data.type, subTitle: data.subTitle, description: data.description,
                        cardImg: data.cardImg, backgroundImg: data.backgroundImg
                    },
                ])
                setMovies(arr => [...arr, data]);
            });
        })
    }

    const updateData = () => {
        db.collection('movies').doc(updataId).set({
            title: title,
            titleImg: titleImg,
            type: type,
            subTitle: subTitle,
            description: description,
            cardImg: cardImg,
            backgroundImg: backgroundImage
        }, { merge: true })    
        alert("successfully updated");
        setTitle("")
        setsubTitle("")
        setType("")
        setDescription("")
        setBackGroundImage("")
        setTitleImg("")
        setUpdateId("")
        setCardImg("")
        setupdateMovie("")
        getData("")
    }


    const handleState = (event) => {
        if (event.target.id === "title") {
            setTitle(event.target.value);
        }
        else if (event.target.id === "subTitle") {
            setsubTitle(event.target.value);
        }

        else if (event.target.id === "type") {
            setType(event.target.value);
        }

        else if (event.target.id === "description") {
            setDescription(event.target.value);
        }

        else if (event.target.id === "backgroundImage") {
            setBackGroundImage(event.target.value);
        }

        else if (event.target.id === "cardImage") {
            setCardImg(event.target.value);
        }

        else if (event.target.id === "titleImage") {
            setTitleImg(event.target.value);
        }
    }

    const [movies, setMovies] = useState([]);
    const [temp, setTemp] = useState([]);
    // const [sortedMovies,setSortedMovies] = useState([]);
    useEffect(() => {
        db.collection("movies").get().then((querySnapshot) => {

            querySnapshot.forEach(element => {
                var data = element.data();
                // setTemp({element.id ,...data.title});

                // backgroundImg: backgroundImage,
                // cardImg : cardImg,
                // description : description,
                // subTitle : subTitle,
                // title : title,
                // titleImg : titleImg,
                // type : type
                setTemp(prevMovie => [
                    ...prevMovie,
                    {
                        id: element.id, title: data.title, titleImg: data.titleImg, type: data.type, subTitle: data.subTitle, description: data.description,
                        cardImg: data.cardImg, backgroundImg: data.backgroundImg
                    },
                ])
                setMovies(arr => [...arr, data]);
            });
        })
        // console.log(temp);
    }, [])

    const uniqueIds = [];

    const uniquemovies = temp.filter(element => {
        const isDuplicate = uniqueIds.includes(element.title);

        if (!isDuplicate) {
            uniqueIds.push(element.title);

            return true;
        }

        return false;
    });



    const [updateMovie, setupdateMovie] = React.useState('');

    const handleChange = (event) => {
        setupdateMovie(event.target.value);
        uniquemovies.map((movie) => {
            if (movie.title === event.target.value) {
                console.log(movie);
                setUpdateId(movie.id);
                setTitle(movie.title)
                setsubTitle(movie.subTitle)
                setType(movie.type)
                setDescription(movie.description)
                setBackGroundImage(movie.backgroundImg)
                setCardImg(movie.cardImg)
                setTitleImg(movie.titleImg)
            }
            // if (movie.title === updateMovie) {
            //     console.log(movie);
            // }
        })
    };


    const deleteMovie = (title) => {

        if (title !== "") {
            uniquemovies.map((movie) => {
                if (movie.title === title) {
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
        else {
            alert("select movie")
        }
    }

    return (
        <div>
            <Container>
                <h1>Update Movies</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" focused>Select Movie</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateMovie}
                        label="Select Movie"
                        onChange={handleChange}
                        sx={{ color: "white" }}
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
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '80%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField required id="title" onChange={handleState} value={title} label="Title" focused sx={{ input: { color: 'white' } }} /><br />
                    <TextField required id="subTitle" onChange={handleState} value={subTitle} label="Subtitle" focused sx={{ input: { color: 'white' } }} /><br />
                    <TextField required id="type" onChange={handleState} value={type} label="Type" focused sx={{ input: { color: 'white' } }} /><br />
                    <TextField
                        required
                        onChange={handleState}
                        id="description"
                        value={description}
                        label="Description"
                        multiline
                        maxRows={4}
                        focused
                        inputProps={{ style: { color: "white" } }}
                    /><br />
                    <TextField required id="backgroundImage" onChange={handleState} value={backgroundImage} label="BackgroundImg" focused sx={{ input: { color: 'white' } }} /><br />
                    <TextField required id="cardImage" onChange={handleState} value={cardImg} label="CardImg" focused sx={{ input: { color: 'white' } }} /><br />
                    <TextField required id="titleImage" onChange={handleState} value={titleImg} label="Title Image" focused sx={{ input: { color: 'white' } }} /><br />
                    <Button variant="contained" onClick={updateData}>Update</Button>
                </Box>
            </Container>
        </div>
    )
}

export default UpdateMovies

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