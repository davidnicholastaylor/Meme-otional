

// import { Redirect  } from 'react-router-dom'
// import React, { Component } from "react"
// import { Link } from "react-router-dom"
// import "./Navbar.css"


// export default class NavBar extends Component {
//     state = {
//         logout: false
//     }

//     logoutUser = () => {
//         this.setState({logout: true})
//         sessionStorage.removeItem("credentials")
//     }
//     render() {
//         return (
//             <nav >

                
//                 { this.state.logout === false &&
//                 <ul >
//                     <li >
//                         <Link  to="/days">Days</Link>
//                     </li>
//                     <li >
//                         <Link  to="/chart">Chart</Link>
//                     </li>
//                     <button onClick={this.logoutUser}>Logout</button>
//                 </ul>

//             }
//             { this.state.logout === true &&
//             <div>
//                 <Redirect to="" />
//                 </div>
//             }
//             </nav>
//         )
//     }
// }