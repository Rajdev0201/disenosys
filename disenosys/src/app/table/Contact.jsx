import React from "react";

const Contact = () => {
  return (
    <section className="bg-[#0d1039] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-[#12183f] p-10 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want to learn more?</h2>
          <p className="text-slate-300 mb-6 leading-7">
            Connect with our team for course details, placement support, and pricing information. We&apos;re here to help you choose the right program.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-slate-400 uppercase tracking-[0.2em] mb-2">Call Us</p>
              <p className="text-xl font-semibold">+91 99443 03400</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-[0.2em] mb-2">Email</p>
              <p className="text-xl font-semibold">info@disenosys.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
