"use client";

import dynamic from "next/dynamic";

const TypewellApp = dynamic(() => import("./App"), {
  ssr: false,
  loading: () => <div className="app-loading" style={{ minHeight: "100vh" }} aria-hidden="true" />
});

export default TypewellApp;
