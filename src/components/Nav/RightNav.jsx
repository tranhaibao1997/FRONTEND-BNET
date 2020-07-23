import React from 'react'
import { connect } from "react-redux";

function RightNav({auth}) {
    return (
     <>
     {
       auth.isAuthenticated ?<div className="fixed-sidebar right">
       <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">
         <div
           className="mCustomScrollbar ps ps--theme_default"
           data-mcs-theme="dark"
           data-ps-id="e1e178e0-c2c6-242f-e3e1-c14b984c767d"
         >
           <ul className="chat-users">
             <li className="inline-items js-chat-open">
               <div className="author-thumb">
                 <img
                   alt="author"
                   src="img/avatar67-sm.jpg"
                   className="avatar"
                 />
                 <span className="icon-status online" />
               </div>
             </li>
           </ul>
         </div>
       </div>
     </div> :""
     }
     </>
        
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RightNav);