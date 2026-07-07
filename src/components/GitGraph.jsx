// A small decorative "commit graph" divider — a nod to git internals.
// Each dot is a commit; the branch/merge shape is purely decorative.
export default function GitGraph({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 12 H140" stroke="#262b31" strokeWidth="2" />
      <path d="M140 12 C 170 12, 170 4, 200 4" stroke="#262b31" strokeWidth="2" />
      <path d="M140 12 C 170 12, 170 20, 200 20" stroke="#262b31" strokeWidth="2" />
      <path d="M200 4 H 260" stroke="#262b31" strokeWidth="2" />
      <path d="M200 20 H 260" stroke="#262b31" strokeWidth="2" />
      <path d="M260 4 C 290 4, 290 12, 320 12" stroke="#262b31" strokeWidth="2" />
      <path d="M260 20 C 290 20, 290 12, 320 12" stroke="#262b31" strokeWidth="2" />
      <path d="M320 12 H400" stroke="#262b31" strokeWidth="2" />
      {[0, 140, 200, 260, 320, 400].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={12}
          r="4"
          fill={i === 2 || i === 3 ? "#e8a33d" : "#8b93a1"}
        />
      ))}
    </svg>
  );
}
