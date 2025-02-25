import { useRef, useState, forwardRef, useImperativeHandle } from "react";

type SliderProps = {
  defaultValue?: number;
  step?: number;
  minValue?: number;
  maxValue?: number;
};

export interface SliderRef {
  getValue: () => number;
}

const Slider = forwardRef<SliderRef, SliderProps>(
  (
    { defaultValue = 5, step = 1, minValue = 1, maxValue = 10 }: SliderProps,
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    //   const [isDragging, setDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const valueRef = useRef(value);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return valueRef.current;
      },
    }));

    // allow to move with scroll

    const handleMouseDown = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const slider = sliderRef.current;
      if (!slider) return;

      const handleMouseMove = (event: { clientX: number }) => {
        const rect = slider.getBoundingClientRect();
        let newValue =
          ((event.clientX - rect.left) / rect.width) * (maxValue - minValue) +
          minValue;
        newValue = Math.round(newValue / step) * step; // Apply step
        newValue = Math.min(maxValue, Math.max(minValue, newValue)); // Clamp value
        setValue(newValue);
        valueRef.current = newValue;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    return (
      // container
      <div className="w-full max-w-lg mx-auto p-6">
        <div
          className="relative w-full h-2 bg-gray-300 rounded-full"
          ref={sliderRef}
        >
          {/* Slider Track */}
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{
              width: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
            }}
          ></div>

          {/* Knob */}
          <div
            className="absolute w-6 h-6 bg-blue-600 rounded-full cursor-pointer -top-2 transform -translate-x-1/2"
            style={{
              left: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
            }}
            onMouseDown={handleMouseDown}
          >
            <p className="mt-5">{value.toFixed(1)}</p>
          </div>
          <p className="absolute mt-1 left-0">{minValue.toFixed(1)}</p>
          <p className="absolute mt-1 right-0">{maxValue.toFixed(1)}</p>
        </div>

        {/* Display Value
        <p className="text-center mt-4 text-lg font-semibold">
          Value: {value.toFixed(1)}
        </p> */}
      </div>
    );
  }
);

export default Slider;
