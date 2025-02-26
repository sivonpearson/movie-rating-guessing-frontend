import { useRef, useState, forwardRef, useImperativeHandle } from "react";

type SliderProps = {
  defaultValue?: number;
  step?: number;
  minValue?: number;
  maxValue?: number;
  backgroundColor?: string;
  foregroundColor?: string;
};

export interface SliderRef {
  getValue: () => number;
}

const Slider = forwardRef<SliderRef, SliderProps>(
  (
    {
      defaultValue = 5,
      step = 1,
      minValue = 1,
      maxValue = 10,
      backgroundColor = "#d1d5dc",
      foregroundColor = "oklch(0.623 0.214 259.815)",
    }: SliderProps,
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
          className="relative w-full h-2 rounded-full"
          style={{ backgroundColor: backgroundColor }}
          ref={sliderRef}
        >
          {/* Slider Track */}
          <div
            className="absolute h-2 rounded-full"
            style={{
              width: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
              backgroundColor: foregroundColor,
            }}
          ></div>

          <p
            className="absolute mt-1 left-0"
            style={{ color: foregroundColor }}
          >
            {minValue.toFixed(1)}
          </p>
          <p
            className="absolute mt-1 right-0"
            style={{ color: foregroundColor }}
          >
            {maxValue.toFixed(1)}
          </p>

          {/* Knob */}
          <div
            className="absolute w-8 h-8 rounded-full cursor-pointer -top-3 transform -translate-x-1/2"
            style={{
              left: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
              backgroundColor: foregroundColor,
            }}
            onMouseDown={handleMouseDown}
          >
            <p
              className="text-center align-middle mt-0.5"
              style={{ color: backgroundColor }}
            >
              {value.toFixed(1)}
            </p>
          </div>
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
