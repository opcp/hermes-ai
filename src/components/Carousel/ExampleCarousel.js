import { Carousel } from "react-bootstrap";

function ExampleCarousel() {
  return (
    <>
      <Carousel interval={null} slide={false} fade={true}>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://picsum.photos/seed/picsum/300/200"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://picsum.photos/id/337/300/200"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://picsum.photos/id/437/300/200"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default ExampleCarousel;
