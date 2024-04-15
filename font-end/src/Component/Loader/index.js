import "./style.scss";

function Loader() {
  return (
    <>
      <div className="bg-opacity"></div>
      <div className="wrapp-loader">
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </>
  );
}

export default Loader;
