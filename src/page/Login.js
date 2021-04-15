import { Form, Button } from 'react-bootstrap'
import logo from '../assets/img/Hermes-AI-logo-portrait-bg-transparent.png'
import credential from '../module/controller/Credential/credential'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { LogContext } from '../Main'
import swal from 'sweetalert'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import LoadingButton from '@material-ui/lab/LoadingButton'
import * as yup from 'yup'
import { Grid } from '@material-ui/core'

function Login(props) {
  const status = useContext(LogContext)
  const history = useHistory()
  const [isLoading, setLoading] = useState(false)

  async function signIn(email, password) {
    try {
      if (props.admin) {
        await credential.signInAsAdmin(email, password)
      } else {
        await credential.signIn(email, password)
      }
      await swal('登入成功', '將在3秒後跳轉至首頁', 'success', {
        button: false,
        timer: 2700,
      })
      status.setStatus(true)
      history.push('/')
    } catch (error) {
      const { code } = error
      if (code === 'auth/invalid-email') {
        swal('帳號錯誤', {
          icon: 'error',
          button: false,
        })
      } else if (code === 'auth/wrong-password') {
        swal('密碼錯誤', {
          icon: 'error',
          button: false,
        })
      }
    }
    setLoading(false)
  }

  const validationSchema = yup.object({
    account: yup.string('請輸入帳號').required('此欄位必填'),
    password: yup
      .string('Enter your password')
      .min(6, '密碼最少六位')
      .required('此欄位必填'),
  })

  // formik
  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { account, password } = values
      setLoading(true)
      signIn(account, password)
    },
  })

  return (
    <>
      <section className="loginContainer">
        <div className="loginMiddle">
          <div className="loginInput shadow-lg">
            <div className="loginLogo">
              <img alt="hermesLogo" src={logo} width="200" />
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} className="p-3 mb-3">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="account"
                    name="account"
                    label="帳號"
                    value={formik.values.account}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.account && Boolean(formik.errors.account)
                    }
                    helperText={formik.touched.account && formik.errors.account}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="密碼"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>

              <div className="loginBtn">
                <LoadingButton
                  type="submit"
                  pending={isLoading}
                  variant="contained"
                  color="primary"
                >
                  登入
                </LoadingButton>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
