import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider, useSubscription } from "@/hooks/useSubscription";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TestModeIndicator } from "@/components/TestModeIndicator";
import CheckoutCelebration from "@/components/CheckoutCelebration";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const Quiz = lazy(() => import("./pages/Quiz"));
const GrammarAssistant = lazy(() => import("./pages/GrammarAssistant"));
const GrammarDrill = lazy(() => import("./pages/GrammarDrill"));
const CourseOverview = lazy(() => import("./pages/CourseOverview"));
const A1Checkpoint = lazy(() => import("./pages/A1Checkpoint"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const Practice = lazy(() => import("./pages/Practice"));
const Auth = lazy(() => import("./pages/Auth"));
const Alphabet = lazy(() => import("./pages/Alphabet"));
const Settings = lazy(() => import("./pages/Settings"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const queryClient = new QueryClient();

const CelebrationOverlay = () => {
  const { showCelebration, checkoutPlanType, dismissCelebration } = useSubscription();
  return (
    <CheckoutCelebration
      isVisible={showCelebration}
      onDismiss={dismissCelebration}
      planType={checkoutPlanType}
    />
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <TestModeIndicator />
            <BrowserRouter>
              <CelebrationOverlay />
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/course" element={<ProtectedRoute><CourseOverview /></ProtectedRoute>} />
                  <Route path="/lesson/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
                  <Route path="/a1-checkpoint" element={<ProtectedRoute><A1Checkpoint /></ProtectedRoute>} />
                  <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
                  
                  <Route path="/alphabet" element={<ProtectedRoute><Alphabet /></ProtectedRoute>} />
                  <Route path="/flashcards/:categoryId" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
                  <Route path="/quiz/:categoryId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                  <Route path="/grammar" element={<ProtectedRoute><GrammarAssistant /></ProtectedRoute>} />
                  <Route path="/grammar-drill" element={<ProtectedRoute><GrammarDrill /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
