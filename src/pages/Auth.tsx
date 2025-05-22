
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Container } from "@/components/ui/container";
import { AuthForm } from "@/components/auth/AuthForm";

const Auth = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to FitPlan</h1>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              Sign in to access your personalized workout plans or create a new account to start your fitness journey.
            </p>
          </div>
          <AuthForm />
        </div>
      </Container>
    </div>
  );
};

export default Auth;
