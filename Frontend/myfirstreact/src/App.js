import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Home from './client/Home';
import Login from './client/Login';
import About from './client/About';
import Hotels from './client/Hotels';
import DetailHotel from './client/DetailHotel';
import Contact from './client/Contact';
import Footer from './client/Footer';
import PixabayHotels from './client/PixabayHotels';
import FormulaireReservation from './client/FormulaireReservation';
import MesMessages from './client/MesMessages';
import Register from './Registre';

import HotelsAdmin from './admin/HotelsAdmin';
import Formulaire from './admin/Formulaire';
import AdminReservation from './admin/AdminReservation';
import AdminMessages from './admin/AdminMessages';
import ProtectedAdminRoute from './admin/ProtectedAdminRoute';

import { useAuthStore } from './useAuthStore';

function App() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: 'inherit',
    fontWeight: isActive ? 700 : 400,
    borderBottom: isActive ? '2px solid white' : '2px solid transparent',
  });

  return (
    <div className="app-wrapper">
      <AppBar position="static">
        <Toolbar sx={{ position: 'relative', justifyContent: 'center', flexWrap: 'wrap', gap: 1, py: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              position: { xs: 'static', md: 'absolute' },
              left: { md: 16 },
              top: { md: '50%' },
              transform: { md: 'translateY(-50%)' },
              mb: { xs: 1, md: 0 },
            }}>Booking</Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
  {user?.role === 'admin' ? (
    <>
      <Button component={NavLink} to="/admin/hotels" style={navLinkStyle} color="inherit">Hôtels</Button>
      <Button component={NavLink} to="/admin/reservations" style={navLinkStyle} color="inherit">Réservations</Button>
      <Button component={NavLink} to="/admin/messages" style={navLinkStyle} color="inherit">Messages</Button>
      <Button onClick={handleLogout} style={navLinkStyle({ isActive: false })} color="inherit">Se déconnecter</Button>    </>
  ) : (
    <>
      <Button component={NavLink} to="/" style={navLinkStyle} color="inherit">Home</Button>
      <Button component={NavLink} to="/about" style={navLinkStyle} color="inherit">About</Button>
      <Button component={NavLink} to="/hotels" style={navLinkStyle} color="inherit">Hotels</Button>
      <Button component={NavLink} to="/pixabay" style={navLinkStyle} color="inherit">Pixabay</Button>
      <Button component={NavLink} to="/contact" style={navLinkStyle} color="inherit">Contact</Button>
      {user && (
        <Button component={NavLink} to="/mes-messages" style={navLinkStyle} color="inherit">Mes messages</Button>
      )}
      <Button component={NavLink} to="/login" style={navLinkStyle} color="inherit">Login</Button>
    </>
  )}
</Box>
        </Toolbar>
      </AppBar>

      <div className="main-content">
        <Routes>
          {/* Routes client — publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/detail/:id" element={<DetailHotel />} />
          <Route path="/reserver/:id" element={<FormulaireReservation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pixabay" element={<PixabayHotels />} />
          <Route path="/mes-messages" element={<MesMessages />} />

          {/* Routes admin — protégées */}
          <Route path="/admin/hotels" element={<ProtectedAdminRoute><HotelsAdmin /></ProtectedAdminRoute>} />
          <Route path="/admin/hotels/formulaire" element={<ProtectedAdminRoute><Formulaire /></ProtectedAdminRoute>} />
          <Route path="/admin/hotels/formulaire/:id" element={<ProtectedAdminRoute><Formulaire /></ProtectedAdminRoute>} />
          <Route path="/admin/reservations" element={<ProtectedAdminRoute><AdminReservation /></ProtectedAdminRoute>} />
          <Route path="/admin/messages" element={<ProtectedAdminRoute><AdminMessages /></ProtectedAdminRoute>} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;