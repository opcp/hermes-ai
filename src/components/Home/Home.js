import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
import Header from '../Header/Header'
import ExampleCarousel from '../Carousel/ExampleCarousel'
import Footer from '../Footer/Footer'
import Contract from '../Contract/Contract'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  Button,
  Container,
  Row,
  Col,
  Figure,
  Card,
  Image,
} from 'react-bootstrap'
import { LogContext } from '../../Main'

function Home() {
  // const imageRef = useRef(null);
  // const [scroll, setScroll] = useState();
  AOS.init({
    duration: 1200,
  })
  const { loginStatus } = LogContext
  // let callback = (entries) => {
  //   const [entry] = entries;
  //   setIsVisible(entry.isIntersecting);
  // };

  return (
    <Container fluid className="p-0">
      <Row id="banner">
        <Container className="d-flex align-items-center text-light">
          <Row className="justify-content-between">
            <Col className="d-flex flex-column justify-content-center">
              <Row as="h1" className="mb-2 flex-wrap">
                <span className="text-nowrap">讓人好做事</span>
                <span className="text-nowrap">讓事省時間</span>
              </Row>
              <Row as="h4" className="text-center">
                不用寫程式即可簡單做出 AI 應用
              </Row>
              <Row as="h4" className="text-center mb-4">
                快來體驗一站式的 AI 工具
              </Row>
              <Row>
                {loginStatus && (
                  <Link to="/signup">
                    <Button size="lg" className="mr-2">
                      開始試用
                    </Button>
                  </Link>
                )}
                <Link variant="primary" size="lg" to="/">
                  <Button size="lg" variant="light">
                    展示影片
                  </Button>
                </Link>
              </Row>
            </Col>
            <Col>
              <Image
                width={600}
                alt="hermes-ai-image-labeling"
                src="https://f.hubspotusercontent20.net/hubfs/4505120/home/hero-image-automation.png"
              />
            </Col>
          </Row>
        </Container>
      </Row>
      <Row style={{ padding: '60px 0' }}>
        <Container className="d-flex flex-column" style={{ rowGap: '80px' }}>
          <Row
            className="d-flex justify-content-center flex-gap-4"
            style={{ columnGap: '100px' }}
          >
            <div>
              <Image
                width={200}
                data-aos="fade-right"
                alt="hermes-ai-image-labeling"
                src="https://www.flaticon.com/premium-icon/icons/svg/820/820875.svg"
              />
            </div>
            <div>
              <Card bg="light" style={{ width: '300px', border: 'none' }}>
                <Card.Title>Hermes AI Platform</Card.Title>
                <Card.Text>
                  提供簡單上手一站式平台，跨越學習門檻，從構想開始提供預測值，供用戶累積獨家知識
                </Card.Text>
              </Card>
            </div>
          </Row>
          <Row
            className="d-flex justify-content-center flex-gap-4"
            style={{ columnGap: '100px' }}
          >
            <div>
              <Card bg="light" style={{ width: '300px', border: 'none' }}>
                <Card.Title>Pistis Data One-Stop AI</Card.Title>
                <Card.Text>
                  系統自動化處理數據特徵、模型尋找與評估，透過 AI
                  技術使用戶加快進到商用見解之階段
                </Card.Text>
              </Card>
            </div>
            <div>
              <Image
                width={200}
                data-aos="fade-left"
                alt="hermes-ai-image-labeling"
                src="https://www.flaticon.com/premium-icon/icons/svg/3061/3061284.svg"
              />
            </div>
          </Row>
          <Row
            className="d-flex justify-content-center flex-gap-4"
            style={{ columnGap: '100px' }}
          >
            <div>
              <Image
                width={200}
                data-aos="fade-right"
                alt="hermes-ai-image-labeling"
                src="https://www.flaticon.com/premium-icon/icons/svg/901/901002.svg"
              />
            </div>
            <div>
              <Card bg="light" style={{ width: '300px', border: 'none' }}>
                <Card.Title>Horus Easy-To-Use AI</Card.Title>
                <Card.Text>
                  簡單標記圖像服務、使用深度學習技術與辨識動作邏輯模組，可減少開發難度與時間投入
                </Card.Text>
              </Card>
            </div>
          </Row>
        </Container>
      </Row>
      <Row style={{ padding: '60px 0' }} >
        <Container>
          <div className="d-flex justify-content-center flex-gap-4 " >
            <div className="d-flex justify-content-center flex-column m-xl-4">
              <Image
                data-aos="zoom-up"
                src={'https://picsum.photos/id/337/300/200'}
              />
              <h4>Award-winning support</h4>
              <span>
                Get the help you need, whenever you need it with our 24/7
                support.
              </span>
            </div>
            <div className="d-flex justify-content-center flex-column m-xl-4">
              <Image
                data-aos="zoom-up"
                src={'https://picsum.photos/id/637/300/200'}
              />
              <h4>Award-winning support</h4>
              <span>
                Get the help you need, whenever you need it with our 24/7
                support.
              </span>
            </div>
            <div className="d-flex justify-content-center flex-column m-xl-4">
              <Image
                data-aos="zoom-up"
                src={'https://picsum.photos/id/377/300/200'}
              />
              <h4>Award-winning support</h4>
              <span>
                Get the help you need, whenever you need it with our 24/7
                support.
              </span>
            </div>
          </div>
        </Container>
      </Row>
    </Container>
  )
}

export default withRouter(Home)
