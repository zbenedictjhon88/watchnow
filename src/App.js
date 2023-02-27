import React, { lazy, Suspense, useEffect, useState, } from "react";
import Loading from "./jsx/components/Loading";
import ReactGA from 'react-ga';
import { pageViewsTracking } from "./services/analytics";
import apiConfig from "./config/api.config";

import Index from "./jsx";


function App() {

  useEffect(() => {
    ReactGA.initialize('UA-258466588-1');
    pageViewsTracking();
  }, []);

  return (
    <>
      <Index />
    </>
  );
}

export default App;
