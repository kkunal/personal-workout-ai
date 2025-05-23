
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HealthBenefitsDialog } from "./HealthBenefitsDialog";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Personal <span className="text-blue-600">Fitness Journey</span> Starts Here
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Get customized workout plans tailored to your goals, experience level, and available equipment. Start your 2-week free trial today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {!user ? (
                <Link to="/auth">
                  <Button size="lg" className="text-lg px-8">
                    Start Free Trial
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => setDialogOpen(true)}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur-lg opacity-75"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80"
                  alt="Fitness coaching"
                  className="rounded-lg w-full h-auto object-cover"
                  width={500}
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      <HealthBenefitsDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
}
