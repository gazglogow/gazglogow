interface Window {
  /** Populated only by the isolated laboratory performance runner. */
  siteMetrics: {
    lcpMs: number;
    cls: number;
    longTaskExcessMs: number;
  };
}
