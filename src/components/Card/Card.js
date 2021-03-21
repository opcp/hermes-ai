import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function Card(prop) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  let callback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  let option = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  useEffect(() => {
    console.log(containerRef.current);
    const observer = new IntersectionObserver(callback, option);
    if (containerRef.current && !containerRef.current.dataset.isLoad) {
      observer.observe(containerRef.current);
      containerRef.current.dataset.isLoad = true
    }

    return () => {
      if (containerRef.current) {
        console.log('unobserve')
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, option]);

  // function callback(entries) {
  //   entries.forEach((element) => {
  //     console.log(element);
  //     if (element.isIntersecting) {
  //       console.log("true");
  //     }
  //   });
  // }

  // let observer = new IntersectionObserver(callback, {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: [0],
  // });

  // let image = document.querySelectorAll(".card_image");

  // image.forEach((i) => {
  //   console.log(i);
  //   observer.observe(i);
  // });

  return (
    <>
      <div className="card">
        <div
          ref={containerRef}
          style={{ backgroundImage: isVisible ? `url(${prop.url})` : "" }}
          className="card_image"
        ></div>
        <div className="card_text">
          <h3>{prop.title}</h3>
          <span>{prop.content}</span>
        </div>
        <div className="card_link">
          <a href="https://docs.clarifai.com/how-to/portal/pcustom-model-walkthrough">
            Try it out
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
