import { createFileRoute } from "@tanstack/react-router";

const currentPlans = [
  {
    name: "Hypertension Management",
    status: "Active",
    lastUpdated: "2024-06-10",
  },
  {
    name: "Diabetes Monitoring",
    status: "Active",
    lastUpdated: "2024-05-28",
  },
];

const suggestedUpdates = [
  {
    plan: "Hypertension Management",
    suggestion:
      "Update BP target to <130/80 mmHg based on 2024 AHA guidelines.",
    evidence: {
      title: "2024 AHA Hypertension Guidelines",
      url: "https://www.ahajournals.org/doi/10.1161/HYP.0000000000000200",
    },
    status: "pending",
  },
];

const learningFeed = [
  {
    source: "AHA Journal",
    title: "2024 Hypertension Guidelines",
    url: "https://www.ahajournals.org/doi/10.1161/HYP.0000000000000200",
    date: "2024-06-01",
  },
  {
    source: "NEJM",
    title: "SGLT2 Inhibitors in Diabetes Care",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMra1811737",
    date: "2024-05-20",
  },
];

const auditLog = [
  {
    action: "Suggestion created",
    plan: "Hypertension Management",
    by: "Genesis Agent",
    date: "2024-06-10",
    details: "Suggested BP target update based on new guidelines.",
  },
  {
    action: "Suggestion reviewed",
    plan: "Hypertension Management",
    by: "Dr. Smith",
    date: "2024-06-11",
    details: "Accepted BP target update.",
  },
];

export const Route = createFileRoute("/genesis-agent")({
  component: () => (
    <div className="flex flex-1 flex-col gap-4 p-4 2xl:p-8 3xl:p-12 4xl:p-16 w-full">
      <h1 className="text-3xl font-bold mb-4">Genesis Agent</h1>
      <p className="mb-6 text-muted-foreground">
        <strong>Genesis Agent</strong> assists clinicians by suggesting
        evidence-based care plan updates, learning from new guidelines and
        research, and always requiring human review before any plan is changed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Plans</h2>
          <ul className="space-y-2 mb-6">
            {currentPlans.map((plan) => (
              <li
                key={plan.name}
                className="border rounded p-3 bg-card flex justify-between items-center"
              >
                <span>
                  <span className="font-medium">{plan.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({plan.status})
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Last updated: {plan.lastUpdated}
                </span>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Suggested Updates</h2>
          <ul className="space-y-2 mb-6">
            {suggestedUpdates.map((s, i) => (
              <li key={i} className="border rounded p-3 bg-card">
                <div className="font-medium mb-1">{s.plan}</div>
                <div className="mb-1">{s.suggestion}</div>
                <div className="text-xs mb-2">
                  Evidence:{" "}
                  <a
                    href={s.evidence.url}
                    className="underline text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.evidence.title}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
                    Accept
                  </button>
                  <button className="px-3 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold">
                    Reject
                  </button>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Status: {s.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Learning Feed</h2>
          <ul className="space-y-2 mb-6">
            {learningFeed.map((item, i) => (
              <li key={i} className="border rounded p-3 bg-card">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground mb-1">
                  {item.source} &middot; {item.date}
                </div>
                <a
                  href={item.url}
                  className="underline text-blue-600 text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source
                </a>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Audit Log</h2>
          <ul className="space-y-2">
            {auditLog.map((log, i) => (
              <li key={i} className="border rounded p-3 bg-card">
                <div className="font-medium mb-1">
                  {log.action} - {log.plan}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {log.date} by {log.by}
                </div>
                <div className="text-xs">{log.details}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-2">
          Example Suggestion &amp; Flow
        </h2>
        <div className="mb-4">
          <div className="font-semibold mb-2">Example: BP Target Update</div>
          <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-1">
            <li>Genesis Agent ingests new AHA hypertension guidelines.</li>
            <li>
              Detects that BP target in "Hypertension Management" plan is
              outdated.
            </li>
            <li>Suggests update to &lt;130/80 mmHg, citing the guideline.</li>
            <li>Clinician reviews and accepts the suggestion.</li>
            <li>Plan is updated and audit log is recorded.</li>
          </ol>
          <h3 className="font-semibold mb-2">Genesis Agent Flow</h3>
          <div className="max-w-xl">
            {/* Genesis Agent flow diagram */}
            <div className="bg-white border rounded p-2 overflow-x-auto">
              <pre style={{ margin: 0 }}>
                {`flowchart TD
    A["Genesis Agent observes new evidence or guideline"] --> B{"Is the evidence relevant to an existing plan?"}
    B -- "Yes" --> C["Suggest update to plan"]
    B -- "No" --> D["Suggest new plan"]
    C --> E["Show suggestion to clinician for review"]
    D --> E
    E -- "Accept" --> F["Plan is updated/created (by human)"]
    E -- "Reject" --> G["No change"]
    F --> H["Audit log: who/when/why"]
    G --> H
    E --> I["Genesis learns from feedback"]
`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});
