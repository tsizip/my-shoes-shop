import React from 'react'
import { NavLink } from 'react-router-dom'
import { ProductDetailModal, ProductModel, RelatedProduct } from '../redux/ProductReducer/productReducer'

type Props = {
     prd?: ProductModel | RelatedProduct,
     
}

export default function ProductCard({prd}:Props) {
     // console.log('props', prd)
     return (
          <div className='product'>
               <div className="card">
                    <div className='icon'>
                         <i className="fa fa-heart"></i>
                    </div>
                    <img className="card-img-top" src={prd?.image ? prd.image : 'http://picsum.photos/200/200'} alt="Title" />
                    <div className="card-body">
                         <h4 className="card-title">{prd?.name}</h4>
                         <p className="card-text">{prd?.shortDescription}</p>
                    </div>
                    <div className='row'>
                         <div className='col-6'><NavLink to={`/detail/${prd?.id}`} className='btn btn-success'>Buy</NavLink></div>
                         <div className='col-6'><div className='price'>{prd?.price ? prd.price : 'XX$'}</div></div>
                    </div>
               </div>

          </div>
     )
}