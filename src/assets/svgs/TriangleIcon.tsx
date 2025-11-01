export default function TriangleIcon({ className }: { className?: string }) {
  return (
    <svg 
      width="30" 
      height="30" 
      viewBox="0 0 100 100" 
      className={className}
    >
      <polygon 
        points="0,0 100,0 100,100" 
        className="fill-background"
      />
    </svg>
  );
}