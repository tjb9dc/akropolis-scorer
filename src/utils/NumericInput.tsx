export const NumericInput = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <input
      inputMode="numeric"
      type="text"
      pattern="[0-9]*"
      maxLength={2}
      value={value}
      onChange={(e) => {
        const value = e.target.value.replace(/^0+/, "");
        onChange(parseInt(value) || 0);
      }}
      className={className}
    />
  );
};
