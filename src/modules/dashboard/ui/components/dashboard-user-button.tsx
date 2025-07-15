import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
    const router = useRouter();
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        })
    }
    
    if (isPending || !data?.user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex 
            items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden">
             {data.user.image ? (
                <Avatar>
                    <AvatarImage src={data.user.image} />
                </Avatar>
             ) : (
                <GeneratedAvatar 
                    seed={data.user.name}
                    variant="initials"
                    className="size-9 mr-3"
                />
             )}
             <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-10 min-w-0">
                <p className="font-medium text-sm truncate w-full">
                    {data.user.name}
                </p>
                <p className="font-light text-xs truncate w-full">
                    {data.user.email}
                </p>
             </div>
        </div>
             <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
               <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium truncate">{data.user.name}</span>
                        <span className="text-xs font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex items-center justify-between">
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};