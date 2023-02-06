import React from 'react'

type Props = {}

export default function Footer({ }: Props) {
     return (
          <div className='footer'>
               <div className='container footer_content row'>
                    <div className='col-4 item'>
                         <h3>GET HELP</h3>
                         <p>Home</p>
                         <p>Nike</p>
                         <p>Adidas</p>
                         <p>Contact</p>

                    </div>
                    <div className='col-4 item'>
                         <h3>SUPPORT</h3>
                         <p>About</p>
                         <p>Contact</p>
                         <p>Help</p>
                         <p>Phone</p>

                    </div> <div className='col-4 item'>
                         <h3>REGISTER</h3>
                         <p>register</p>
                         <p>login</p>
                     

                    </div>
               </div>
          </div>
     )
}