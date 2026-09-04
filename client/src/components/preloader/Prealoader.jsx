import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Preloader.css"

/**
 * // for undersanding :
 * Full-page load animation for AAKP Builder.
 *
 * Fires automatically whenever the browser does a real page load or
 * reload (Ctrl/Cmd+R, the reload button, or a fresh visit) — because
 * a hard reload remounts the whole React tree, and this runs its
 * animation inside a useEffect on mount. It will NOT re-fire on
 * client-side route changes (e.g. React Router pushing a new page),
 * which is what you want — you don't want it playing every time
 * someone clicks a nav link.
 */
export default function Preloader({ onComplete }) {
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const lettersRef = useRef(null);
  const countRef = useRef(null);
  const panelTopRef = useRef(null);
  const panelBottomRef = useRef(null);

  const brand = "AAKP";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = lettersRef.current.querySelectorAll(".letter");
      const counter = { val: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setDone(true);
          // give the exit CSS transition time to finish before
          // telling the parent app it can stop rendering this
          setTimeout(() => onComplete && onComplete(), 700);
        },
      });

      // 1. letters rise in with a stagger + slight skew, like pages
      //    of a document snapping into place
      tl.set(letters, { yPercent: 120, skewY: 8, opacity: 0 })
        .to(letters, {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
        })
        // 2. progress counter ticks up while the letters hold
        .to(
          counter,
          {
            val: 100,
            duration: 1.1,
            ease: "power1.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.floor(counter.val)
                ).padStart(2, "0");
              }
            },
          },
          "-=0.2"
        )
        // 3. everything holds a beat, then the two panels wipe apart
        //    like a page turning open, revealing the real app beneath
        .to(letters, { opacity: 0.4, duration: 0.3 }, "+=0.1")
        .to(
          panelTopRef.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "wipe"
        )
        .to(
          panelBottomRef.current,
          { yPercent: 100, duration: 0.9, ease: "power4.inOut" },
          "wipe"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className={`preloader ${done ? "preloader--done" : ""}`}
      aria-hidden="true"
    >
      <div ref={panelTopRef} className="preloader__panel preloader__panel--top" />
      <div
        ref={panelBottomRef}
        className="preloader__panel preloader__panel--bottom"
      />

      <div className="preloader__content">
        <div ref={lettersRef} className="preloader__brand">
          {brand.split("").map((ch, i) => (
            <span className="letter" key={i}>
              {ch}
            </span>
          ))}
        </div>
        <div className="preloader__meta">
          <span ref={countRef}>00</span>
          <span className="preloader__meta-label">loading builder</span>
        </div>
      </div>
    </div>
  );
}
