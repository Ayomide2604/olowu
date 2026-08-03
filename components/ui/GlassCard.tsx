type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={`
bg-white/80
backdrop-blur-xl
border
border-white
rounded-3xl
shadow-sm
${className}
`}
    >
      {children}
    </div>
  );
}
