import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/eyeTracker'>eyeTracker</Link>
            </li>
          </ul>
    )
}

export default Navbar;