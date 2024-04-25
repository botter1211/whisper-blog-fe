import React from "react";
import "./MasterCard.css";
function MasterCard() {
  return (
    <section>
      <div className="container">
        <div className="card front-face">
          <header>
            <span className="logo">
              <img src="/mastercard/logo.png" alt="" />
              <h5>Master Card</h5>
            </span>
            <img src="/mastercard/chip.png" alt="" className="chip" />
          </header>

          <div className="card-details">
            <div className="name-number">
              <h6>Card Number</h6>
              <h5 className="number">4063 **** **** ****</h5>
              <h5 className="name">Whisper Blog</h5>
            </div>

            <div className="valid-date">
              <h6>Valid Thru</h6>
              <h5>**/27</h5>
            </div>
          </div>
        </div>

        <div className="card back-face">
          <h6>For customer service</h6>
          <span className="magnetic-strip"></span>
          <div className="signature">
            <i>00*</i>
          </div>
          <h5>
            Use of this card constitutes acceptance of the terms and conditions
            that govern this card.
          </h5>
        </div>
      </div>
    </section>
  );
}

export default MasterCard;
