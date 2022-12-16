import logo from "../images/lovet.svg"
import { Link } from "react-router-dom";


function Navbar(){
    return(
        <nav className="navbar navbar-dark navbar-expand-lg bg-black" style={{zIndex: 99, height: "8vh"}}>
            <div className="container-fluid">
                <Link className="navbar-brand"  style={{fontSize: "4.5vh"}} to="/home">
                <img src={logo} alt="" className="d-inline-block align-text-top" style={{width: "3vw", height: "3vw"}}></img>
                    0xLovet
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link text-2" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-2" aria-current="page" to="/mint">Mint</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-2" to="/marketplace">MarketPlace</Link>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link text-2" target={"_blank"} rel="noreferrer" href="https://gallery.0xlovet.com/">ArtGallery</a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;