export function Logo({ width = 160 }: { width?: number }) {
  return (
    <img
      src="/assets/brand/devlab-logo-dark.png"
      alt="DevLab"
      width={width}
      height="auto"
      className="block"
    />
  );
}
