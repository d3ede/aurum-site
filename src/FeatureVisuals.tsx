import {
  ArrowRight,
  Box,
  Check,
  Folder,
  PackageOpen,
  RefreshCw,
} from "lucide-react";

export function FeatureVisual({
  kind,
  language,
}: {
  kind: number;
  language: "ru" | "en";
}) {
  const ru = language === "ru";
  if (kind === 0)
    return (
      <div className="instance-illustration feature-visual" aria-hidden="true">
        <div className="mini-instance mini-instance-back">
          <span className="mini-world creative">
            <Box size={24} />
          </span>
          <div>
            <strong>{ru ? "Творческий мир" : "Creative"}</strong>
            <small>Vanilla · 1.21</small>
          </div>
        </div>
        <div className="mini-instance mini-instance-front">
          <span className="mini-world">
            <Box size={27} />
          </span>
          <div>
            <strong>{ru ? "Выживание" : "Survival"}</strong>
            <small>Fabric · 1.21</small>
          </div>
          <span className="mini-play">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M5 3.5 12 8l-7 4.5Z"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  if (kind === 1)
    return (
      <div className="mods-illustration feature-visual" aria-hidden="true">
        <div className="mini-mod">
          <span className="mini-mod-symbol">
            <PackageOpen size={20} />
          </span>
          <strong>Fabric API</strong>
          <Check size={14} />
        </div>
        <div className="mini-mod">
          <span className="mini-mod-symbol sodium">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C10 7 4 9 4 15a8 8 0 0 0 16 0c0-4-3-7-5-9 0 4-1 5-3 6-2-3-2-6 0-10Z" />
            </svg>
          </span>
          <strong>Sodium</strong>
          <Check size={14} />
        </div>
        <div className="mini-update">
          <RefreshCw size={13} />
          <span>{ru ? "Обновить контент" : "Update content"}</span>
        </div>
      </div>
    );
  if (kind === 2)
    return (
      <div className="import-illustration feature-visual" aria-hidden="true">
        <div className="import-sources">
          <span>.mrpack</span>
          <span>
            <Folder size={13} /> ZIP
          </span>
        </div>
        <span className="import-route">
          <ArrowRight size={17} />
        </span>
        <span className="import-target">
          <Box size={25} />
        </span>
      </div>
    );
  return (
    <div className="skins-illustration feature-visual" aria-hidden="true">
      <img
        src={`${import.meta.env.BASE_URL}assets/steve-preview.png`}
        width="240"
        height="320"
        alt=""
        loading="lazy"
      />
      <span className="skin-preview-caption">Steve</span>
    </div>
  );
}
