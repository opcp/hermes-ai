import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <Container className="bg-dark" fluid id="footer">
      <Row className="p-1">
        <Col as="footer" className="text-center text-light">
          &copy; 2021 Servtech, Inc.
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
