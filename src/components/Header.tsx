import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ACCESS_TOKEN, settings, USER_LOGIN } from '../utils/config'

type Props = {

}

export default function Header(props: Props) {
     // useEffect(()=>{

     // },[localStorage.getItem(USER_LOGIN)])
     return (
          <>
               <header className=''>
                    <div className='header_content container-fluid row' style={{}}>
                         <NavLink to={''} className='col-2'>
                              <img alt='123' src='https://cybersoft.edu.vn/wp-content/uploads/2021/03/logo-cyber-nav.svg' />
                         </NavLink>
                         <div className='col-10'>
                              <div className='d-flex justify-content-end align-items-center'>
                                   <NavLink to={'search'} className='me-4'><i className="fa fa-search"></i> Search</NavLink>
                                   <NavLink to={'cart'} className='me-4'><i className="fa fa-shopping-cart"></i> (1)</NavLink>
                                   <NavLink to={''} className='me-4 ' onClick={() => {
                                             settings.clearStorage(USER_LOGIN)
                                             settings.clearStorage(ACCESS_TOKEN)
                                             window.location.reload()
                                        }} >Logout</NavLink>
                                        <NavLink to={'login'} className='me-4 '>Login</NavLink>
                                   {/* {settings.getStore(USER_LOGIN) ?
                                        <NavLink to={'/'} className='me-4 ' onClick={() => {
                                             settings.clearStorage(USER_LOGIN)
                                             settings.clearStorage(ACCESS_TOKEN)
                                             window.location.reload()
                                        }} >Logout</NavLink>

                                        : <NavLink to={'/login'} className='me-4 '>Login</NavLink>} */}
                                   {/* {settings.getStore(USER_LOGIN) ? */}

                                        <NavLink to={'profile'} className='me-4'> Profile</NavLink>
                                        {/* : ''} */}
                                   {/* <NavLink to={'/login'} className='me-4 '>Login</NavLink> */}
                                   <NavLink to={'register'} className='me-4 '>Register</NavLink>
                              </div>
                         </div>
                    </div>
               </header>
               <section className='menu '>
                    <nav className='menu_nav container-fluid'>
                         {/* <NavLink className={'menu_link active'} to={'/sdfe'} >Home</NavLink> */}
                         <NavLink className={'menu_link'} to='1' >Home</NavLink>
                         <NavLink className={'menu_link'} to='2' >Men</NavLink>
                         <NavLink className={'menu_link'} to='3' >Women</NavLink>
                         <NavLink className={'menu_link'} to='4' >Kid</NavLink>
                         <NavLink className={'menu_link'} to='5' >Sport</NavLink>
                    </nav>
               </section>
          </>
     )
}