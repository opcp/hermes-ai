import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

function Card(prop) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callback = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(callback, option)
    if (containerRef.current && !containerRef.current.dataset.isLoad) {
      observer.observe(containerRef.current)
      containerRef.current.dataset.isLoad = true
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [containerRef])

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

  // let image = document.querySelectorAll(".cardImage");

  // image.forEach((i) => {
  //   console.log(i);
  //   observer.observe(i);
  // });

  return (
    <>
      <div className="card">
        <div
          ref={containerRef}
          style={{ backgroundImage: isVisible ? `url(${prop.url})` : '' }}
          className="cardImage"
        ></div>
        <div className="cardText">
          <h3>{prop.title}</h3>
          <span>{prop.content}</span>
        </div>
      </div>
    </>
  )
}

export default Card
