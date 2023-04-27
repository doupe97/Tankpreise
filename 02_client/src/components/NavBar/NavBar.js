import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/NavBar.css';

class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = { loginOutRoute: "", loginOutLabel: "", loginOutIcon: "" };
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-mainbg">
                <NavLink className="navbar-brand navbar-logo" to="/" exact>
                    <i className="fas fa-gas-pump">
                    &nbsp;&nbsp;Tankstellenpreise
                    </i>
                </NavLink>
                <button className="navbar-toggler"
                    type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search" exact>
                                <i className="fas fa-search"></i>Suche
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/favorites" exact>
                                <i className="fas fa-bookmark"></i>Favoriten
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={ this.state.loginOutRoute } exact>
                                <i className={ this.state.loginOutIcon }></i>{ this.state.loginOutLabel }
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

  componentDidMount() {
    this.interval = setInterval(() => {
        const _sessionKey = sessionStorage.getItem("SessionKey");
        const _isValid = !(_sessionKey == null || _sessionKey == "")
        this.setState({
            loginOutRoute: _isValid ? "/signOut" : "/signIn",
            loginOutLabel: _isValid ? "Abmelden" : "Anmelden",
            loginOutIcon: _isValid ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt",
        });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

}

export default NavBar;