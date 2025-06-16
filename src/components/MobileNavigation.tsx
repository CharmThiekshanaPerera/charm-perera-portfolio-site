
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeSection,
  setActiveSection,
  scrollToSection
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = ["Home", "About", "Skills", "Experience", "Projects", "Education", "Contact"];

  const handleNavClick = (item: string) => {
    setActiveSection(item.toLowerCase());
    scrollToSection(item.toLowerCase());
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 bg-background dark:bg-gray-900">
          <div className="flex flex-col space-y-4 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary dark:text-blue-400">Navigation</h2>
            </div>
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                  activeSection === item.toLowerCase()
                    ? 'bg-primary/10 dark:bg-blue-500/20 text-primary dark:text-blue-400 font-bold border-l-4 border-primary dark:border-blue-400'
                    : 'text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:bg-muted/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
