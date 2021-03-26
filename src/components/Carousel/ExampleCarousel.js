import { Carousel } from "react-bootstrap";

function ExampleCarousel() {
  return (
    <>
      <Carousel className="exampleCarousel" controls={false} indicators={false} interval={7000} slide={true} pause={false} >
        <Carousel.Item>
          <img
            src="https://picsum.photos/seed/picsum/1920/780"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://picsum.photos/id/337/1920/780"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://picsum.photos/id/437/1920/780"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default ExampleCarousel;
