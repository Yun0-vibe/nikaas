"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CATALOG,
  CHAMBER_NAMES,
  DRIVES,
  LOADERS,
  SEED_ACCOUNTS,
  SEED_CHAMBERS,
  SERVERS,
  VERSIONS,
  type Account,
  type Chamber,
  type Loader,
} from "@/lib/data";
import { clamp, formatClock, pick, uid } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export type ConsoleTab =
  | "deck"
  | "chambers"
  | "catalog"
  | "accounts"
  | "settings";

export type Phase = "idle" | "releasing" | "running";

export type LogKind = "info" | "ok" | "warn" | "error" | "system" | "live";

export type LogLine = {
  id: number;
  t: string;
  text: string;
  kind: LogKind;
  verbose?: boolean;
};

export type Settings = {
  jvmArgs: string;
  serverIp: string;
  gameDir: string;
  autoJava: boolean;
  closeOnStart: boolean;
};

export type Prefs = {
  speed: number;
  verbose: boolean;
  autoScroll: boolean;
};

type Step = { at: number; text: string; kind: LogKind; verbose?: boolean };

const CLOCK_START = 12 * 3600 + 4 * 60 + 17;

const SEED_LOG: LogLine[] = [
  { id: 1, t: "12:04:11", text: "assets ✓ 1,284 files verified", kind: "ok" },
  { id: 2, t: "12:04:12", text: "libraries ✓ 96 files ready", kind: "ok" },
  {
    id: 3,
    t: "12:04:14",
    text: "loader neoforge 21.1.72 ready",
    kind: "info",
  },
  {
    id: 4,
    t: "12:04:15",
    text: "chamber ATLAS · 8192 MB memory",
    kind: "info",
  },
  {
    id: 5,
    t: "12:04:16",
    text: "exhaust idle · waiting for release",
    kind: "system",
  },
];

const DEFAULT_SETTINGS: Settings = {
  jvmArgs: "-XX:+UseG1GC -Dsun.rmi.dgc.server.gcInterval=2147483646",
  serverIp: "mc.hypixel.net",
  gameDir: DRIVES[0],
  autoJava: true,
  closeOnStart: false,
};

const DEFAULT_PREFS: Prefs = { speed: 1, verbose: true, autoScroll: true };

function loaderVersion(loader: Loader, gameVersion: string): string {
  switch (loader) {
    case "NeoForge":
      return gameVersion.startsWith("1.21") ? "21.1.72" : "20.4.190";
    case "Forge":
      return gameVersion.startsWith("1.20") ? "47.3.0" : "52.0.16";
    case "Fabric":
      return "0.16.9";
    default:
      return "vanilla";
  }
}

function buildSteps(
  chamber: Chamber,
  settings: Settings,
  account: Account | undefined,
): { steps: Step[]; total: number } {
  const steps: Step[] = [];
  const add = (at: number, text: string, kind: LogKind, verbose = false) =>
    steps.push({ at, text, kind, verbose });

  add(0, `release requested · chamber ${chamber.name.toUpperCase()}`, "system");
  add(260, `resolving minecraft ${chamber.version} (${chamber.loader.toLowerCase()})`, "info");
  add(720, `version manifest fetched · ${chamber.version}.json`, "ok", true);

  if (settings.autoJava) {
    add(1120, "java runtime · mojang java 21.0.3 windows-x64", "info", true);
    add(1560, "java 21 ready · 78.4 MB", "ok");
  } else {
    add(1120, "java runtime · using system JAVA_HOME", "warn");
  }

  add(1960, "assets index 1.21.json · 1,284 objects", "info", true);
  add(2420, "assets ✓ 1,284 files verified", "ok");
  add(2880, "libraries · resolving 96 files", "info", true);
  add(3340, "libraries ✓ 96 files ready", "ok");

  if (chamber.loader !== "Vanilla") {
    const version = loaderVersion(chamber.loader, chamber.version);
    add(3760, `loader ${chamber.loader.toLowerCase()} ${version}`, "info");
    add(4240, `loader ${chamber.loader.toLowerCase()} ${version} ready`, "ok");
  }

  if (chamber.mods > 0) {
    add(4620, `mods · ${chamber.mods} jars mounted from chamber`, "info");
    if (chamber.mods > 200) {
      add(4980, "2 jars target a newer game version · skipped", "warn");
    }
  } else {
    add(4620, "mods · chamber is clean, no jars mounted", "info", true);
  }

  add(5340, `chamber ${chamber.name.toUpperCase()} · ${chamber.ram * 1024} MB memory`, "info");
  if (settings.jvmArgs.trim()) {
    add(5680, `jvm · ${settings.jvmArgs.trim()}`, "info", true);
  }
  add(
    6020,
    `account · ${account?.name ?? "Steve"} (${account?.kind.toLowerCase() ?? "offline"})`,
    "info",
  );
  if (settings.serverIp.trim()) {
    add(6360, `direct connect · ${settings.serverIp.trim()}`, "info");
  }
  add(6740, `storage · ${settings.gameDir}\\chambers\\${chamber.name.toLowerCase()}`, "info", true);
  add(7120, "assembling launch arguments", "live", true);
  add(7560, "classpath built · 148 entries", "ok", true);
  add(8020, "release · handing off to the game", "live");

  const total = 8600;
  add(total, `game running · chamber ${chamber.name.toUpperCase()}`, "ok");
  return { steps, total };
}

