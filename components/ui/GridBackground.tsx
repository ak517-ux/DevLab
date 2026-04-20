export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid.svg')] bg-[size:32px_32px]" />
    </div>
  );
}
