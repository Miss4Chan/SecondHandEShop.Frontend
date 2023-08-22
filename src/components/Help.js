import React from 'react';

const Help = () => {

    const styles=`
      
          .custom-font {
            font-family: 'Tangerine';
            font-weight: bold;
            font-size: 3rem;
          }
      
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
      
          .wrapper {
            min-height: 100%;
            display: flex;
            flex-direction: column;
          }
      
          .content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-size: cover;
            background-position: center;
          }
      
          .content .card {
            width: 50rem;
            height: 15rem;
            opacity: 0.7;
            background-color: rgba(255, 255, 255, 0.7);
          }
      
          .content .card .card-title {
            color: black;
          }
      
      
          .btn-custom {
            background-color: #000000;
            color: #ffffff;
          }
      
          .card-body h5,
          .card-body a {
            color: #000000;
            opacity: 1;
          }
      
          .custom-row {
            background-color: #C2A4C8; /* Change the background color */
          }
          `;
return (
<div class="wrapper">
<style>{styles}</style>
    <div class="content">
      <div class="card text-center" style={{width: "50rem", height: "15rem"}}>
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <h5>FAQ: idk sho treba da pishi tuka ali vo zavisno od prashanjata da znam da ja zgolemam pozadinata, kazhete sho sakate da ima.</h5>
        </div>
      </div>
    </div>
  </div>);

};

export default Help;