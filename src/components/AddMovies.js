import React, { useState } from 'react'
import styled from "styled-components";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./AddMovies.css"
import db from "../firebase";
import firebase from 'firebase/compat/app';
import Button from '@mui/material/Button';



function AddMovies() {

  const [title, setTitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImage, setBackGroundImage] = useState("");
  const [cardImg, setCardImg] = useState("");
  const [titleImg, setTitleImg] = useState("");

  const handleState = (event) =>{
    if(event.target.id == "title"){
      setTitle(event.target.value);
    }
    else if(event.target.id == "subTitle"){
      setsubTitle(event.target.value);
    }

    else if(event.target.id == "type"){
      setType(event.target.value);
    }

    else if(event.target.id == "description"){
      setDescription(event.target.value);
    }

    else if(event.target.id == "backgroundImage"){
      setBackGroundImage(event.target.value);
    }

    else if(event.target.id == "cardImage"){
      setCardImg(event.target.value);
    }

    else if(event.target.id == "titleImage"){
      setTitleImg(event.target.value);
    }
  }

  const submitData = (event) =>{
    if (title !== "" && subTitle !== "" && type !== "" && description !== "" && backgroundImage !== "" && cardImg !== "" && titleImg !== ""){
      event.preventDefault();

      db.collection('movies').add({
        backgroundImg: backgroundImage,
        cardImg : cardImg,
        description : description,
        subTitle : subTitle,
        title : title,
        titleImg : titleImg,
        type : type
      })
      
      setTitle("")
      setsubTitle("")
      setType("")
      setDescription("")
      setBackGroundImage("")
      setCardImg("")
      setTitleImg("")
      alert("inserted Successfully")

    }
    else{
      alert("fill up all the information")
    }
  }


  return (
    <div>
      <Container>
        <h1>Add Movies</h1>
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
          <Button variant="contained" onClick={submitData} >Add</Button>
        </Box>
      </Container>
    </div>
  )
}

export default AddMovies

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