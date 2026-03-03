"use client";

import React, { useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill your name, email and message.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send message.");
      }
      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="font-playfair px-5 py-8 md:px-16">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Contact Us</h1>
        <p className="text-xs md:text-sm text-gray-600 mb-6">
          Have a question about products, bulk orders or your existing order? Send us a message and we’ll get back to you shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-[#FEC4C7] rounded-2xl p-4 md:p-5 bg-white"
          >
            <div>
              <label className="text-xs font-semibold block mb-1">
                Full Name*
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-[#FEC4C7] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FEC4C7]"
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-[#FEC4C7] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FEC4C7]"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border border-[#FEC4C7] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FEC4C7]"
                  placeholder="+91 ..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="w-full border border-[#FEC4C7] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FEC4C7]"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">
                Message*
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full border border-[#FEC4C7] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FEC4C7]"
                placeholder="Write your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FEC4C7] text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#fbe1e3] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <CircularProgress
                  size="sm"
                  aria-label="Submitting"
                  className="mr-2"
                />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="space-y-3 text-sm text-gray-700">
            <h2 className="text-lg font-semibold mb-1">Store Details</h2>
            <p>
              <span className="font-semibold">Phone:</span> +91 9421700364 /
              9423100105 / 9764878007
            </p>
            <p>
              <span className="font-semibold">Tel:</span> 0712 - 2728946
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:PareshNovelty@Gmail.Com"
                className="underline underline-offset-2"
              >
                PareshNovelty@Gmail.Com
              </a>
            </p>
            <p>
              <span className="font-semibold">Address:</span> Bohra Masjid Road,
              Itwari, Nagpur - 440002.
            </p>
            <p className="mt-3 text-xs text-gray-500">
              For website, technical or bulk order related queries, your message
              will be forwarded to{" "}
              <span className="font-semibold">akpadia09@gmail.com</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

