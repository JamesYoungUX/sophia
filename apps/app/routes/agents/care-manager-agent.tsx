import { createFileRoute } from "@tanstack/react-router";

const careManagerTodos = [
  "Design Care Manager Agent workflow engine",
  "Integrate with Genesis, Quantum, and patient communication systems",
  "Implement approval and intervention logic",
  "Build patient and care team communication features",
  "Enable monitoring, escalation, and audit logging",
  "Support feedback and continuous learning",
];

const buildInstructions = [
  "Ingest care plan changes, intervention suggestions, and patient data from other agents and EHR.",
  "Implement approval workflows for plan changes and interventions.",
  "Build communication modules for patient reminders, education, and care team updates.",
  "Monitor patient progress and escalate urgent issues to human care managers or clinicians.",
  "Log all actions, approvals, and communications for compliance and quality improvement.",
  "Collect feedback and outcomes to improve care management over time.",
];

export const Route = createFileRoute("/agents/care-manager-agent")({
  component: () => (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 2xl:p-8 3xl:p-12 4xl:p-16 w-full">
        <h1 className="text-3xl font-bold mb-4">Care Manager Agent</h1>
        <div className="mb-4 text-base text-muted-foreground">
          <strong>What is Care Manager Agent, technically?</strong>
          <br />
          The Care Manager Agent is a digital workflow engine that orchestrates
          approvals, interventions, patient communication, and care
          coordination. It serves as the "human-in-the-loop" for plan changes
          and interventions suggested by other agents (like Genesis and
          Quantum), ensuring all actions are reviewed, compliant, and
          communicated to the right people. The agent continuously monitors
          patient progress, escalates urgent issues, logs all actions for audit,
          and learns from feedback to improve care management.
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Care Manager Agent Responsibilities
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              Approvals: Review and approve care plan changes, medication
              adjustments, and interventions.
            </li>
            <li>
              Interventions: Trigger and coordinate interventions when patients
              miss steps or risk is detected.
            </li>
            <li>
              Patient Communication: Send reminders, education, and personalized
              messages to patients.
            </li>
            <li>
              Care Coordination: Keep all care team members informed and
              schedule follow-ups, labs, or referrals.
            </li>
            <li>
              Monitoring & Escalation: Monitor patient data and escalate urgent
              issues to human staff.
            </li>
            <li>
              Documentation & Audit: Log all actions, approvals, and
              communications for compliance.
            </li>
            <li>
              Feedback & Learning: Collect feedback and outcomes to improve
              future care management.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            Care Manager Agent TODOs
          </h2>
          <ul className="list-disc list-inside mb-4">
            {careManagerTodos.map((todo) => (
              <li key={todo}>{todo}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            How to Build the Care Manager Agent
          </h2>
          <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">
            {buildInstructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">
            Sample Workflow: Proactive Risk Detection & Multi-Agent
            Orchestration
          </h2>
          <div className="mb-4 text-muted-foreground">
            <strong>Scenario:</strong> Sophia’s AI agents work in parallel to
            ensure a patient is fully prepared for surgery, uncovering and
            resolving hidden risks before they become problems.
          </div>
          <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-1">
            <li>
              <strong>Proactive Risk Scan:</strong> One week before surgery,
              Sophia’s Compliance Bot automatically reviews all pre-surgical
              requirements for every patient. It flags not only missing labs and
              medication issues, but also checks for social determinants of
              health—like transportation and home support.
            </li>
            <li>
              <strong>Parallel Outreach:</strong> The Patient Interface Bot
              reaches out to the patient via SMS, app notification, and
              automated phone call, asking: “Do you have transportation arranged
              for your surgery on Monday?” and “Will you have someone to help
              you at home after surgery?”
            </li>
            <li>
              <strong>Real-Time Understanding:</strong> The patient replies via
              SMS: “No, I don’t have a ride.” The Patient Interface Bot uses
              natural language understanding to interpret this as a risk and
              immediately updates the patient’s profile.
            </li>
            <li>
              <strong>Automated Escalation & Multi-Agent Suggestions:</strong>{" "}
              The Compliance Bot is instantly notified and, seeing the risk,
              queries the Quantum Agent for analytics on similar past cases
              (e.g., "What solutions have worked for patients lacking
              transportation?") and the Genesis Agent for evidence-based best
              practices (e.g., "What interventions are recommended in the
              literature?").
            </li>
            <li>
              <strong>Data-Driven Recommendations:</strong> Quantum Agent
              responds: “Hospital transport arranged in 70% of similar cases,
              rideshare vouchers in 20%, volunteer services in 10%. Success
              rate: 95% when intervention is proactive.” Genesis Agent adds:
              “Best practice: offer multiple options and confirm with patient 48
              hours before surgery.”
            </li>
            <li>
              <strong>Case Manager Orchestration:</strong> The Compliance Bot
              presents these actionable suggestions to the Case Manager Agent,
              who reviews Sophia’s recommendations (e.g., arrange hospital
              transport, offer rideshare voucher, connect with social worker),
              and can approve, modify, or add new actions.
            </li>
            <li>
              <strong>Coordinated Action:</strong> The Case Manager contacts the
              patient, arranges transportation through the most appropriate
              channel, and schedules a post-discharge check-in. All actions are
              logged and visible to the care team in real time.
            </li>
            <li>
              <strong>Continuous Learning:</strong> After surgery, Sophia tracks
              outcomes. The system learns that proactive, multi-agent
              orchestration and data-driven suggestions reduced last-minute
              cancellations by 30% and improved patient satisfaction scores.
            </li>
            <li>
              <strong>Wow Moment:</strong> Sophia’s AI agents didn’t just
              react—they anticipated, collaborated, and empowered the human care
              team with evidence-based, data-driven options. A problem that
              would have been missed was resolved days in advance, with every
              step tracked and auditable.
            </li>
          </ol>
        </div>
      </div>
    </>
  ),
});
