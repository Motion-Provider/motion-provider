import { CalculateDelayProps } from "../types";

/**
 * Internal state used for delay calculations.
 * @private
 * @property {number[]} fibonacci - Stores Fibonacci sequence values.
 * @property {number} chaosValue - Current value for chaotic delay calculations.
 * @property {number} accumulatedDelay - Accumulated delay for cumulative logic.
 */
const state = {
  fibonacci: [0, 1],
  chaosValue: 0.5,
  accumulatedDelay: 0,
};

/**
 * Calculates the delay based on the provided delay logic.
 *
 * The function supports various delay calculation logics:
 * - **linear**: Delay increases linearly with the index.
 * - **exponential**: Delay increases exponentially (2^index).
 * - **sinusoidal**: Delay is determined using the sine of the index.
 * - **cosine**: Delay is determined using the cosine of the index.
 * - **square**: Alternates delay based on whether the index is even or odd.
 * - **triangle**: Delay follows a triangle wave pattern with a period of 4.
 * - **sawtooth**: Delay follows a sawtooth wave pattern with a period of 4.
 * - **fibonacci**: Delay follows the Fibonacci sequence.
 * - **pendulum**: Delay is based on a damped sine function to mimic pendulum motion.
 * - **perlin**: Delay is calculated using a simple pseudo-random noise function.
 * - **chaotic**: Delay is calculated using a chaotic (logistic) map.
 * - **cumulative**: Delay accumulates over time based on a sine function.
 * - **bounce**: Delay simulates a bouncing effect using gravity.
 * - **spiral**: Delay is calculated based on a spiral function using cosine and sine.
 * - **quantum**: Delay is derived from a combination of sine and cosine to mimic probability.
 * - **custom**: Uses a custom delay logic provided via a callback function.
 *
 * @param {calculateDelayProps} props - The properties for calculating delay.
 * @param {number} props.baseDuration - The base duration multiplier for delay calculation.
 * @param {number} props.index - The current index used to calculate the delay.
 * @param {string} props.delayLogic - The delay logic to apply. One of: "linear", "exponential", "sinusoidal", "cosine", "square", "triangle", "sawtooth", "fibonacci", "pendulum", "perlin", "chaotic", "cumulative", "bounce", "spiral", "quantum", or "custom".
 * @param {(index: number) => number} [props.customLogic] - A custom function to calculate the delay when `delayLogic` is "custom".
 * @returns {number} The calculated delay value.
 */
export const calculateDelay = ({
  baseDuration,
  index,
  delayLogic,
  customLogic,
}: CalculateDelayProps): number => {
  switch (delayLogic) {
    case "linear":
      return index * baseDuration;
    case "exponential":
      return Math.pow(2, index) * baseDuration;
    case "sinusoidal":
      return Math.sin(index) * baseDuration;
    case "cosine":
      return Math.cos(index) * baseDuration;
    case "square":
      return (index % 2) * baseDuration;
    case "triangle": {
      const period = 4;
      const position = index % period;
      return (
        (position < period / 2 ? position : period - position) * baseDuration
      );
    }
    case "sawtooth": {
      const period = 4;
      return (index % period) * baseDuration;
    }
    case "fibonacci": {
      while (state.fibonacci.length <= index + 1) {
        state.fibonacci.push(
          state.fibonacci[state.fibonacci.length - 1] +
            state.fibonacci[state.fibonacci.length - 2]
        );
      }
      return state.fibonacci[index] * baseDuration;
    }
    case "pendulum": {
      const damping = 0.1;
      const frequency = 2;
      return (
        Math.exp(-damping * index) * Math.sin(frequency * index) * baseDuration
      );
    }
    case "perlin": {
      const noise = (n: number) => {
        n = (n << 13) ^ n;
        return (
          1 -
          ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) /
            1073741824
        );
      };
      return noise(index) * baseDuration;
    }
    case "chaotic": {
      const r = 3.99;
      state.chaosValue = r * state.chaosValue * (1 - state.chaosValue);
      return state.chaosValue * baseDuration * 10;
    }
    case "cumulative": {
      state.accumulatedDelay += (Math.sin(index) + 1) * baseDuration;
      return state.accumulatedDelay;
    }
    case "bounce": {
      const gravity = 0.8;
      const bounceHeight = Math.pow(gravity, index % 5) * baseDuration;
      return bounceHeight;
    }
    case "spiral": {
      const angle = index * 0.5;
      const spiralOffset = Math.sqrt(index) * baseDuration;
      return (Math.cos(angle) + Math.sin(angle)) * spiralOffset;
    }
    case "quantum": {
      const probability = Math.abs(Math.sin(index) * Math.cos(index * 0.5));
      return probability * baseDuration * 2;
    }
    case "custom":
      return customLogic ? customLogic(index) : index * baseDuration;
    default:
      return index * baseDuration;
  }
};
