import React, { lazy, Suspense, useEffect, useState, } from "react";
import Loading from "./jsx/components/Loading";
import ReactGA from 'react-ga';
import { pageViewsTracking } from "./services/analytics";
import apiConfig from "./config/api.config";

// import Index from "./jsx";

const Index = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx')), 500);
  });
});

function App() {

  useEffect(() => {
    ReactGA.initialize(apiConfig.ga_tracking_id);
    pageViewsTracking();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Index />
    </Suspense>
  );
}

export default App;
