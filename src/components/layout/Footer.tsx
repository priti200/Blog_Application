export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* CA MONK Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CM</span>
                            </div>
                            <span className="text-xl font-bold text-white">CA MONK</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Empowering the next generation of financial leaders with tools, community, and knowledge.
                        </p>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase text-sm">
                            Resources
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Webinars
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Case Studies
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase text-sm">
                            Platform
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Job Board
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Practice Tests
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Mentorship
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase text-sm">
                            Connect
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 flex justify-between items-center text-sm text-gray-500">
                    <span>© 2024 CA Monk. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
