import { useContext, useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'

import logo from '../components/img/AI-logo.png'
import notAccessCheck from '../components/img/icon/circle-regular.svg'
import accessCheck from '../components/img/icon/checked.png'

import credential from '../module/controller/Credential/credential'
import { useHistory, Link } from 'react-router-dom'
import { LogContext } from '../Main'

import swal from 'sweetalert'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField'
import TermModal from '../components/TermModal/TermModal'

function Signup() {
  const status = useContext(LogContext)
  const history = useHistory()
  const [terms, setTerms] = useState(false)
  const [isCompany, setIsCompany] = useState(true)

  function signIn(email, password) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signIn(email, password))
      }
    })
      .then(() => {
        status.setStatus(true)
        history.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function signUp(email, password, option) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signUp(email, password, option))
      }
    })
      .then(async () => {
        await signIn(email, password)
        swal('註冊成功', '將在3秒後跳轉至首頁', 'success', {
          button: false,
          timer: 1500,
        })

        setTimeout(() => {
          history.push('/')
        }, 3000)
      })
      .catch((error) => {
        const { message } = error

        swal(message, {
          icon: 'error',
        })
      })
  }

  let yup_obj
  if (!isCompany) {
    yup_obj = {
      group_id: yup.string('請輸入企業ID').required('此欄位必填'),
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('此欄位必填'),
      password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('此欄位必填'),
      user_name: yup.string('請輸入使用者名稱').required('此欄位必填')
    }
  } else {
    yup_obj = {
      group_id: yup.string('請輸入企業ID').required('此欄位必填'),
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('此欄位必填'),
      password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('此欄位必填'),
      user_name: yup.string('請輸入使用者名稱').required('此欄位必填'),
      contact_person_name: yup.string('').required('此欄位必填'),
      contact_person_email: yup.string('').required('此欄位必填').trim(),
      contact_person_tel: yup.string('').required('此欄位必填').trim(),
      company_name: yup.string('').required('此欄位必填').trim(),
      company_address: yup.string('').required('此欄位必填').trim(),
      company_tel: yup.string('').required('此欄位必填').trim(),
      tax_id: yup.string('').required('此欄位必填').trim(),
    }
  }

  const validationSchema = yup.object(yup_obj)

  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      group_id: '',
      isCompany: true,
      company_name: '',
      company_address: '',
      company_tel: '',
      contact_person_name: '',
      contact_person_tel: '',
      contact_person_email: '',
      ref_agent_id: '',
      tax_id: '',
      user_name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (terms) {
        const {
          group_id,
          email,
          password,
          company_name,
          company_address,
          company_tel,
          contact_person_name,
          contact_person_tel,
          contact_person_email,
          ref_agent_id,
          tax_id,
          user_name,
        } = values

        signUp(email, password, {
          group_id,
          isAdmin: isCompany,
          company_name,
          company_address,
          company_tel,
          contact_person_name,
          contact_person_tel,
          contact_person_email,
          ref_agent_id,
          tax_id,
          user_name,
        })
      } else {
        swal('需同意使用者條款才可註冊', {
          icon: 'error',
        })
      }
    },
  })

  return (
    <>
      <section className="signUpContainer">
        <div className="signUpMiddle">
          <div className="signUpForm">
            <div className="signUpLogo">
              <img alt="hermesLogo" src={logo} />
            </div>
            {/* <div>
              {`已有帳號? `}
              <Link to="/login">登入</Link>
            </div> */}
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  onClick={() => setIsCompany(!isCompany)}
                  value={isCompany}
                  type="checkbox"
                  label="是否加入現有企業帳戶底下?"
                />
              </Form.Group>
              
              <Form.Group>
                {/* <Form.Label>企業ID</Form.Label>
                <Form.Control
                  value={group_id}
                  onChange={(e) =>
                    setFormData({ ...formData, group_id: e.target.value })
                  }
                  type="text"
                  // pattern="^[a-zA-Z0-9]*$"
                  // title="請輸入英文數字組合"
                  placeholder="企業ID"
                /> */}
                <TextField
                  fullWidth
                  name="group_id"
                  label="企業ID"
                  type="text"
                  value={formik.values.group_id}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.group_id && Boolean(formik.errors.group_id)
                  }
                  helperText={formik.touched.group_id && formik.errors.group_id}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <TextField
                    fullWidth
                    name="user_name"
                    label="使用者名稱"
                    type="text"
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.user_name &&
                      Boolean(formik.errors.user_name)
                    }
                    helperText={
                      formik.touched.user_name && formik.errors.user_name
                    }
                  />
                </Form.Group>
                {isCompany && (
                  <Form.Group as={Col}>
                    <TextField
                      fullWidth
                      name="contact_person_name"
                      label="聯絡人名稱"
                      type="text"
                      value={formik.values.contact_person_name}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.contact_person_name &&
                        Boolean(formik.errors.contact_person_name)
                      }
                      helperText={
                        formik.touched.contact_person_name &&
                        formik.errors.contact_person_name
                      }
                    />
                  </Form.Group>
                )}
              </Form.Row>

              {isCompany ? (
                <>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <TextField
                        fullWidth
                        name="contact_person_email"
                        label="聯絡人信箱"
                        type="email"
                        value={formik.values.contact_person_email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.contact_person_email &&
                          Boolean(formik.errors.contact_person_email)
                        }
                        helperText={
                          formik.touched.contact_person_email &&
                          formik.errors.contact_person_email
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <TextField
                        fullWidth
                        name="contact_person_tel"
                        label="聯絡電話"
                        type="text"
                        value={formik.values.contact_person_tel}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.contact_person_tel &&
                          Boolean(formik.errors.contact_person_tel)
                        }
                        helperText={
                          formik.touched.contact_person_tel &&
                          formik.errors.contact_person_tel
                        }
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <TextField
                        fullWidth
                        id="company_name"
                        name="company_name"
                        label="公司名稱"
                        type="text"
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.company_name &&
                          Boolean(formik.errors.company_name)
                        }
                        helperText={
                          formik.touched.company_name &&
                          formik.errors.company_name
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <TextField
                        fullWidth
                        id="company_address"
                        name="company_address"
                        label="公司地址"
                        type="text"
                        value={formik.values.company_address}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.company_address &&
                          Boolean(formik.errors.company_address)
                        }
                        helperText={
                          formik.touched.company_address &&
                          formik.errors.company_address
                        }
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <TextField
                        fullWidth
                        id="company_tel"
                        name="company_tel"
                        label="公司電話"
                        type="text"
                        value={formik.values.company_tel}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.company_tel &&
                          Boolean(formik.errors.company_tel)
                        }
                        helperText={
                          formik.touched.company_tel &&
                          formik.errors.company_tel
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <TextField
                        fullWidth
                        id="tax_id"
                        name="tax_id"
                        label="稅籍編號"
                        type="text"
                        value={formik.values.tax_id}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.tax_id && Boolean(formik.errors.tax_id)
                        }
                        helperText={
                          formik.touched.tax_id && formik.errors.tax_id
                        }
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group>
                    <TextField
                      fullWidth
                      id="ref_agent_id"
                      name="ref_agent_id"
                      label="推薦人 ID"
                      type="text"
                      value={formik.values.ref_agent_id}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.ref_agent_id &&
                        Boolean(formik.errors.ref_agent_id)
                      }
                      helperText={
                        formik.touched.ref_agent_id &&
                        formik.errors.ref_agent_id
                      }
                    />
                  </Form.Group>
                </>
              ) : (
                ''
              )}
              <div className="signUpTerms">
                <img alt="access" src={terms ? accessCheck : notAccessCheck} />
                {/* <a href="#" onClick={() => ModalShow(true)}>
                  需同意使用者條款
                </a> */}
                <TermModal setTerms={setTerms} />
              </div>

              <div className="signUpBtn">
                <Button variant="primary" type="submit">
                  確認送出
                </Button>
              </div>
              {/* 單位名稱 單位地址 單位電話 稅籍編號 使用者名稱 職稱 會員類型 單位登入代號 使用者登入帳號 代理商代碼 */}
              {/* 個人資料 目前可用點數 點數使用紀錄 點數購買紀錄 點數購買 */}
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}
export default Signup
