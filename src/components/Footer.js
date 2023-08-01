import React from 'react';

const Footer = () => {
  return (
    <footer className="footer fixed-bottom" style={{ backgroundColor: '#C2A4C8', color: 'white', textAlign: 'center', padding: '20px' }}>
      <div className="row justify-content-end align-items-center">
        <div className="col-auto">
          <p className="mb-0 text-dark font-weight-bold"><i className="fas fa-phone fa-shake" style={{ color: '#000000' }}></i> +389 75 555 555</p>
        </div>
        <div className="col-auto pr-3">
          <p className="mb-0 text-dark font-weight-bold"> <i className="fas fa-envelope fa-bounce" style={{ color: '#000000' }}></i> rewear@gmail.com</p>
        </div>
        <div className="col-auto">
          <img src="https://cdn-icons-png.flaticon.com/512/71/71768.png" alt="QuestionMarkIMG" style={{ width: '25px', height: '25px' }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
