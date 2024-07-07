import { Route, Routes } from 'react-router-dom';

import PrivacyPolicy from '@/pages/framework/privacy-policy.jsx';
import Settings from '@/pages/framework/settings.jsx';
import TermsOfService from '@/pages/framework/terms-of-service.jsx';

import About from '../pages/framework/about.jsx';
import Index from '../pages/framework/index.jsx';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/:UID" element={<Index />} />
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
}
