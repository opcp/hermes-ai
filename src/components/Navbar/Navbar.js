import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Test from "../../page/Test";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

function MemberModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Navbar() {
  const [modalShow, setModalShow] = useState(false);
  const [loginStatus, setStatus] = useState(false);

  return (
    <>
      <section className="nav_section">
        <nav className="nav_wrap">
          <div id="nav_logo">
            <img
              src="https://www.clarifai.com/hubfs/Momento%20Multimedia%20Theme/logo.svg"
              width="120"
              alt="Clarifai Logo"
              title="Clarifai Logo"
            />
          </div>
          <div className="nav_list">
            <ul>
              <li>案例</li>
              <li>試用</li>
              <li>POC</li>
              {loginStatus ? <li>購買點數</li> : ""}
              {loginStatus ? <li>使用系統</li> : ""}
              {/* <li>5</li> */}
            </ul>
          </div>
          <div className="nav_login">
            <Button
              variant="outline-primary"
              onClick={() => setModalShow(true)}
            >
              會員註冊/登入
            </Button>
            <Button variant="outline-primary" onClick={() => setStatus(true)}>
              test
            </Button>

            <MemberModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
