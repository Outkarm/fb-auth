'use client'
import DashboardNav from "../components/DashboardNav";


export default function RootLayout ({ children }) {
    return (
        <>
            <DashboardNav />
            { children }
        </>
    )
}
