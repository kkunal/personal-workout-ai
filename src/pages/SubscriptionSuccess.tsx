
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
  }, [sessionId, navigate]);

  return (
    <Container className="py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for subscribing to our service. You now have access to all premium features.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="min-w-[150px]">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/plans">
            <Button size="lg" variant="outline" className="min-w-[150px]">
              View Workout Plans
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SubscriptionSuccess;
