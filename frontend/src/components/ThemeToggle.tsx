import { useTheme } from "next-themes"
import { Sun, Moon, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const items = [
    { id: "light", icon: <Sun className="mr-2 h-4 w-4" />, label: "Light" },
    { id: "dark", icon: <Moon className="mr-2 h-4 w-4" />, label: "Dark" },
    { id: "system", icon: <Laptop className="mr-2 h-4 w-4" />, label: "System" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => setTheme(item.id)}
            className={theme === item.id ? "bg-primary text-primary-foreground" : ""}
          >
            {item.icon} {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
