import React from "react";

export function SurgicalTrackingChart() {
  const columns = [
    'Week 4 Preop',
    'Week 3 Preop',
    'Week 2 Preop',
    'Week 1 Preop',
    'Surgery Week',
    'Week 1 Postop',
    'Week 2 Postop',
    'Week 3 Postop',
    'Week 4 Postop',
  ];

  type Cell = { pct: number; count: number } | null;
  const rows: Array<{ label: string; patients: number; cells: Cell[] }> = [
    {
      label: 'Week 4 Preop Start',
      patients: 245,
      cells: [
        { pct: 92.0, count: 225 },
        { pct: 89.0, count: 218 },
        { pct: 87.0, count: 205 },
        { pct: 85.0, count: 203 },
        { pct: 81.0, count: 203 },
        { pct: 81.0, count: 198 },
        { pct: 79.0, count: 194 },
        { pct: 77.0, count: 189 },
        { pct: 75.0, count: 184 },
      ],
    },
    {
      label: 'Week 3 Preop Start',
      patients: 208,
      cells: [
        null,
        { pct: 88.0, count: 205 },
        { pct: 86.0, count: 203 },
        { pct: 84.0, count: 195 },
        { pct: 82.0, count: 185 },
        { pct: 80.0, count: 151 },
        { pct: 78.0, count: 147 },
        { pct: 76.0, count: 145 },
        { pct: 74.0, count: 140 },
      ],
    },
    {
      label: 'Week 2 Preop Start',
      patients: 156,
      cells: [
        null,
        null,
        { pct: 86.0, count: 163 },
        { pct: 85.0, count: 133 },
        { pct: 83.0, count: 129 },
        { pct: 79.0, count: 120 },
        { pct: 77.0, count: 115 },
        { pct: 75.0, count: 114 },
        { pct: 73.0, count: 114 },
      ],
    },
    {
      label: 'Week 1 Preop Start',
      patients: 134,
      cells: [
        null,
        null,
        null,
        { pct: 82.0, count: 110 },
        { pct: 80.0, count: 105 },
        { pct: 78.0, count: 103 },
        { pct: 76.0, count: 100 },
        { pct: 74.0, count: 99 },
        { pct: 72.0, count: 96 },
      ],
    },
    {
      label: 'Surgery Week Start',
      patients: 98,
      cells: [
        null,
        null,
        null,
        null,
        { pct: 90.0, count: 88 },
        { pct: 88.0, count: 86 },
        { pct: 86.0, count: 84 },
        { pct: 84.0, count: 82 },
        { pct: 82.0, count: 80 },
      ],
    },
    {
      label: 'Week 1 Postop Start',
      patients: 87,
      cells: [
        null,
        null,
        null,
        null,
        null,
        { pct: 92.0, count: 80 },
        { pct: 89.0, count: 77 },
        { pct: 86.0, count: 75 },
        { pct: 83.0, count: 72 },
      ],
    },
    {
      label: 'Week 2 Postop Start',
      patients: 76,
      cells: [
        null,
        null,
        null,
        null,
        null,
        null,
        { pct: 94.0, count: 71 },
        { pct: 91.0, count: 69 },
        { pct: 88.0, count: 67 },
      ],
    },
    {
      label: 'Week 3 Postop Start',
      patients: 62,
      cells: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { pct: 96.0, count: 62 },
        { pct: 93.0, count: 60 },
      ],
    },
  ];

  // Color thresholds per spec:
  // >= 85: dark blue, 80-84.99: medium blue, 78-79.99: light pink, <=77.99: dark pink
  const bgForPct = (pct: number) => {
    if (pct >= 85) return "#1d4ed8"; // dark blue
    if (pct >= 80) return "#3b82f6"; // medium blue
    if (pct >= 78) return "#fbcfe8"; // light pink
    return "#db2777"; // dark pink
  };

  const textColorForPct = (pct: number) => {
    if (pct >= 85) return "#ffffff"; // dark blue -> white text
    if (pct >= 80) return "#ffffff"; // medium blue -> white text
    if (pct >= 78) return "#831843"; // light pink -> deep rose text
    return "#ffffff"; // dark pink -> white text
  };

  return (
    <div className="rounded-xl bg-card p-6 shadow h-full">
      <h3 className="font-semibold text-muted-foreground mb-2">Surgical Preparation & Recovery Tracking</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Track patient engagement and task completion through surgical journey. Each row shows a cohort starting at different points.
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          <div className="grid grid-cols-[240px_repeat(9,minmax(0,1fr))] gap-2">
            {/* Header */}
            <div className="text-xs text-muted-foreground px-2 py-2">Surgical Phase</div>
            {columns.map((col) => (
              <div key={col} className="text-xs text-center text-muted-foreground px-2 py-2">
                {col}
              </div>
            ))}

            {/* Rows */}
            {rows.map((row) => (
              <React.Fragment key={row.label}>
                <div key={`${row.label}-label`} className="px-3 py-3 rounded-md bg-muted/30">
                  <div className="text-sm font-medium text-foreground">{row.label}</div>
                  <div className="text-xs text-muted-foreground">{row.patients} patients</div>
                </div>
                {columns.map((_, i) => {
                  const cell = row.cells[i] ?? null;
                  if (!cell) {
                    return (
                      <div key={`${row.label}-${columns[i]}`} className="rounded-md bg-muted/20 border border-dashed border-muted h-14" />
                    );
                  }
                  return (
                    <div
                      key={`${row.label}-${columns[i]}`}
                      className="rounded-md h-14 flex flex-col items-center justify-center"
                      style={{ background: bgForPct(cell.pct), color: textColorForPct(cell.pct) }}
                    >
                      <div className="text-sm font-semibold">{cell.pct.toFixed(1)}%</div>
                      <div className="text-[11px] leading-3 opacity-90">{cell.count}</div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
