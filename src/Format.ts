import Decimal from "break_infinity.js";

const suffixes = ["k", "M", "B", "T", "qd", "Qn", "sx", "Sp", "O", "N", "de", "Ud", "DD", "tdD", "qdD", "QnD", "sxD", "SpD", "OcD", "NvD", "Vgn", "UVg", "DVg", "TVg", "qtV", "QnV", "SeV", "SPG", "OVG", "NVG", "TGN", "UTG", "DTG", "tsTG", "qtTG", "QnTG", "ssTG", "SpTG", "OcTG", "NoTG", "QdDR", "uQDR", "dQDR", "tQDR", "qdQDR", "QnQDR", "sxQDR", "SpQDR", "OQDDr", "NQDDr", "qQGNT", "uQGNT", "dQGNT", "tQGNT", "qdQGNT", "QnQGNT", "sxQGNT", "SpQGNT", "OQQGNT", "NQQGNT", "SXGNTL"]

export function Format(value: Decimal, decimals?: number): string {
  const tier = Math.floor(Math.floor(value.log10()) / 3);
  if (tier - 1 < 0) {
    return value.toFixed(decimals || 0);
  }

  const suffix = suffixes[tier - 1] ?? `e${tier * 3}`;
  const scaled = value.div(Decimal.pow(10, tier * 3));

  return `${scaled.toFixed(2).replace(/\.?0+$/, "")}${suffix}`;
}