"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Launcher } from "@/lib/useLauncher";
import { copyText } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Icon } from "./Icon";

function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = () =>
    Array.from(
      { length: 4 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)],
    ).join("");
  return `${part()}-${part()}`;
}

export function AccountsPanel({ launcher }: { launcher: Launcher }) {
  const { accounts, accountId, setAccountId, addAccount, removeAccount } =
    launcher;
  const { push } = useToast();
  const [nickname, setNickname] = useState("");
  const [flowOpen, setFlowOpen] = useState(false);
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(900);
  const [gamertag, setGamertag] = useState("");

  useEffect(() => {
    if (!flowOpen) return;
    const timer = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [flowOpen]);

  const expiry = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        {accounts.map((account) => {
          const active = account.id === accountId;
          return (
            <motion.div
              layout
              key={account.id}
              className="flex items-center gap-3 border px-3 py-2.5 transition-colors"
              style={{
                borderColor: active ? "rgba(255,106,0,.55)" : "#252A34",
                background: active ? "rgba(255,106,0,.06)" : "rgba(255,255,255,.012)",
              }}
            >
              <button
                type="button"
                onClick={() => setAccountId(account.id)}
                className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                aria-pressed={active}
              >
                <span
                  className="grid size-8 flex-none place-items-center font-display text-[13px] font-bold"
                  style={{
                    background: active
                      ? "linear-gradient(135deg,#FFB020,#FF6A00)"
                      : "#1b212b",
                    color: active ? "#1a0a01" : "#C3CAD4",
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                  aria-hidden="true"
                >
                  {account.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[13px] font-medium text-bone">
                      {account.name}
                    </span>
                    <span
                      className="pill"
                      style={{
                        borderColor:
                          account.kind === "Microsoft"
                            ? "rgba(53,224,240,.4)"
                            : "rgba(152,161,174,.35)",
                        color:
                          account.kind === "Microsoft" ? "#35E0F0" : "#98A1AE",
                      }}
                    >
                      {account.kind}
                    </span>
                  </span>
                  <span className="block truncate font-mono text-[10px] text-steel">
                    {account.detail}
                  </span>
                </span>
              </button>
              {active ? (
                <span className="font-mono text-[9px] tracking-[0.16em] text-magma uppercase">
                  active
                </span>
              ) : (
                <span className="font-mono text-[9px] tracking-[0.16em] text-steel/60 uppercase">
                  switch
                </span>
              )}
              <button
                type="button"
                onClick={() => removeAccount(account.id)}
                aria-label={`Remove ${account.name}`}
                className="grid size-6 place-items-center text-steel transition-colors hover:text-ember"
              >
                <Icon name="trash" className="size-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="border border-line bg-white/[0.015] p-3">
          <span className="kicker mb-2 block">Offline profile</span>
          <div className="flex gap-1.5">
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && nickname.trim()) {
                  addAccount(nickname, "Offline");
                  setNickname("");
                }
              }}
              placeholder="Nickname"
              maxLength={16}
              className="field min-w-0 flex-1"
              aria-label="Offline nickname"
            />
            <button
              type="button"
              onClick={() => {
                if (!nickname.trim()) {
                  push({
                    title: "Nickname required",
                    message: "Enter a name before adding an offline profile.",
                    tone: "warn",
                  });
                  return;
                }
                addAccount(nickname, "Offline");
                setNickname("");
              }}
              className="btn btn-ghost btn-sm flex-none"
            >
              <Icon name="plus" className="size-3" />
              Add
            </button>
          </div>
          <p className="mt-2 text-[10.5px] leading-snug text-steel/80">
            Local worlds only. No password, no token.
          </p>
        </div>

        <div className="border border-coolant/30 bg-coolant/[0.04] p-3">
          <span className="kicker mb-2 block text-coolant">Microsoft account</span>
          <button
            type="button"
            onClick={() => {
              if (flowOpen) {
                setFlowOpen(false);
                return;
              }
              setCode(makeCode());
              setSeconds(900);
              setFlowOpen(true);
            }}
            className="btn btn-ghost btn-sm w-full"
            aria-expanded={flowOpen}
          >
            <Icon name="microsoft" className="size-3" />
            {flowOpen ? "Hide sign-in" : "Sign in with device code"}
          </button>
          <p className="mt-2 text-[10.5px] leading-snug text-steel/80">
            The launcher never sees your password.
          </p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {flowOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border border-coolant/35 bg-coolant/[0.05] p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[9.5px] tracking-[0.2em] text-coolant uppercase">
                  Device code · preview
                </span>
                <span className="tabular font-mono text-[10px] text-steel">
                  expires in {expiry}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 border border-coolant/30 bg-black/40 px-3 py-2 text-center font-mono text-[17px] tracking-[0.4em] text-whitehot">
                  {code || "····-····"}
                </code>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await copyText(code);
                    push({
                      title: ok ? "Code copied" : "Copy failed",
                      message: ok
                        ? "Paste it on the Microsoft device page."
                        : "Select the code and copy it manually.",
                      tone: ok ? "ok" : "warn",
                    });
                  }}
                  className="btn btn-ghost btn-sm flex-none"
                  aria-label="Copy device code"
                >
                  <Icon name="copy" className="size-3" />
                  Copy
                </button>
              </div>
              <div className="mt-2.5 flex flex-col gap-1.5 sm:flex-row">
                <input
                  value={gamertag}
                  onChange={(event) => setGamertag(event.target.value)}
                  placeholder="Xbox gamertag after approval"
                  maxLength={16}
                  className="field min-w-0 flex-1"
                  aria-label="Xbox gamertag"
                />
                <button
                  type="button"
                  disabled={seconds === 0}
                  onClick={() => {
                    if (!gamertag.trim()) {
                      push({
                        title: "Gamertag required",
                        message: "Enter the gamertag that approved the code.",
                        tone: "warn",
                      });
                      return;
                    }
                    addAccount(gamertag, "Microsoft");
                    setGamertag("");
                    setFlowOpen(false);
                  }}
                  className="btn btn-primary btn-sm flex-none"
                >
                  <Icon name="check" className="size-3" />
                  Approval received
                </button>
              </div>
              <p className="mt-2 text-[10px] leading-snug text-steel/80">
                This console is a preview. No sign-in request leaves this page —
                the real launcher opens Microsoft&apos;s device page and stores
                only the refresh token.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
        <span className="flex items-center gap-2">
          <span className="dot" style={{ color: "#79E0A5" }} />
          <span className="font-mono text-[10.5px] text-steel">
            Microsoft session refresh · silent, local only
          </span>
        </span>
        <span className="font-mono text-[9px] tracking-[0.16em] text-steel/60 uppercase">
          auto
        </span>
      </div>
    </div>
  );
}