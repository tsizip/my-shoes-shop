import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { getProfileUserLogin } from '../../redux/UserReducer/userReducer';
import { settings, USER_LOGIN } from '../../utils/config';
// import Login from '../Login/Login';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

type Props = {}

export default function Profile({ }: Props) {
   
     const dataLocal = settings.getStorageJson('userLogin2')
     // console.log('data', data)

     const frmUserProfile = useFormik({
          initialValues: {
               email: dataLocal.email,
               name: dataLocal.name,
               password: dataLocal.password,
               phone: dataLocal.phone,
               gender: dataLocal.gender

          },
          onSubmit: (values: any) => {
               console.log('valueLogin', values)
               
          }

     })



     const dispatch: DispatchType = useDispatch();

     useEffect(() => {
          //Gọi api get profile
          const action = getProfileUserLogin();
          dispatch(action)

          // dispatch(actionThunk);

     }, [])



     return (
          <div className='container'>
               <h3>Profile</h3>
               <div className='row'>
                    <div className='col-4'>
                         <img src={''} alt="..." className='rounded-circle' width={200} height={200} />
                    </div>
                    <div className='col-8'>
                         <form onSubmit={frmUserProfile.handleSubmit} onChange={frmUserProfile.handleChange} >
                              <div className='row'>
                                   <div className='col-6'>
                                        <div className='form-group'>
                                             <p>Email</p>
                                             <input className='form-control' name="email" value={frmUserProfile.values.email} onChange={frmUserProfile.handleChange} />
                                        </div>
                                        <div className='form-group'>
                                             <p>Phone</p>
                                             <input className='form-control' name="phone" value={frmUserProfile.values.phone} onChange={frmUserProfile.handleChange} />
                                        </div>
                                   </div>
                                   <div className='col-6'>
                                        <div className='form-group'>
                                             <p>Name</p>
                                             <input className='form-control' name="name" value={frmUserProfile.values.name} onChange={frmUserProfile.handleChange} />
                                        </div>
                                        <div className='form-group'>
                                             <p>Password</p>
                                             <input className='form-control' name="password" type="password" value={frmUserProfile.values.password} onChange={frmUserProfile.handleChange} />
                                        </div>
                                        <div className='form-group d-flex'>
                                             {/* <div className='w-75'>
                                                  <p>Gender</p>
                                                 
                                                  <Radio.Group onChange={onChange} value={value}>
                                                       <Radio value={'Male'}>Male</Radio>
                                                       <Radio value={'Female'}>Female</Radio>
                                                     
                                                  </Radio.Group>
                                             </div> */}
                                             <div className='text-right w-25'>
                                                  <button type='submit' className='btn btn-primary mt-3'>Update</button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     )
}