
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-blue-600">FitPlan</h3>
            <p className="text-gray-600 text-sm mt-1">
              Your personalized workout assistant
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Terms of Service</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Contact Us</a>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} FitPlan. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
