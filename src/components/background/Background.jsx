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
              'url("https://farm66.staticflickr.com/65535/49852284466_3e94a4fa7c_k.png")'
          }}
        />,
        <div
          id="__1"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49852561857_996482a877_k.png")'
          }}
        />,
        <div
          id="__2"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49852258522_83a509acca_k.png")'
          }}
        />,
        <div
          id="__3"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/50236368456_0fd8baa8ff_k.png")'
          }}
        />,
        <div
          id="__4"
          style={{
            backgroundImage:
              'url("https://farm66.staticflickr.com/65535/49855080013_6d68e98350_k.png")'
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