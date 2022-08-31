export function toDisplay(value: number) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
  });
}
