function Card(prop) {
  return (
    <>
      <div className="card">
        <div
          style={{ backgroundImage: `url(${prop.url})` }}
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
