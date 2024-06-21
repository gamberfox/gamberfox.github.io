import "bootstrap/dist/css/bootstrap.min.css";
const Banner = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card mb-3" style={{ width: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="javi5.jpg"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    Javier Humberto Grijalba Camayo
                  </h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <a href="https://github.com/gamberfox" target="_blank">
              <img
                src="github-mark.svg"
                alt="fail"
                style={{ width: "200px", height: "auto" }}
              />
            </a>
          </div>
          <div className="col">asdgasgdasdf</div>
        </div>
      </div>
    </>
  );
};
export default Banner;
