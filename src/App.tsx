import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import About from "./pages/About.tsx";
import Knowledge from "./pages/Knowledge.tsx";
import SearchPage from "./pages/Search.tsx"
import Details from "./pages/Details.tsx"
import {Box} from "@mui/material";
import PrivacySettings from "./components/PrivacySettings";
import Footer from "./components/Footer.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Impressum from "./pages/Impressum.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import AuthPage from "./pages/Auth.tsx";
import NotFound404 from "./pages/Error404.tsx";


function App() {
    return (
        <Box display="flex"
             flexDirection="column"
             minHeight="100vh">
            <Router>
                <Navbar/>‚
                <Box sx={{mt: {xs: 7, sm: 8}, pb: 6}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                        <Route path="/favorites" element={<Favorites/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/knowledge" element={<Knowledge/>}/>
                        <Route path="/details/:wkn" element={<Details/>}/>
                        <Route path="/kontakt" element={<Kontakt/>}/>
                        <Route path="/impressum" element={<Impressum/>}/>
                        <Route path="/datenschutz" element={<Datenschutz/>}/>
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/error404" element={<NotFound404 />} />
                    </Routes>
                </Box>
                <PrivacySettings/>
                <Footer/>
            </Router>
        </Box>
    );
}

export default App;
