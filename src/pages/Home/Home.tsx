import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProductApiAction,  ProductModel, ProductType,  } from '../../redux/ProductReducer/productReducer'

type Props = {}

export default function Home({ }: Props) {
    
     // console.log('navi home', navi)
     const { arrProduct } = useSelector((state: RootState) => state.productReducer)
     // console.log('arr', arrProduct)
     const dispatch:DispatchType = useDispatch()
// let num: number = 1
     const getAllProductApi = async () => {
          dispatch(getProductApiAction())
          
     }
     useEffect(() => {
          getAllProductApi()
     }, [])

     return (
          <div className='home'>
               {/* <button onClick={()=>{navi('/detail/3')}}>di</button> */}
               <div className='container'>
                    <h3>Product Feature</h3>
                    <div className='row'>
                         {arrProduct.map((prd: ProductModel, index: number) => {
                              return <div key={index} className='col-3'>
                                   <ProductCard prd={prd} />
                              </div>
                         })}


                    </div>
               </div>
          </div>
     )
}