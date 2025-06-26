export default function WavyLine() {
  return (
    <svg
      viewBox="0 0 500 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-wiggle h-10 w-full"
    >
      <path
        d="M0 50 Q 50 80, 100 50 T 200 50 T 300 50 T 400 50 T 500 50"
        stroke="#F4A261"
        strokeWidth="3"
        fill="transparent"
      />
    </svg>
  );
}
