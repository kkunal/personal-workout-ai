
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Images, Info, Dumbbell, Heart, Brain } from "lucide-react";

export function HealthBenefitsDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            How Our Program Works
          </DialogTitle>
          <DialogDescription className="sr-only">
            Learn about the health benefits of our fitness program
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                          alt="Person exercising" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Heart className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold">Improved Heart Health</h3>
                      <p className="text-center text-gray-600 mt-2">
                        Regular exercise strengthens your heart and improves your circulation, lowering the risk of heart diseases.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                          alt="Mental clarity" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Brain className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold">Enhanced Mental Health</h3>
                      <p className="text-center text-gray-600 mt-2">
                        Physical activity releases endorphins, reducing stress and anxiety while improving overall mental well-being.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                          alt="Program overview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Dumbbell className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold">Personalized Experience</h3>
                      <p className="text-center text-gray-600 mt-2">
                        Our AI-driven platform creates custom workout plans based on your fitness level, goals, and available equipment.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
        
        <div className="space-y-4 mt-2">
          <h3 className="text-lg font-semibold">How It Works:</h3>
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 p-2 rounded-full">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">1. Complete Your Profile</h4>
                <p className="text-sm text-gray-600">Tell us about your goals, experience level, and available equipment.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 p-2 rounded-full">
                <Images className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">2. Get Your Custom Plan</h4>
                <p className="text-sm text-gray-600">Receive a personalized workout plan designed specifically for you.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 p-2 rounded-full">
                <Dumbbell className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">3. Track Your Progress</h4>
                <p className="text-sm text-gray-600">Log your workouts and watch your fitness journey evolve over time.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
