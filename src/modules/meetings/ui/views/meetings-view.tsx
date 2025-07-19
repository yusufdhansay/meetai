"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} />
            {data.items.length === 0 && (
                <EmptyState
                    title="Schedule a New Meeting"
                    description="Set up a video meeting with one or more AI agents. Customize the 
                    agenda and let your agents lead, assist and collaborate during the session."
                />
            )}
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState 
            title="Loading Meetings"
            description="This may take a few seconds"
        />
    );
};

export const MeetingsViewError = () => {
    return (
        <ErrorState 
            title="Error Loading Meetings"
            description="Something went wrong"
        />
    );
};