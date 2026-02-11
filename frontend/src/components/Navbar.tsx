import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/auth.context";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="w-full border-b bg-background fixed top-0 left-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">App</span>
          <span>Navbar</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link to="/features" className="text-sm font-medium hover:text-primary">Features</Link>
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Profile Circle Button */}
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border">
                  <div className="flex h-full w-full items-center justify-center bg-slate-500 text-white font-bold text-base">
                    {user?.name}
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">Signed in as {user.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Edit Profile Menu Item */}
                <Link to={`/edit/profile/${user?.id}`}>
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <User className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem className="cursor-pointer gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout Menu Item */}
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost">Log in</Button>
              <Button>Sign up</Button>
            </div>
          )}

          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Mobile links here */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}