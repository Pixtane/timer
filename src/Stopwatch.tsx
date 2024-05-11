import { useSelector } from "react-redux";

export default function Stopwatch() {
  const { timer } = useSelector((state: any) => state.timer) || 0;

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  return (
    <div>
      <p className="p-5 flex w-full justify-center text-9xl font-semibold font-mono">
        {hours.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
    </div>
  );
}
