import { Form, Button } from "react-bootstrap";

function Contract() {
  return (
    <>
      <section id="#demo" className="formContainer">
        <div className="formBody">
          <div className="formText">
            <h2>準備好開始了嗎</h2>
            <p>
              Whether you're a start-up or a Fortune 500, we'd like to discuss a
              personalized plan that fits your business use cases.
            </p>
            <p>first</p>
            <p>second</p>
            <p>third</p>
          </div>
          <div className="formMiddle">
            <Form>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>姓名*</Form.Label>
                <Form.Control placeholder="姓名" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>公司*</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>聯絡電話*</Form.Label>
                <Form.Control placeholder="聯絡電話" />
              </Form.Group>

              <Form.Label>你需要的解決方案*</Form.Label>
              <Form.Group>
                <Form.Check
                  custom
                  inline
                  label="1"
                  type={"checkbox"}
                  id={`1`}
                />
                <Form.Check
                  custom
                  inline
                  label="2"
                  type={"checkbox"}
                  id={`2`}
                />
                <Form.Check
                  custom
                  inline
                  label="1"
                  type={"checkbox"}
                  id={`1`}
                />
                <Form.Check
                  custom
                  inline
                  label="2"
                  type={"checkbox"}
                  id={`2`}
                />
                <Form.Check
                  custom
                  inline
                  label="1"
                  type={"checkbox"}
                  id={`1`}
                />
                <Form.Check
                  custom
                  inline
                  label="2"
                  type={"checkbox"}
                  id={`2`}
                />
                <Form.Check
                  custom
                  inline
                  label="1"
                  type={"checkbox"}
                  id={`1`}
                />
                <Form.Check
                  custom
                  inline
                  label="2"
                  type={"checkbox"}
                  id={`2`}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>其他需求</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button variant="primary" type="button">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contract;
