import React from "react";
import "./Online.css";

const Online = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white shadow-xl p-8 md:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Online Courses at Disenosys
          </h1>
          <p className="text-lg text-slate-600 mb-6 leading-8">
            Experience flexible, instructor-led training tailored for working professionals and students. Our online curriculum lets you learn automotive design with live sessions, real project practice, and placement guidance.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[#0d1039] p-6 text-white">
              <h2 className="text-2xl font-semibold mb-3">What you get</h2>
              <ul className="space-y-2 text-slate-200">
                <li>Live interactive sessions</li>
                <li>Assignments & project reviews</li>
                <li>Placement assistance</li>
                <li>Lifetime access to recordings</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-100 p-6">
              <h2 className="text-2xl font-semibold mb-3 text-slate-900">Ready to enroll?</h2>
              <p className="text-slate-600 leading-7">
                Fill out the online course form and our admissions team will contact you with the next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Online;
