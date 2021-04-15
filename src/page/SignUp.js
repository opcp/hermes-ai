import { useContext, useState } from 'react'
import { Form, Col, Spinner } from 'react-bootstrap'
import logo from '../assets/img/Hermes-AI-logo-landscape-bg-transparent.png'
import credential from '../module/controller/Credential/credential'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { LogContext } from '../Main'
import swal from 'sweetalert'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'
import TermModal from '../components/TermModal/TermModal'
import { Button, Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import LoadingButton from '@material-ui/lab/LoadingButton'
import _ from 'lodash'

function Signup() {
  const { setStatus } = useContext(LogContext)
  const history = useHistory()
  const [isOpenTerm, setIsOpenTerm] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [isCompany, setIsCompany] = useState(true)

  const yup_obj = {
    group_id: yup
      .string('請輸入企業編號')
      .matches(/[^.#$[\]_]+/g, '不可有特殊符號')
      .required('此欄位必填'),
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

  const validationSchema = yup.object(
    isCompany
      ? yup_obj
      : _.pick(yup_obj, ['group_id', 'email', 'password', 'user_name'])
  )

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
    validationSchema,
    onSubmit: (values) => {
      setIsOpenTerm(true)
    },
  })

  async function onAgreeTerm() {
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
    } = formik.values
    setIsOpenTerm(false)
    setLoadingBtn(true)
    try {
      await credential.signUp(email, password, {
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
      await setStatus(true)
      await swal('註冊成功', '將在 3 秒後跳轉至首頁', 'success', {
        button: false,
        timer: 3000,
      })
      history.push('/')
    } catch (error) {
      const { message } = error

      swal(message, {
        icon: 'error',
        button: false,
      })
    }
    setLoadingBtn(false)
  }

  return (
    <>
      <section className="signUpContainer">
        <div className="signUpMiddle shadow-lg">
          <div className="signUpForm">
            <div className="signUpLogo">
              <img alt="hermesLogo" src={logo} />
            </div>
            <div>
              已有帳號？
              <Link to="/login" className="ml-1">
                登入
              </Link>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container className="mb-4">
                <Grid container spacing={2}>
                  <Grid item lg={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item lg={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Grid>
                  <Grid item lg={6} sm={12} xs={12}>
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
                  </Grid>
                  <Grid item lg={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      name="group_id"
                      label="企業編號"
                      type="text"
                      value={formik.values.group_id}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.group_id &&
                        Boolean(formik.errors.group_id)
                      }
                      helperText={
                        formik.touched.group_id && formik.errors.group_id
                      }
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="isCompany_check"
                          checked={isCompany}
                          onChange={() => setIsCompany(!isCompany)}
                          name="checkedA"
                          color="primary"
                          isValid
                        />
                      }
                      label="註冊新的企業帳號"
                    />
                  </Grid>
                </Grid>
                {isCompany && (
                  <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
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
                    </Grid>
                    <Grid item sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
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
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        id="ref_agent_id"
                        name="ref_agent_id"
                        label="推薦人代碼"
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
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <div className="signUpBtn">
                <LoadingButton
                  type="submit"
                  pending={loadingBtn}
                  variant="contained"
                  color="primary"
                >
                  確認送出
                </LoadingButton>
              </div>
            </Form>
          </div>
        </div>
      </section>
      <TermModal
        open={isOpenTerm}
        onClose={() => setIsOpenTerm(false)}
        onAgree={onAgreeTerm}
        onDisagree={() => setIsOpenTerm(false)}
      />
    </>
  )
}
export default withRouter(Signup)
