"use client";

import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const queryClient = new QueryClient();

const ClientLayout = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ClientLayout;
