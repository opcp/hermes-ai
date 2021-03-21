import Header from "../components/Header/Header";
import Contract from "../components/Contract/Contract";
import Card from "../components/Card/Card";
import Login from "../page/Login";

function TrainModel() {
  return (
    <>
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
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/237/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />{" "}
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/257/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />{" "}
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/337/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />{" "}
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/637/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />{" "}
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/297/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />{" "}
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/817/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            />{" "}
            <Card
              title={"title2"}
              url={"https://picsum.photos/id/377/200/300"}
              content={
                "Create your own models using your own images or text with your own concepts."
              }
            /> <Card
            title={"title2"}
            url={"https://picsum.photos/id/210/200/300"}
            content={
              "Create your own models using your own images or text with your own concepts."
            }
          />
          </div>
        </div>
      </section>
      <Contract />
    </>
  );
}

export default TrainModel;
