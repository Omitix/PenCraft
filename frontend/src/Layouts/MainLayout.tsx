import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto flex-1 px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <Outlet />
                    </div>
                    {/* Sidebar - sticky */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-24">
                            <Sidebar />
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
};