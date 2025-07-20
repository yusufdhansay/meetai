import { EmptyState } from "@/components/empty-state";
import { VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    meetingId: string;
}

export const ActiveState = ({
    meetingId,
}: Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState 
                image="/upcoming.svg"
                title="Meeting in Progress"
                description="The meeting is currently active and will end once all participants have left"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button asChild className="w-full lg:w-auto">
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};