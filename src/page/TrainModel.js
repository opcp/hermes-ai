import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Contract from "../components/Contract/Contract";
import Card from "../components/Card/Card";
import WenMap from "../components/WebMap/WebMap";

function TrainModel() {
  return (
    <>
      <Navbar />
      <Header />
      <section className="main_container">
        <div className="main_body">
          <div className="card_wrap">
            <Card
              title={"title"}
              url={"https://picsum.photos/seed/picsum/300/200"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />
            <Card
              title={"title2"}
              url={"https://picsum.photos/seed/picsum/300/200"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
      <Contract />
      <WenMap />
    </>
  );
}

export default TrainModel;
