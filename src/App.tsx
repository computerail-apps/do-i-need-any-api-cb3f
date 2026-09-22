import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { Nav, NavLink } from '@/lib/ui/Nav';
import { KeyRound, Bookmark, Search } from 'lucide-react';
import Home from '@/pages/Home';
import Saved from '@/pages/Saved';
import { SavedApisProvider } from '@/lib/savedApisStore';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SavedApisProvider>
      <div className="min-h-screen">
        <Nav
          brand={
            <span className="inline-flex items-center gap-2">
              <KeyRound size={18} />
              <span>KeyCheck</span>
            </span>
          }
          actions={
            <div className="hidden items-center gap-1 text-small text-muted-foreground sm:inline-flex">
              <Search size={14} />
              <span>Public APIs directory lookup</span>
            </div>
          }
        >
          <NavLink href="#" active={location.pathname === '/'} onClick={() => navigate('/')}>
            <Search size={14} className="mr-2" />
            Search
          </NavLink>
          <NavLink href="#" active={location.pathname === '/saved'} onClick={() => navigate('/saved')}>
            <Bookmark size={14} className="mr-2" />
            Saved
          </NavLink>
        </Nav>
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </main>
      </div>
    </SavedApisProvider>
  );
}
