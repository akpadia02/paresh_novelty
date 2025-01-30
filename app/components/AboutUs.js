"use client";
import React from "react";

const AboutUs = () => {
    return (
        <div className="relative">
            {/* Parallax Section 1 */}
            <div
                className="h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop')",
                }}
            >

                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-center">
                    About Us
                </h1>
            </div>

            {/* Content Section 1 */}
            <section className="bg-gray-100 py-20 px-6 md:px-16">
                <h2 className="text-4xl font-semibold text-center mb-8">
                    Who We Are
                </h2>
                <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
                    We are a passionate team dedicated to innovation and excellence.
                    Through creativity and technology, we craft solutions that drive
                    positive change and empower individuals and organizations.
                </p>
            </section>

            {/* Parallax Section 2 */}
            <div
                className="h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://source.unsplash.com/1600x900/?innovation')",
                }}
            >
                <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center">
                    Our Vision
                </h2>
            </div>

            {/* Content Section 2 */}
            <section className="bg-white py-20 px-6 md:px-16">
                <h2 className="text-4xl font-semibold text-center mb-8">
                    Our Mission
                </h2>
                <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
                    To lead with innovation, inspire with creativity, and deliver with
                    integrity. Our mission is to create meaningful experiences and
                    solutions that make a difference in people's lives.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
