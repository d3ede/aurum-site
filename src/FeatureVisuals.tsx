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
        <svg className="feature-orbits" viewBox="0 0 400 220" fill="none">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M -30 ${170 + i * 16} C 70 ${-20 + i * 18}, 240 ${290 + i * 12}, 435 ${50 + i * 16}`}
            />
          ))}
        </svg>
        <div className="mini-instance mini-instance-back">
          <span className="mini-world creative">
            <Box size={24} />
          </span>
          <div>
            <strong>{ru ? "Творческий мир" : "Creative"}</strong>
            <small>Vanilla · 1.21</small>
          </div>
          <Folder size={16} />
        </div>
        <div className="mini-instance mini-instance-front">
          <span className="mini-world">
            <Box size={27} />
          </span>
          <div>
            <strong>{ru ? "Выживание" : "Survival"}</strong>
            <small>Fabric · 1.21</small>
            <span className="mini-instance-meta">mods / saves / config</span>
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
        <span className="instance-link">
          <Folder size={13} /> .minecraft
        </span>
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
          <span className="mini-update-dot" />
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
          <i />
          <ArrowRight size={17} />
        </span>
        <span className="import-target">
          <Box size={25} />
          <span className="import-check">
            <Check size={10} />
          </span>
        </span>
      </div>
    );
  return (
    <div className="skins-illustration feature-visual" aria-hidden="true">
      <svg className="skin-figure" viewBox="0 0 100 150" fill="none">
        <ellipse cx="49" cy="139" rx="34" ry="7" className="skin-ground" />
        <path d="m57 44 21 7-1 65-21-7Z" className="skin-cape" />
        <path d="m31 49 28 7v43L31 92Z" className="skin-shirt" />
        <path d="m59 56 13-7v43l-13 7Z" className="skin-shirt-side" />
        <path d="m31 49 13-7 28 7-13 7Z" className="skin-shirt-top" />
        <path
          d="m31 92 13 3v37l-13-3Zm15 4 13 3v37l-13-3Z"
          className="skin-trousers"
        />
        <path d="m59 99 13-7v37l-13 7Z" className="skin-trousers-side" />
        <path
          d="m19 53 12-4v41l-12-3Zm53-4 12 5v37l-12 1Z"
          className="skin-arms"
        />
        <path d="m32 16 27 7v29l-27-7Z" className="skin-face" />
        <path d="m59 23 14-7v29l-14 7Z" className="skin-face-side" />
        <path d="m32 16 14-7 27 7-14 7Z" className="skin-hair" />
        <path d="m32 16 27 7v9l-27-7Z" className="skin-hair" />
        <path d="m38 31 5 1v4l-5-1Zm13 3 5 1v4l-5-1Z" className="skin-eyes" />
      </svg>
      <div className="skin-swatches">
        <span className="selected">
          <Check size={11} />
        </span>
        <span />
        <span />
      </div>
    </div>
  );
}
