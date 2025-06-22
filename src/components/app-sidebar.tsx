import { Calendar, Home, Inbox, Search, Settings, BarChart3, Target, Wrench, Video, TrendingUp, Sparkles } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Creator Overview",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Profile Analysis",
        url: "/dashboard/diagnose",
        icon: Search,
    },
    {
        title: "Video Analysis",
        url: "/dashboard/videos",
        icon: Video,
    },
    {
        title: " Recommendations",
        url: "/dashboard/prescribe",
        icon: Target,
    },

    {
        title: "BrandMatch",
        url: "/dashboard/sponsor",
        icon: Sparkles,
    },
]

export function AppSidebar() {
    const location = useLocation();

    const isActive = (url: string) => {
        if (url === "/dashboard") {
            return location.pathname === "/dashboard";
        }
        return location.pathname === url;
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex flex-col p-2">
                    <div className="flex flex-row items-center gap-2">
                        <img src="/light.png" alt="Crux" className="w-10 h-10 rounded-sm" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Crux.ai</h1>
                            <p className="text-sm text-gray-500">Your Creator Intelligence</p>
                        </div>
                    </div>

                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            isActive(item.url) && "bg-orange-100 text-orange-700 border-r-2 border-orange-500"
                                        )}
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        isActive("/dashboard/settings") && "bg-orange-100 text-orange-700 border-r-2 border-orange-500"
                                    )}
                                >
                                    <Link to="/dashboard/settings">
                                        <Settings />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}