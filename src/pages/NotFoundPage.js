import React from "react";
import "../notfound.css";
import { Link as RouterLink } from "react-router-dom";
function NotFoundPage() {
  var pageX = document.body.clientWidth;

  var pageY = document.body.clientHeight;
  var mouseY = 0;
  var mouseX = 0;

  onmousemove = (event) => {
    mouseY = event.pageY;
    let yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
    mouseX = event.pageX / -pageX;
    let xAxis = -mouseX * 100 - 100;

    // ".box__ghost-eyes".css({
    //   transform: "translate(" + xAxis + "%,-" + yAxis + "%)",
    // });
  };

  return (
    <div className="notfound_body">
      <div className="box">
        <div className="box__ghost">
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>

          <div className="box__ghost-container">
            <div className="box__ghost-eyes">
              <div className="box__eye-left"></div>
              <div className="box__eye-right"></div>
            </div>
            <div className="box__ghost-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="box__ghost-shadow"></div>
        </div>

        <div className="box__description">
          <div className="box__description-container">
            <div className="box__description-title">Whoops!</div>
            <div className="box__description-text">
              It seems like we couldn't find the page you were looking for
            </div>
          </div>
          <RouterLink to="/" className="box__button">
            Go back
          </RouterLink>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
