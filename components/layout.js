"use client";

import Breadcrumb from "./breadcrumb";
import Footer from "./footer";

export default function Layout({ page, children }) {
  return (
    <>
      <main className="pt-14 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">
        <Breadcrumb messagePrefix={'/' + page} />
        {children}
      </main>
      <Footer />
    </>
  );
}
