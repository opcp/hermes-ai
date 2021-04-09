import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import hermes from '../img/hermes3.jpg'

function Header() {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${hermes})` }}
        className="headerContainer"
      >
        <div className="headerMiddle">
          <div id="container">
            {/* <h1>
              <span>
                <i>The</i>
              </span>
              <span>
                <i>best</i>
              </span>
              <span>
                <i>products</i>
              </span>
              <span>
                <i>start</i>
              </span>
              <span>
                <i>with</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
            </h1> */}
            <p>善用數據來協助商業決策已經成為許多企業最重視的成長方式之一。Gartner 也在報告中指出，在未來三年，75% 的企業將脫離嘗試型 AI 且進而達到用 AI 做實際的營運。

            然而，至今市場上提供的 AI 方案，無論是導入的速度、複雜的功能和支援客戶的效率，都很難滿足剛啟動轉型的企業。

行動貝果已協助上百家企業放心轉型。我們的目標是提供最易用、快速、彈性的AI/ML 工具，幫助企業在決策上做出前所未有的效率。</p>
            {/* <Link to="/demo">
              <Button variant="outline-primary">試用</Button>
            </Link> */}
            <Link to="/signup">
              <Button variant="outline-info">註冊</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
