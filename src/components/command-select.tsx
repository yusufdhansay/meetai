import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandResponsiveDialog,
} from "@/components/ui/command";

interface Props {
    options: Array<{
    id: string;
    value: string;
    children: ReactNode;
    }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option",
    className,
}: Props) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    const handleOpenChange = (open: boolean) => {
        onSearch?.("");
        setOpen(open);
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                type="button"
                variant="outline"
                className={cn(
                    "h-9 justify-between font-normal px-2",
                    !selectedOption && "text-muted-foreground",
                    className,
                )}
            >
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>
            <CommandResponsiveDialog
                shouldFilter={!onSearch}
                open={open}
                onOpenChange={handleOpenChange}
            >
                <CommandInput placeholder="Search" onValueChange={onSearch} />
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No agents found
                        </span>
                    </CommandEmpty>
                    {options.map((option) =>
                        <CommandItem
                            key={option.id}
                            onSelect={() => {
                                onSelect(option.value)
                                setOpen(false);
                            }}
                        >
                            {option.children}
                        </CommandItem>
                    )}
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
}