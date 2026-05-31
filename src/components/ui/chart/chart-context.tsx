// Chart context and hook
import * as React from "react";
import type { ChartContextProps, ChartConfig } from "./chart-types";

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

export { ChartContext, useChart };