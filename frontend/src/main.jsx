import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import {
  AnalyticsProvider,
  ErrorBoundary,
  ErrorReporterProvider,
  FeatureFlagsProvider,
  ga4Adapter,
  plausibleAdapter,
  createHttpErrorReporter,
} from "./modules";
import './index.css'

const reportError = createHttpErrorReporter({
  endpoint: import.meta.env.VITE_ERROR_ENDPOINT,
  app: "my-react-app",
  release: import.meta.env.VITE_APP_VERSION,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorReporterProvider reportError={reportError}>
      <ErrorBoundary>
        <AnalyticsProvider
          adapters={[
            ga4Adapter({ measurementId: "G-XXXXXXXXXX" }),
            plausibleAdapter(),
          ]}
        >
          <FeatureFlagsProvider endpoint="/config/feature-flags.json">
            <App />
          </FeatureFlagsProvider>
        </AnalyticsProvider>
      </ErrorBoundary>
    </ErrorReporterProvider>
  </React.StrictMode>
);
