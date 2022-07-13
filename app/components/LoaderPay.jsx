import { useEffect, useRef, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LoaderPay({ className }) {
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
        path: "/assets/animations/loader_payment.json",
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
            "absolute top-80 mx-auto rounded-lg p-2 z-50 inset-0 w-32 h-32"
          )}
        >
          <div className="w-32 h-32">
            <div ref={ref} />
            <p className="text-center text-white">Pagando...</p>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity z-40" />
    </div>
  );
}
