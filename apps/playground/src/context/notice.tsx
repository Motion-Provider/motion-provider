import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRequiredContext } from "@/hooks/use-required";

interface Notice {
  text: string;
  error: boolean;
}

type Report = (text: string, error?: boolean) => void;

const INFO_MS = 4500;
const ERROR_MS = 7500;

const ReportContext = createContext<Report | null>(null);

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice>();

  const report = useCallback<Report>(
    (text, error = false) => setNotice({ text, error }),
    [],
  );

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(
      () => setNotice(undefined),
      notice.error ? ERROR_MS : INFO_MS,
    );

    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <ReportContext.Provider value={report}>
      {children}
      {notice && (
        <div
          role={notice.error ? "alert" : "status"}
          className={`pointer-events-none fixed right-4 bottom-4 z-110 max-w-[calc(100vw-2rem)] rounded-2xl border mp-glass mp-glass-raised px-4 py-3 text-sm ${notice.error ? "text-danger" : "text-foreground"}`}
        >
          {notice.text}
        </div>
      )}
    </ReportContext.Provider>
  );
}

export function useReport(): Report {
  return useRequiredContext(ReportContext, "useReport");
}
