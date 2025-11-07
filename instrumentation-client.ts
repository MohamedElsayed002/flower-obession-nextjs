// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0ec44d5425ed5eaab561de4f9a07f824@o4510058158096384.ingest.de.sentry.io/4510058162290768",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      autoInject: false
    })
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

if (typeof window !== "undefined") {
  const mountFeedbackWidget = () => {
    const feedback = Sentry.getFeedback();
    if (!feedback) {
      return;
    }

    if (document.querySelector("[data-sentry-feedback-widget='true']")) {
      return;
    }

    const widget = feedback.createWidget({
      triggerLabel: "Feedback"
    });

    const widgetElement = widget.el;
    widgetElement.setAttribute("data-sentry-feedback-widget", "true");
    widgetElement.id = "sentry-feedback-button";

    document.body.appendChild(widgetElement);
    widget.appendToDom();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountFeedbackWidget, { once: true });
  } else {
    mountFeedbackWidget();
  }
}