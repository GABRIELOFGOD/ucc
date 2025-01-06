'use client'

import { wagmiAdapter, projectId } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { bsc, mainnet } from "wagmi/chains";
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Set up queryClient
const queryClient = new QueryClient()

// if (!projectId) {
//     throw new Error('Project ID is not defined')
// }

// // Set up metadata
// const metadata = {
//     name: 'ucchain',
//     description: 'Ucchain network',
//     url: 'https://ucchain.org', // origin must match your domain & subdomain
//     icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// // Create the modal
// const modal = createAppKit({
//     adapters: [wagmiAdapter],
//     projectId,
//     networks: [mainnet, bsc],
//     defaultNetwork: bsc,
//     metadata: metadata,
//     features: {
//         analytics: true,
//     }
// })

const config = getDefaultConfig({
    appName: "UCC",
    projectId: projectId ?? "",
    chains: [mainnet, bsc],
    appIcon: "https://avatars.githubusercontent.com/u/179229932"
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider