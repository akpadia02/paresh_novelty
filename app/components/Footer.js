"use client";
import React from "react";
import { Mail, Instagram } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-[#FEC4C7] text-black px-24 py-10 font-playfair mt-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Contact Information */}
                <div className="space-y-2">
                    <h3 className="text-lg font-bold">Contact Information</h3>
                    <p>Phone: +91 9421700364 / 9423100105 / 9764878007</p>
                    <p>Tel: 0712 - 2728946</p>
                    <p>Email: <a href="mailto:PareshNovelty@Gmail.Com" className="underline">PareshNovelty@Gmail.Com</a></p>
                    <p>Address: Bohra Masjid Road, Itwari, Nagpur - 440002.</p>
                    <p>Visit Us On:</p>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-black hover:text-gray-700">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="mailto:PareshNovelty@Gmail.Com" className="text-black hover:text-gray-700">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="ml-0 space-y-2 md:ml-20">
                    <h3 className="text-lg font-bold">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Company Information */}
                <div className="space-y-2">
                    <h3 className="text-lg font-bold">Company Information</h3>
                    <p>Your Trusted Wholesaler For Fancy Bindis, Bangles, Ladies' Novelties, General Items, And Imitation Jewelry. Quality Products At The Best Prices.</p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-[#fbe1e3] mt-5 pt-4 text-center text-sm">
                <p>© 2025 Paresh Novelty All Rights Reserved.</p>
                <p>Designed & Developed By <span className="font-semibold">Akshay Padia</span></p>
            </div>
        </footer>
    );
}

export default Footer;
