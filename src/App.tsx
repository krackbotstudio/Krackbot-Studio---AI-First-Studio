import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Tools from "./pages/Tools";
import Experimentations from "./pages/Experimentations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DesignSystem from "./pages/DesignSystem";
import NotFound from "./pages/NotFound";
import QuickBuildBooking from "./pages/QuickBuildBooking";
import TrackQuickBuild from "./pages/TrackQuickBuild";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuickBuildsPage from "./pages/admin/AdminQuickBuildsPage";
import AdminRolesPage from "./pages/admin/AdminRolesPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import { CmsAuthProvider } from "./contexts/CmsAuthContext";
import { RequireCmsAuth } from "./components/admin/RequireCmsAuth";
import { RequireSuperAdmin } from "./components/admin/RequireSuperAdmin";
import { RequireSection } from "./components/admin/RequireSection";
import WhatsAppChatButton from "./components/WhatsAppChatButton";
import FloatingSocialLinks from "./components/FloatingSocialLinks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CmsAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/experimentations" element={<Experimentations />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book/quick-ai/:slug" element={<QuickBuildBooking />} />
            <Route path="/track" element={<TrackQuickBuild />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <RequireCmsAuth>
                  <AdminLayout />
                </RequireCmsAuth>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <RequireSection sectionId="dashboard">
                    <AdminDashboard />
                  </RequireSection>
                }
              />
              <Route
                path="quick-builds"
                element={
                  <RequireSection sectionId="quick_builds">
                    <AdminQuickBuildsPage />
                  </RequireSection>
                }
              />
              <Route
                path="roles"
                element={
                  <RequireSuperAdmin>
                    <AdminRolesPage />
                  </RequireSuperAdmin>
                }
              />
              <Route
                path="users"
                element={
                  <RequireSuperAdmin>
                    <AdminUsersPage />
                  </RequireSuperAdmin>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingSocialLinks />
          <WhatsAppChatButton />
        </CmsAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