export function useLauncher() {
  const { push } = useToast();

  const [chambers, setChambers] = useState<Chamber[]>(SEED_CHAMBERS);
  const [activeId, setActiveId] = useState<string>(SEED_CHAMBERS[0].id);
  const [accounts, setAccounts] = useState<Account[]>(SEED_ACCOUNTS);
  const [accountId, setAccountId] = useState<string>(SEED_ACCOUNTS[0].id);
  const [tab, setTab] = useState<ConsoleTab>("chambers");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [log, setLog] = useState<LogLine[]>(SEED_LOG);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [runId, setRunId] = useState(0);

  const clock = useRef(CLOCK_START);
  const lineId = useRef(SEED_LOG.length + 1);
  const run = useRef<{
    steps: Step[];
    total: number;
    elapsed: number;
    emitted: number;
  } | null>(null);
  const speed = useRef(prefs.speed);

  useEffect(() => {
    speed.current = prefs.speed;
  }, [prefs.speed]);

  const activeChamber = chambers.find((chamber) => chamber.id === activeId);
  const activeAccount = accounts.find((account) => account.id === accountId);

  const append = useCallback(
    (text: string, kind: LogKind = "info", verbose = false) => {
      clock.current += 1;
      const line: LogLine = {
        id: lineId.current++,
        t: formatClock(clock.current),
        text,
        kind,
        verbose,
      };
      setLog((current) => [...current.slice(-259), line]);
    },
    [],
  );

  useEffect(() => {
    if (phase !== "releasing") return;
    const timer = setInterval(() => {
      const current = run.current;
      if (!current) return;
      current.elapsed += 60 * speed.current;

      while (
        current.emitted < current.steps.length &&
        current.steps[current.emitted].at <= current.elapsed
      ) {
        const step = current.steps[current.emitted++];
        append(step.text, step.kind, step.verbose);
      }

      setProgress(clamp(current.elapsed / current.total, 0, 1));

      if (current.elapsed >= current.total) {
        run.current = null;
        setPhase("running");
        setProgress(1);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [phase, runId, append]);

  useEffect(() => {
    if (phase !== "running") return;
    const timer = setInterval(() => setUptime((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const patchChamber = useCallback(
    (id: string, patch: Partial<Chamber>) => {
      setChambers((current) =>
        current.map((chamber) =>
          chamber.id === id ? { ...chamber, ...patch } : chamber,
        ),
      );
    },
    [],
  );

  const release = useCallback(() => {
    if (phase !== "idle" || !activeChamber) return;
    const { steps, total } = buildSteps(activeChamber, settings, activeAccount);
    run.current = { steps, total, elapsed: 0, emitted: 0 };
    setProgress(0);
    setUptime(0);
    setPhase("releasing");
    setRunId((value) => value + 1);
    setTab("chambers");
  }, [phase, activeChamber, settings, activeAccount]);

  const stop = useCallback(() => {
    if (phase === "idle") return;
    run.current = null;
    setPhase("idle");
    setProgress(0);
    setUptime(0);
    append(
      `vent closed · chamber ${activeChamber?.name.toUpperCase() ?? ""} returned to idle`,
      "warn",
    );
  }, [phase, append, activeChamber]);

  const selectChamber = useCallback(
    (id: string) => {
      setActiveId(id);
      const chamber = chambers.find((item) => item.id === id);
      if (chamber) append(`chamber ${chamber.name.toUpperCase()} selected`, "system");
    },
    [chambers, append],
  );

  const createChamber = useCallback(
    (input: { name: string; version: string; loader: Loader }) => {
      const chamber: Chamber = {
        id: uid("chamber"),
        name: input.name.trim() || pick(CHAMBER_NAMES),
        version: input.version,
        loader: input.loader,
        mods: 0,
        ram: 4,
        played: "never",
        sizeGb: 0.4,
        installed: [],
      };
      setChambers((current) => [...current, chamber]);
      setActiveId(chamber.id);
      append(`chamber ${chamber.name.toUpperCase()} sealed · ${chamber.loader} ${chamber.version}`, "ok");
      push({
        title: `${chamber.name} created`,
        message: `${chamber.loader} ${chamber.version} · empty chamber ready`,
        tone: "ok",
      });
    },
    [append, push],
  );

  const deleteChamber = useCallback(
    (id: string) => {
      const index = chambers.findIndex((chamber) => chamber.id === id);
      const removed = chambers[index];
      if (!removed) return;
      if (phase !== "idle" && id === activeId) {
        push({
          title: "Chamber is under load",
          message: "Close the vent before deleting a running chamber.",
          tone: "warn",
        });
        return;
      }
      const rest = chambers.filter((chamber) => chamber.id !== id);
      setChambers(rest);
      if (activeId === id) setActiveId(rest[0]?.id ?? "");
      append(`chamber ${removed.name.toUpperCase()} unsealed · folder removed`, "warn");
      push({
        title: `${removed.name} deleted`,
        message: `${removed.mods} mods · ${removed.sizeGb} GB released`,
        tone: "danger",
        action: {
          label: "Undo",
          onClick: () => {
            setChambers((current) => {
              const next = [...current];
              next.splice(Math.min(index, next.length), 0, removed);
              return next;
            });
            setActiveId(removed.id);
            append(`chamber ${removed.name.toUpperCase()} restored`, "ok");
          },
        },
      });
    },
    [chambers, activeId, phase, append, push],
  );

  const renameChamber = useCallback(
    (id: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      patchChamber(id, { name: trimmed });
      append(`chamber renamed to ${trimmed.toUpperCase()}`, "system");
    },
    [patchChamber, append],
  );

  const toggleMod = useCallback(
    (itemId: string) => {
      if (!activeChamber) return;
      const item = CATALOG.find((entry) => entry.id === itemId);
      if (!item) return;
      const installed = activeChamber.installed.includes(itemId);
      const dependency = item.dependency
        ? CATALOG.find((entry) => entry.id === item.dependency)
        : undefined;
      const addsDependency =
        !installed &&
        dependency &&
        !activeChamber.installed.includes(dependency.id);

      const nextInstalled = installed
        ? activeChamber.installed.filter((id) => id !== itemId)
        : [
            ...activeChamber.installed,
            itemId,
            ...(addsDependency ? [dependency!.id] : []),
          ];

      patchChamber(activeChamber.id, {
        installed: nextInstalled,
        mods: Math.max(0, activeChamber.mods + (installed ? -1 : addsDependency ? 2 : 1)),
        sizeGb: Number(
          Math.max(
            0.2,
            activeChamber.sizeGb + (installed ? -item.sizeMb / 1024 : item.sizeMb / 1024),
          ).toFixed(2),
        ),
      });

      append(
        installed
          ? `catalog · ${item.name} removed from ${activeChamber.name.toUpperCase()}`
          : `catalog · ${item.name} ${item.sizeMb} MB installed into ${activeChamber.name.toUpperCase()}`,
        installed ? "warn" : "ok",
      );
      if (addsDependency) {
        append(`dependency · ${dependency!.name} pulled in automatically`, "info");
      }
      push({
        title: installed ? `${item.name} removed` : `${item.name} installed`,
        message: addsDependency
          ? `${dependency!.name} came along as a required dependency`
          : `${activeChamber.name} · ${item.category.toLowerCase()}`,
        tone: installed ? "warn" : "ok",
      });
    },
    [activeChamber, patchChamber, append, push],
  );

  const addAccount = useCallback(
    (name: string, kind: Account["kind"]) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const account: Account = {
        id: uid("account"),
        name: trimmed,
        kind,
        detail:
          kind === "Microsoft" ? "Online servers · Realms" : "Local worlds only",
      };
      setAccounts((current) => [...current, account]);
      setAccountId(account.id);
      append(
        `account · ${trimmed} signed in (${kind.toLowerCase()})`,
        "ok",
      );
      push({
        title: `${trimmed} is ready`,
        message:
          kind === "Microsoft"
            ? "Microsoft token stored · online servers unlocked"
            : "Offline profile · local worlds only",
        tone: "ok",
      });
    },
    [append, push],
  );

  const removeAccount = useCallback(
    (id: string) => {
      const index = accounts.findIndex((account) => account.id === id);
      const removed = accounts[index];
      if (!removed) return;
      if (accounts.length === 1) {
        push({
          title: "Keep one profile",
          message: "Nikaas needs at least one account to release a chamber.",
          tone: "warn",
        });
        return;
      }
      const rest = accounts.filter((account) => account.id !== id);
      setAccounts(rest);
      if (accountId === id) setAccountId(rest[0].id);
      append(`account · ${removed.name} signed out`, "warn");
      push({
        title: `${removed.name} removed`,
        tone: "danger",
        action: {
          label: "Undo",
          onClick: () => {
            setAccounts((current) => {
              const next = [...current];
              next.splice(Math.min(index, next.length), 0, removed);
              return next;
            });
            setAccountId(removed.id);
          },
        },
      });
    },
    [accounts, accountId, append, push],
  );

  const randomize = useCallback(() => {
    if (!activeChamber) return;
    const loader = pick(LOADERS);
    const version = pick(VERSIONS);
    const ram = pick([2, 4, 6, 8, 10, 12]);
    patchChamber(activeChamber.id, {
      loader,
      version,
      ram,
      played: "just now",
    });
    setSettings((current) => ({ ...current, serverIp: pick(SERVERS) }));
    append(
      `randomized · ${loader} ${version} · ${ram} GB · ${activeChamber.name.toUpperCase()}`,
      "system",
    );
    push({
      title: "Chamber re-rolled",
      message: `${loader} ${version} · ${ram} GB memory`,
      tone: "info",
    });
  }, [activeChamber, patchChamber, append, push]);

  const reset = useCallback(() => {
    run.current = null;
    clock.current = CLOCK_START;
    lineId.current = SEED_LOG.length + 1;
    setChambers(SEED_CHAMBERS);
    setActiveId(SEED_CHAMBERS[0].id);
    setAccounts(SEED_ACCOUNTS);
    setAccountId(SEED_ACCOUNTS[0].id);
    setSettings(DEFAULT_SETTINGS);
    setPrefs(DEFAULT_PREFS);
    setLog(SEED_LOG);
    setPhase("idle");
    setProgress(0);
    setUptime(0);
    setTab("chambers");
    push({
      title: "Console reset",
      message: "Chambers, accounts and exhaust restored to the seeded state",
      tone: "info",
    });
  }, [push]);

  const logText = useMemo(
    () =>
      log
        .map((line) => `[${line.t}] ${line.kind.toUpperCase().padEnd(6)} ${line.text}`)
        .join("\n"),
    [log],
  );

  const statusLabel = useMemo(() => {
    if (phase === "running") return `Game running · ${activeChamber?.name ?? ""}`;
    if (phase === "idle") return "Exhaust idle · awaiting release";
    if (progress < 0.14) return "Resolving game version";
    if (progress < 0.3) return "Downloading Java runtime";
    if (progress < 0.48) return "Verifying assets";
    if (progress < 0.62) return "Preparing libraries";
    if (progress < 0.78) return "Mounting mods";
    if (progress < 0.94) return "Assembling launch arguments";
    return "Handing off to the game";
  }, [phase, progress, activeChamber]);

  return {
    chambers,
    activeChamber,
    activeId,
    accounts,
    activeAccount,
    accountId,
    tab,
    settings,
    prefs,
    log,
    logText,
    phase,
    progress,
    uptime,
    statusLabel,
    setTab,
    setSettings,
    setPrefs,
    setAccountId,
    setActiveId: selectChamber,
    patchChamber,
    createChamber,
    deleteChamber,
    renameChamber,
    toggleMod,
    addAccount,
    removeAccount,
    release,
    stop,
    randomize,
    reset,
    append,
  };
}

export type Launcher = ReturnType<typeof useLauncher>;