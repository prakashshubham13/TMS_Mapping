import { Link, useLocation } from 'react-router-dom';

function Header() {
const location = useLocation();
    return (
        <header
            style={{
                width: '100vw',
                height: '6vh',
                borderBottom:'0.2rem solid #fff',
                zIndex:'10'
            }}
            role="banner"
        >
            <nav aria-label="Main navigation" style={{ width: '100%' }}>
                <ul style={{ display: 'flex', width: '100%', listStyle: 'none', margin: 0, padding: 0,
                    // borderBottom:'0.1rem solid #1a0d6e'
                    }}>
                    <li style={{ flex: 1 }}>
                        <Link
                            to="/"
                            style={{
                                display: 'block',
                                background: 'blue',
                                color: location.pathname === '/' ? '#000' : '#04151f',
                                textAlign: 'center',
                                padding: '1rem',
                                textDecoration: 'none',
                                fontWeight:'900',
                                background: location.pathname === '/' ? 'lightgreen' : '#fbfffe',
                            }}
                        >
                            Upload TMS Screens
                        </Link>
                    </li>
                    <li style={{ flex: 1 }}>
                        <Link
                            to="/addMapping"
                            style={{
                                display: 'block',
                                background: location.pathname === '/addMapping' ? 'lightgreen' : '#fbfffe',
                                color: location.pathname === '/addMapping' ? '#000' : '#04151f',
                                textAlign: 'center',
                                padding: '1rem',
                                textDecoration: 'none',
                                fontWeight:'900',
                            }}
                        >
                            Add TMS Mapping
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
