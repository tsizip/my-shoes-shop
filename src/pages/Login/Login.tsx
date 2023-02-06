import React,{useEffect} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { checkUserLogin } from '../../redux/UserReducer/userReducer';
import { NavigateFunction, useNavigate } from 'react-router-dom';


export interface UserLoginModel {
     email: string;
     password: string | number
}

type Props = {}

export default function Login({ }: Props) {
     const dispatch:DispatchType = useDispatch()

     const naviLogin:NavigateFunction = useNavigate()

     const frmLogin = useFormik<UserLoginModel>({
          initialValues: {
               email: '',
               password: '',

          },

          validationSchema: yup.object().shape({
               email: yup.string().email('invalid Email!').required('required'),
               password: yup.string().min(3, 'Too Short!').max(10, 'Too Long!').required('required')
          }),

          onSubmit: (values: UserLoginModel) => {
               // console.log(values)
               dispatch(checkUserLogin(values))
          },
     })

     useEffect(()=>{
          dispatch({
               type:'userReducer/setNaviLoginAction',
               payload: naviLogin
          })
     })

     return (

          <form onSubmit={frmLogin.handleSubmit} className='p-5 container d-flex justify-content-center'>
               <div className='w-50 '>
                    <h3 className='mb-3'>Login</h3>
                    <div className='form-group mb-3' >
                         <p>Email</p>
                         <input type='email' onChange={frmLogin.handleChange} name='email' className='form-control' placeholder='input Email' onBlur={frmLogin.handleBlur} />
                         {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
                         {frmLogin.errors.email ? <div className='text-danger'>{frmLogin.errors.email}</div> : undefined}

                    </div>
                    <div className='form-group mb-3' >
                         <p>Password</p>
                         <input onChange={frmLogin.handleChange} name='password' type='password' className='form-control' placeholder='input Password' onBlur={frmLogin.handleBlur} />
                         {frmLogin.errors.password ? <div className='text-danger'>{frmLogin.errors.password}</div> : undefined}

                    </div>
                    <div className='form-group' >
                         <button className='btn btn-success'>Login</button>

                    </div>
               </div>
          </form>
     )
}