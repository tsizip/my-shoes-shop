// rxslice
import { ActionCreator, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { http } from '../../utils/config';
import { DispatchType, RootState } from '../configStore';

export interface ProductModel {
     id: number;
     name: string;
     alias: string;
     price: number;
     description: string;
     size: string;
     shortDescription: string;
     quantity: number;
     deleted: boolean;
     categories: string;
     relatedProducts: string;
     feature: boolean;
     image: string;
}
export type ProductType = {
     arrProduct: ProductModel[],
     productDetail: ProductDetailModal | null,
     navigate: NavigateFunction
}

export interface ProductDetailModal {
     id: number;
     name: string;
     alias: string;
     price: number;
     feature: boolean;
     description: string;
     size: string[];
     shortDescription: string;
     quantity: number;
     image: string;
     categories: Category[];
     relatedProducts: RelatedProduct[];
}
export interface Category {
     id: string;
     category: string;
}
export interface RelatedProduct {
     id: number;
     name: string;
     alias: string;
     feature: boolean;
     price: number;
     description: string;
     shortDescription: string;
     image: string;
}


const initialState: ProductType = {
     arrProduct: [
          {
               "id": 1,
               "name": "Adidas Prophere",
               "alias": "adidas-prophere",
               "price": 350,
               "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
               "size": "[36,37,38,39,40,41,42]",
               "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
               "quantity": 995,
               "deleted": false,
               "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
               "relatedProducts": "[2,3,5]",
               "feature": true,
               "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
          },
     ],
     productDetail: null,
     navigate: (to)=>{}
}

// const isErrorAction = (action: PayloadAction) => {
//      return action.type.endsWith('FAIL')
// }
const productReducer = createSlice({
     name: 'productReducer',
     initialState,

     // cách 1
     reducers: {
          setArrProductAction: (state: ProductType, action: PayloadAction<ProductModel[]>) => {
               state.arrProduct = action.payload
               // state.navigate('/')
          },
          setProductDetailByIdAction: (state: ProductType, action: PayloadAction<ProductDetailModal | any>) => {
               if (action.payload !== 'fail') {
                    state.productDetail = action.payload
                    console.log(state.navigate)
               } else {
                    console.log('that bai')
                    // state.productDetail = action.payload
                    console.log(state.navigate)
                    state.navigate('/')
               }


          },

          setNaviAction: (state: ProductType, action: PayloadAction<NavigateFunction>) => {
               state.navigate = action.payload
               // console.log('state', state.navigate)
               // action.payload('/detail/3')


          },
     },

     // cách 2 với extraReducers
     //      extraReducers(builder) {
     //           builder.addCase(getProductByIdAction.fulfilled, (state: ProductType, action: PayloadAction<ProductDetailModal>) => {
     //                state.productDetail = action.payload
     //                // console.log('thanh cong')
     //                console.log('thanh cong builder')

     //           })

     //           // builder.addMatcher(isErrorAction, (state:ProductType, action) => {
     //           //      console.log('fail builder')
     //           //      state.navigate('/')
     //           // })

     //      },
});

export const { setArrProductAction, setProductDetailByIdAction, setNaviAction } = productReducer.actions

export default productReducer.reducer

// ----------------action api-------------------

// navi
// export const naviAction = (navi: any) => {
//      return async (dispatch: DispatchType) => {
//           let action = await setNaviAction(navi)
//           // console.log('navi action')
//           dispatch(action)
//      }
// }

// cách 1
export const getProductApiAction = () => {
     return async (dispatch: DispatchType) => {
          try {
               let result = await Axios({
                    url: `https://shop.cyberlearn.vn/api/Product`,
                    method: 'GET'
               })
               // console.log('result',result)
               const content: ProductModel[] = result.data.content
               if (result.status === 200) {
                    console.log('thanh cong')
                    let action = setArrProductAction(content)
                    dispatch(action)
               }
          } catch (err) {
               console.log(err)

          }
     }
}
export const getProductByIdAction = (id: string) => {
     return async (dispatch: DispatchType) => {
          try {
               let result = await Axios({
                    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
                    method: 'GET'
               })
               // console.log('result',result)

               if (result.status === 200) {
                    
                    let action = setProductDetailByIdAction(result.data.content)
                    dispatch(action)
               }
          } catch (err) {
               console.log(err)
               let action = setProductDetailByIdAction('fail')
               dispatch(action)

          }
     }
}

// cách 2: create createAsyncThunk
// export const getProductByIdAction = createAsyncThunk(
//      'productReducer/getProductByIdAction',
//      // if you type your function argument here
//      async (id: string) => {
//           try {
//                const response = await http.get(`/api/Product/getbyid?id=${id}`)
//                // console.log('res', response)
//                console.log('thanh cong detail')

//                return response.data.content

//                // if(response.)
//           } catch (err) {
//                console.log('err final', err)

//           }
//      }
// )