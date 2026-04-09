import React, { useContext, useEffect } from 'react';
import NavBar from '../src/pages/Shared/NavBar/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../src/pages/Shared/Footer/Footer';
import { AuthContext } from '../src/providers/AuthProvider';
import ScrollToTop from './components/ScrollToTop';

// Paths where the main navbar and footer should be hidden
const HIDDEN_CHROME_PATHS = ['/login', '/register'];

const App = () => {
    const { user, refreshProfile } = useContext(AuthContext);
    const location = useLocation();

    const hideChrome = HIDDEN_CHROME_PATHS.some(
        (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
    );

    useEffect(() => {
        if (user && typeof refreshProfile === 'function') {
            refreshProfile().catch(() => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?._id]);

    return (
        <div>
            <ScrollToTop />
            {!hideChrome && <NavBar />}
            <Outlet />
            {!hideChrome && <Footer />}
        </div>
    );
};

export default App;
