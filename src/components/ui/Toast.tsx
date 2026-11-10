"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn, uid } from "@/lib/utils";

export type ToastTone = "ok" | "info" | "warn" | "danger";

export type Toast = {
  id: string;
  title: string;
  message?: string;
  tone: ToastTone;
  action?: { label: string; onClick: () => void };
};

type ToastInput = Omit<Toast, "id" | "tone"> & { tone?: ToastTone };

const ToastContext = createContext<{
  push: (toast: ToastInput) => void;
} | null>(null);

const TONE: Record<ToastTone, { color: string; glyph: string }> = {
  ok: { color: "#86E85A", glyph: "✓" },
  info: { color: "#45E3CF", glyph: "i" },
  warn: { color: "#FFC94A", glyph: "!" },
  danger: { color: "#FF5C3D", glyph: "×" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (input: ToastInput) => {
      const id = uid("toast");
      const toast: Toast = { id, tone: input.tone ?? "info", ...input };
      setToasts((current) => [...current.slice(-2), toast]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), input.action ? 7000 : 4200),
      );
    },
    [dismiss],
  );

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[120] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const tone = TONE[toast.tone];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 border border-line bg-[#0b0e14]/95 p-3.5 shadow-forge backdrop-blur-md"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: `0 18px 44px rgba(0,0,0,.6), inset 3px 0 0 ${tone.color}`,
                }}
              >
                <span
                  className="mt-0.5 grid size-5 flex-none place-items-center rounded-full font-mono text-[11px] font-medium"
                  style={{
                    color: tone.color,
                    background: `${tone.color}1f`,
                    boxShadow: `0 0 14px ${tone.color}44`,
                  }}
                  aria-hidden="true"
                >
                  {tone.glyph}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[13.5px] leading-snug font-semibold text-bone">
                    {toast.title}
                  </p>
                  {toast.message ? (
                    <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-steel">
                      {toast.message}
                    </p>
                  ) : null}
                  {toast.action ? (
                    <button
                      type="button"
                      onClick={() => {
                        toast.action?.onClick();
                        dismiss(toast.id);
                      }}
                      className={cn(
                        "mt-2 font-mono text-[10.5px] tracking-[0.14em] uppercase",
                        "border-b border-current pb-px transition-opacity hover:opacity-70",
                      )}
                      style={{ color: tone.color }}
                    >
                      {toast.action.label}
                    </button>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                  className="-mt-1 -mr-1 grid size-6 flex-none place-items-center text-steel transition-colors hover:text-bone"
                >
                  <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
                    <path
                      d="M3 3l10 10M13 3L3 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}