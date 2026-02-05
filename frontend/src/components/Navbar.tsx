import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/auth.context";

export default function Navbar() {
  const { user, logout } = useAuth();
  const colors = ["bg-gray-500"];

  // initial
  const initial = user?.charAt(0).toUpperCase();


  return (
    <header className="w-full border-b bg-background fixed top-0 left-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">App</span>
          <span>Navbar</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Home</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">About</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user ? (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-2 ${colors}`}>
                  {initial}
                </div>
              ): (
                <></>
              )}
              <Button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
              <Button className="hidden md:inline-flex">Sign up</Button>
            </>
          )}

          <ThemeToggle />

          {/* Mobile sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-8 w-20" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <a href="#">Home</a>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">About</a>

                <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start">Log in</Button>
                  <Button className="justify-start">Sign up</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
