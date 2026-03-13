import { Card } from "@/src/components/ui/Card";
import { StageConfig } from "../Gymbro";

export type GymBroStage = 0 | 1 | 2 | 3 | 4;

function getStageStatus(
  stageIdx: GymBroStage,
  currentStage: GymBroStage,
): StageStatus {
  if (stageIdx === 4 && stageIdx > currentStage) return "legendary";
  if (stageIdx < currentStage) return "unlocked";
  if (stageIdx === currentStage) return "current";
  return "locked";
}

type StageStatus = "unlocked" | "current" | "locked" | "legendary";

const STAGE_STATUS_STYLES: Record<
  StageStatus,
  { wrapper: string; title: string; meta: string; dot: string }
> = {
  unlocked: {
    wrapper: "bg-success/5 border-success/25",
    title: "text-success",
    meta: "text-muted",
    dot: "bg-success",
  },
  current: {
    wrapper: "bg-primary/8 border-primary/40",
    title: "text-primary",
    meta: "text-muted",
    dot: "bg-primary",
  },
  locked: {
    wrapper: "bg-elevated border-border opacity-50",
    title: "text-muted",
    meta: "text-muted",
    dot: "bg-border",
  },
  legendary: {
    wrapper: "bg-accent/5 border-accent/20 opacity-50",
    title: "text-accent",
    meta: "text-muted",
    dot: "bg-accent",
  },
};

const STATUS_BADGE: Record<StageStatus, string> = {
  unlocked: "✓ Unlocked",
  current: "✓ Current",
  locked: "🔒 Locked",
  legendary: "🔒 Locked",
};

export const StageListItem = ({
  stageIdx,
  config,
  currentStage,
}: {
  stageIdx: GymBroStage;
  config: StageConfig;
  currentStage: GymBroStage;
}) => {
  const status = getStageStatus(stageIdx, currentStage);
  const styles = STAGE_STATUS_STYLES[status];

  return (
    <Card
      className={`flex items-center gap-3 p-3 border ${styles.wrapper} transition-all duration-200`}
    >
      <span className="text-xl shrink-0 leading-none">{config.emoji}</span>

      <div className="flex-1 min-w-0">
        <p className={`text-xl font-bold leading-tight ${styles.title}`}>
          Stage {stageIdx} — {config.stageName}
        </p>
        <p className={`font-mono text-[16px] mt-0.5 ${styles.meta}`}>
          {config.sessionRange} · {STATUS_BADGE[status]}
        </p>
      </div>

      {status === "current" && (
        <span
          className={`size-2 rounded-full shrink-0 ${styles.dot} animate-pulse`}
        />
      )}
    </Card>
  );
};
