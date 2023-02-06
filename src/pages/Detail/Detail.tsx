import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProductByIdAction, ProductDetailModal, RelatedProduct } from '../../redux/ProductReducer/productReducer'


type Props = {}

export default function Detail({ }: Props) {
     let navi:NavigateFunction = useNavigate()
     let dispatch:DispatchType = useDispatch()
     let params = useParams()
     
     let productDetail = useSelector((state: RootState) => state.productReducer.productDetail)
     // console.log('detail', productDetail)
    

     const getProductById = async ()=>{
          await dispatch({
               type: 'productReducer/setNaviAction',
               payload:navi
          })
          const id:any = params.id
          const action: any = getProductByIdAction(id as string)
          dispatch(action)

         


     }
     

     useEffect(()=>{
         getProductById()
     },[params.id])

     return (
          <div className='container'>
               {/* <h3>Product name</h3> */}
               <div className='row mt-2'>
                    <div className='col-4'>
                         <img src={productDetail?.image} alt='...' height={350} width={350} style={{ objectFit: 'cover' }} />
                    </div>
                    <div className='col-8'>
                         {/* <h3>{productDetail?.name}</h3>
              <p>{productDetail?.description}</p> */}
                         <h3>{productDetail?.name}</h3>
                         <p>{productDetail?.shortDescription}</p>
                    </div>
               </div>
               <h3 className='mt-2 text-center'>-Realate Product -</h3>
               <div className='row'>
                    {productDetail?.relatedProducts.map((prod: RelatedProduct, index: number) => {
                         return <div key={index} className='col-4'>
                              <ProductCard prd={prod} />
                         </div>

                    })}
                    {/* <div className='col-4'>
                         <ProductCard />
                    </div> */}
               </div>
          </div>
     )
}