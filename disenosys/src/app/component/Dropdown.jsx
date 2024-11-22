"use client";
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronDown,
  FiEdit,
  FiPlusSquare,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar/Navbar.css";

export const ShiftingDropDown = () => (
  <div className="py-2 px-4 font-semibold text-base hover:text-[#057FE3] font-poppins">
    <Tabs />
  </div>
);

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);
  const path = usePathname();

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  return (
    <div onMouseLeave={() => handleSetSelected(null)} className="relative flex gap-2">
      {TABS.map((t) => (
        <Tab
          key={t.id}
          selected={selected}
          handleSetSelected={handleSetSelected}
          tab={t.id}
          path={path}
        >
          {t.title}
        </Tab>
      ))}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => (
  <button
    id={`shift-tab-${tab}`}
    onMouseEnter={() => handleSetSelected(tab)}
    onClick={() => handleSetSelected(tab)}
    className={`py-2 px-4 flex items-center font-semibold transition-colors ${
      selected === tab ? "text-[#057FE3]" : "text-white"
    }`}
    aria-expanded={selected === tab}
  >
    <span>{children}</span>
    <FiChevronDown className={`transition-transform ${selected === tab ? "rotate-180" : ""}`} />
  </button>
);

const Content = ({ selected, dir }) => (
  <motion.div
    id="overlay-content"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    className="absolute left-0 top-full w-32 rounded-lg border bg-[#182073] shadow-lg p-4"
  >
    <Bridge />
    <Nub selected={selected} />
    {TABS.map((t) =>
      selected === t.id ? (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: dir === "l" ? 100 : dir === "r" ? -100 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <t.Component />
        </motion.div>
      ) : null
    )}
  </motion.div>
);

const Bridge = () => <div className="absolute -top-6 left-0 right-0 h-6" />;

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const hoveredTab = document.getElementById(`shift-tab-${selected}`);
    const overlayContent = document.getElementById("overlay-content");
    if (!hoveredTab || !overlayContent) return;
    const tabRect = hoveredTab.getBoundingClientRect();
    const { left: contentLeft } = overlayContent.getBoundingClientRect();
    setLeft(tabRect.left + tabRect.width / 2 - contentLeft);
  }, [selected]);

  return (
    <motion.span
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-900 border border-neutral-600"
    />
  );
};

const Pricing = () => (
  <div className="w-24 h-12 lg:w-44 lg:h-5 space-y-3 flex flex-col">
    <Link href="/about" className="text-white hover:text-[#057FE3] flex items-center">
      <FiEdit className="mr-2" /> About
    </Link>
    {/* <Link href="/admin" className="text-white hover:text-[#057FE3] flex items-center">
      <FiPlusSquare className="mr-2" /> Admin
    </Link> */}
  </div>
);

const TABS = [{ title: "Company", Component: Pricing }].map((n, idx) => ({
  ...n,
  id: idx + 1,
}));
