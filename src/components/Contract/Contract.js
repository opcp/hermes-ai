import { Form, Button } from "react-bootstrap";
import { Col } from "react-bootstrap";

function Contract() {
  return (
    <>
      <section className="form_container">
        <div className="form_body">
          <div className="form_text">123</div>
          <div className="form_wrap">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>姓名</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>公司</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>連絡電話</Form.Label>
                <Form.Control placeholder="連絡電話" />
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
