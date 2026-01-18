import { Button } from '@/components/ui/button';

interface HeaderProps {
    onLogoClick: () => void;
    onProfileClick?: () => void;
}

export default function Header({ onLogoClick, onProfileClick }: HeaderProps) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={onLogoClick}
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">CM</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">CA MONK</span>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Tools
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Practice
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Events
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Job Board
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Points
                        </a>
                    </nav>

                    {/* Profile Button */}
                    <Button onClick={onProfileClick}>
                        Profile
                    </Button>
                </div>
            </div>
        </header>
    );
}
