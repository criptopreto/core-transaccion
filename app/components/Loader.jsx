import { useEffect, useRef, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Loader({ className }) {
  const [lottie, setLottie] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/assets/animations/loader.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);
  return (
    <div className="z-30 w-full">
      <div className="relative w-full">
        <div
          className={classNames(
            className,
            "absolute bg-gradient-to-tr top-96 mx-auto from-indigo-300 to-violet-200 rounded-lg shadow-lg p-2 z-50 inset-0 w-28 h-32"
          )}
        >
          <div className="w-24 h-24">
            <div ref={ref} />
          </div>

          <p className="text-sm italic text-indigo-900 text-center">
            Cargando...
          </p>
        </div>
      </div>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity z-40" />
    </div>
  );
}
