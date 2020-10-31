import React, { useEffect } from 'react'
import "./style.css";

const Background = () => {
    useEffect(() => {
        let current = 0;
        let last = 0;
    
        document.getElementById("__0").classList.add("visible");
        document.getElementById("__0").classList.add("top");
    
        const interval = setInterval(() => {
          last = current;
          current++;
          if (current >= divs.length) {
            current = 0;
          }
    
          let currentDiv = document.getElementById("__" + current);
          let passedDiv = document.getElementById("__" + last);
    
          currentDiv.classList.add("visible");
          currentDiv.classList.add("top");
          passedDiv.classList.remove("top");
    
          setTimeout(() => {
            passedDiv.classList.remove("visible");
          }, 3000);
    
          //selectCurrentDiv.
        }, 6000);
        return () => clearInterval(interval);
      }, []);

    let divs = [
        <div
          id="__0"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49930492272_dd0e0f13ce_b.png")'
          }}
        />,
        <div
          id="__1"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49929699753_a7e6e99609_b.png")'
          }}
        />,
        <div
          id="__2"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49930228066_b1d494d04a_b.png")'
          }}
        />,
        <div
          id="__3"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49930176636_486727dbd7_b.png")'
          }}
        />,
        <div
          id="__4"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49930479492_e2220fbd34_b.png")'
          }}
        />
    ];
    const generateSlidingDiv = () => {
        return divs.map(div => div);
    };

    return (
        <div className="bg">{generateSlidingDiv()}</div>
    );
}

export default Background;