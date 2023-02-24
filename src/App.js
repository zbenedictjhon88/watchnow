import React, { lazy, Suspense, useEffect, useState, } from "react";
import Loading from "./jsx/components/Loading";
// import Index from "./jsx";

const Index = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx')), 500);
  });
});

function App() {

  const [visited, setVisited] = useState(false);

  useEffect(() => {
    setVisited(true);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Index />
    </Suspense>
  );
}

export default App;
