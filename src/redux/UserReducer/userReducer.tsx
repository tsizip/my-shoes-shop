import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Axios from 'axios'
import { method } from 'lodash'
import { NavigateFunction } from 'react-router-dom'
import { UserLoginModel } from '../../pages/Login/Login'
import { ACCESS_TOKEN, DOMAIN, settings, USER_LOGIN } from '../../utils/config'
import { DispatchType } from '../configStore'


export interface UserProfile {
     ordersHistory: OrdersHistory[];
     email: string;
     name: string;
     password: null;
     gender: boolean;
     phone: string;
     facebookId: string;
     deleted: boolean;
     avatar: string;
}

export interface OrdersHistory {
     orderDetail: OrderDetail[];
     id: number;
     date: Date;
     status: null;
     email: string;
     alias: string;
}

export interface OrderDetail {
     name: string;
     alias: string;
     shortDescription: string;
     quantity: number;
     price: number;
     image: string;
     description: string;
}

export type UserType = {
     dataLogin: UserLoginModel | any;
     naviLogin: NavigateFunction,
     userProfile: UserProfile | any

}

const initialState: UserType = {
     dataLogin: {},
     naviLogin: (to) => { },
     userProfile: ''

}

const userReducer = createSlice({
     name: 'userReducer',
     initialState,
     reducers: {
          setDataLoginAction: (state: UserType, action: PayloadAction<any>) => {
               state.dataLogin = action.payload
               state.naviLogin('/')
               window.location.reload()
          },
          setNaviLoginAction: (state: UserType, action: PayloadAction<NavigateFunction>) => {
               state.naviLogin = action.payload
          },
          setDataProfileAction: (state:UserType,action:PayloadAction<UserProfile>)=>{
               state.userProfile = action.payload
             
          }
     }
});

export const { setDataLoginAction,setDataProfileAction } = userReducer.actions

export default userReducer.reducer


// -----------------action thunk

export const checkUserLogin = (values: UserLoginModel) => {
     return async (dispatch: DispatchType) => {
          try {
               let result = await Axios({
                    url: `${DOMAIN}/api/Users/signin`,
                    method: 'POST',
                    data: values

               })
               console.log('result', result)
               await settings.setStorageJson(ACCESS_TOKEN, result.data.content.accessToken)
               await settings.setCookieJson(ACCESS_TOKEN, result.data.content.accessToken, 30)
               await settings.setStorageJson(USER_LOGIN, result.data.content)
               await settings.setCookieJson(USER_LOGIN, result.data.content, 30)
               const action = await setDataLoginAction(result.data.content)
               await dispatch(action)
               // await settings.setStorageJson(USER_LOGIN,result.data.content)
               alert('login success!')
               console.log(result)
          } catch (err) {
               console.log('err', err)
          }
     }
}

export const getProfileUserLogin = () => {
     return async (dispatch: DispatchType) => {
          try {
               let result2 = await Axios({
                    url: `${DOMAIN}/api/Users/getProfile`,
                    method: 'POST',
                    
                    headers: {'Authorization' : `Bearer ${settings.getStorageJson(ACCESS_TOKEN)}`}
                  

                  
               })
               console.log('profile', result2)
               await settings.setStorageJson('userLogin2', result2.data.content)
               dispatch(setDataProfileAction(result2.data.content))
          } catch (err) {
               console.log('err', err)
          }
     }
}