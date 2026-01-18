import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
    onLogoClick: () => void;
    onProfileClick?: () => void;
}

export default function Layout({ children, onLogoClick, onProfileClick }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header onLogoClick={onLogoClick} onProfileClick={onProfileClick} />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
