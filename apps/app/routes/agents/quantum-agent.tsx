import { createFileRoute } from "@tanstack/react-router";

const quantumTodos = [
  "Design Quantum Agent analytics and outcome tracking core",
  "Integrate with EHR and cost/outcome data sources",
  "Implement missed step/intervention detection logic",
  "Build dashboards for value-based care and cost validation",
  "Enable feedback and learning loops for continuous improvement",
];

const buildInstructions = [
  "Ingest clinical, operational, and cost data from EHR and other sources.",
  "Track patient progress through care pathways and interventions.",
  "Detect when critical steps are missed or when patients do not recover as expected (e.g., due to not changing medications).",
  "Analyze the impact of missed steps on outcomes and costs, and flag avoidable operations or complications.",
  "Provide analytics dashboards for clinicians and administrators to measure value, outcomes, and cost-effectiveness.",
  "Continuously learn from new data and feedback to improve recommendations and reduce unnecessary care.",
];

export const Route = createFileRoute("/agents/quantum-agent")({
  component: () => (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 2xl:p-8 3xl:p-12 4xl:p-16 w-full">
        <h1 className="text-3xl font-bold mb-4">Quantum Agent</h1>
        <div className="mb-4 text-base text-muted-foreground">
          <strong>What is Quantum Agent, technically?</strong>
          <br />
          Quantum Agent is an advanced analytics and decision-support system for
          care settings. It ingests clinical, operational, and cost data to
          drive learning analytics, validate cost mechanisms, and measure
          patient outcomes. Quantum Agent is designed to identify when critical
          steps in care pathways are missed, or when patients do not recover as
          expected (for example, due to not changing medications). By detecting
          these gaps, it helps reduce unnecessary operations, avoidable
          complications, and costs. The agent continuously learns from new data
          and feedback, supporting value-based care and continuous improvement.
          Quantum Agent is not a single model, but a system that can leverage
          multiple models and data sources to optimize care delivery and
          outcomes.
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Quantum Agent TODOs</h2>
          <ul className="list-disc list-inside mb-4">
            {quantumTodos.map((todo) => (
              <li key={todo}>{todo}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            How to Build the Quantum Agent
          </h2>
          <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">
            {buildInstructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-2">
            Demo: Warfarin Medication Change & Learning Loop
          </h2>
          <div className="mb-4">
            <div className="font-semibold mb-2">
              Quantum Agent: Detecting Missed Warfarin Changes
            </div>
            <table className="w-full mb-4 text-sm border rounded bg-card">
              <thead>
                <tr className="bg-muted-foreground/10">
                  <th className="p-2 text-left">Patient</th>
                  <th className="p-2 text-left">Med Change Due</th>
                  <th className="p-2 text-left">Change Made?</th>
                  <th className="p-2 text-left">Notified?</th>
                  <th className="p-2 text-left">Outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Alice</td>
                  <td className="p-2">Jan 10</td>
                  <td className="p-2 text-red-700">No</td>
                  <td className="p-2 text-green-700">Yes (Jan 20)</td>
                  <td className="p-2">INR out of range, dose adjusted late</td>
                </tr>
                <tr>
                  <td className="p-2">Bob</td>
                  <td className="p-2">Feb 5</td>
                  <td className="p-2 text-red-700">No</td>
                  <td className="p-2 text-green-700">Yes (Feb 15)</td>
                  <td className="p-2">
                    Surgery proceeded as scheduled after notification
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Carol</td>
                  <td className="p-2">Mar 2</td>
                  <td className="p-2 text-green-700">Yes</td>
                  <td className="p-2 text-gray-500">N/A</td>
                  <td className="p-2">Stable INR</td>
                </tr>
              </tbody>
            </table>
            <div className="mb-4 text-muted-foreground">
              <strong>Quantum Agent</strong> detected that Alice and Bob did not
              make their warfarin medication change on time. It notified them
              and their care teams, resulting in improved outcomes for Bob.
              Analysis showed that earlier notification (3 days before the due
              date) would have prevented Alice's issue as well.
            </div>
            <div className="font-semibold mb-2">
              Genesis Agent: Plan Update Based on Learning
            </div>
            <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-1">
              <li>
                Quantum Agent analytics show that late notifications lead to
                missed med changes and worse outcomes.
              </li>
              <li>
                Genesis Agent updates the care plan: future patients are now
                notified 3 days earlier than before, with a new intervention
                step.
              </li>
              <li>Clinicians review and approve the updated plan.</li>
              <li>
                Outcomes improve as more patients make timely medication
                changes.
              </li>
            </ol>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 text-green-900 rounded mb-8">
              <strong>Collaboration:</strong> Quantum Agent drives analytics and
              intervention, while Genesis Agent adapts the care plan based on
              real-world learning and clinician review.
            </div>
            <h3 className="font-semibold mb-2">
              Quantum Agent Flow (Warfarin Scenario)
            </h3>
            <div className="max-w-3xl" style={{ minHeight: 500 }}>
              <img
                src="/quantum-agent-or-flow.svg"
                alt="Quantum Agent Warfarin Notification Flow Diagram"
                style={{ width: "100%", height: "500px", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
