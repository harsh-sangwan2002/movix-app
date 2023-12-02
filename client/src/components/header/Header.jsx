import React, { useState, useEffect, useContext } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);

    useEffect(()=>{

        user = JSON.parse(localStorage.getItem("currentUser"));
        console.log(user);
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        user = JSON.parse(localStorage.getItem("currentUser"));
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        user = JSON.parse(localStorage.getItem("currentUser"));
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    const handlelogout = async () => {
        
        localStorage.setItem("currentUser",null);
        location('http://localhost:5173/login');
    }

    return (
        <div>
            <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
                <ContentWrapper>
                    <div className="logo" onClick={() => navigate("/")}>
                        <img src={logo} alt="" />
                    </div>
                    <ul className="menuItems">
                        <li
                            className="menuItem"
                            onClick={() => navigationHandler("movie")}
                        >
                            Movies
                        </li>
                        <li
                            className="menuItem"
                            onClick={() => navigationHandler("tv")}
                        >
                            TV Shows
                        </li>
                        <AccountCircleIcon className="menuItem" onClick={() => setOpen(!open)} />
                    </ul>

                    <div className="mobileMenuItems">
                        <HiOutlineSearch onClick={openSearch} />
                        {mobileMenu ? (
                            <VscChromeClose onClick={() => setMobileMenu(false)} />
                        ) : (
                            <SlMenu onClick={openMobileMenu} />
                        )}
                    </div>
                </ContentWrapper>

            </header>
            <>
                {
                    !user ? open && (<div className="options">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                            <span>Login</span>
                        </Link>
                        <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                            <span>Register</span>
                        </Link>
                    </div>) : (
                        <>
                            {
                                open && (
                                    <div className="options">
                                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                                            <span onClick={handlelogout}>Logout</span>
                                        </Link>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </>
        </div>
    );
};

export default Header;
