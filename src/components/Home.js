import React from 'react'
import styled from "styled-components";
import Viewers from '../components/Viewer';
import { Line } from "react-chartjs-2";
import Charts from './Charts';


function Home() {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <div>
      <Container>
        <h1>Dashboard - </h1>
        <hr></hr>
        <Viewers/>
        <Charts/>
        {/* <Content>
            
          <Wrap>
            <h1 className="mb-5">15000</h1>
            <h4 className="card-text">Disney Movie</h4>
          </Wrap>
        </Content> */}

      </Container>
    </div>
  )
}


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


export default Home