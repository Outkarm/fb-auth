"use client";

import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useFeatureFlagContext } from "../context/FeatureFlags.Context";
import logger from "@/logger";

export default function ToggleQa() {
  const [enabled, setEnabled] = useState(false),
    { activeFeatureFlags, fetchFeatureFlags } = useFeatureFlagContext();

  useEffect(() => {
    if (activeFeatureFlags.includes("qa")) {
      setEnabled(true);
    }
  }, []);

  function handleToggleQa() {
    fetch("/api/config", {
      method: "POST",
      body: JSON.stringify({
        qa: !enabled ? "on" : "off",
      }),
      headers: {
        "Content-Type": "aaplication/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setEnabled(!enabled);
          fetchFeatureFlags();
          return;
        }

        throw "error";
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="tw-flex tw-w-fit tw-flex-wrap tw-gap-4">
      <span>Enable qa: </span>
      <Switch
        checked={enabled}
        onClick={handleToggleQa}
        className={`${
          enabled ? "tw-bg-blue-600" : "tw-bg-gray-200"
        } tw-relative tw-inline-flex tw-h-6 tw-w-11 tw-items-center tw-rounded-full`}
      >
        <span className="tw-sr-only">Enable qa</span>
        <span
          className={`${
            enabled
              ? "tw-translate-x-6 tw-bg-white"
              : "tw-translate-x-1 tw-bg-blue-600"
          } tw-inline-block tw-h-4 tw-w-4 tw-transform tw-rounded-full  tw-transition`}
        />
      </Switch>
    </div>
  );
}
