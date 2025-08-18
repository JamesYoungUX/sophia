import { createFileRoute } from "@tanstack/react-router";

const engagementTodos = [
  "Design conversational outreach and engagement flows",
  "Integrate with SMS, app, email, and phone channels",
  "Implement patient education and nudge logic",
  "Support accessibility and language preferences",
  "Enable feedback collection and learning loops",
  "Coordinate with other agents for escalation and support",
];

const buildInstructions = [
  "Scaffold Patient Engagement Agent backend: manage communication channels, message templates, and patient preferences.",
  "Integrate with SMS, app, email, and phone APIs.",
  "Build frontend UI for patient conversations, education, and feedback.",
  "Implement learning and personalization logic.",
  "Test with diverse patient scenarios and iterate with clinicians and patients.",
];

export const Route = createFileRoute("/agents/patient-engagement-agent")({
  component: () => (
    <div className="flex flex-1 flex-col gap-4 p-4 2xl:p-8 3xl:p-12 4xl:p-16 w-full">
      <h1 className="text-3xl font-bold mb-4">Patient Engagement Agent</h1>
      <div className="mb-4 text-base text-primary">
        <strong>Sophia’s Origin and Persona</strong>
        <br />
        The Patient Engagement Agent is more than just a digital assistant—it’s
        where Sophia’s name, personality, and compassionate presence come to
        life. Through every message, reminder, and conversation, Sophia builds
        trust, offers guidance, and ensures every patient feels seen, heard, and
        supported. This agent is the heart of Sophia’s mission: to make
        healthcare personal, proactive, and empowering for all.
      </div>
      <div className="mb-4 text-base text-muted-foreground">
        <strong>What is the Patient Engagement Agent, technically?</strong>
        <br />
        The Patient Engagement Agent is Sophia’s digital companion for every
        patient. It orchestrates friendly, accessible, and proactive
        communication across SMS, app, email, and phone. This agent collects
        patient-reported outcomes, delivers education and reminders, provides
        helpful guidance, and ensures every patient feels heard and supported.
        It adapts to language, accessibility, and cultural needs, and
        coordinates with other agents to escalate urgent issues or deliver
        personalized interventions. The agent continuously learns from patient
        feedback and outcomes to improve engagement and care.
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Patient Engagement Agent Responsibilities
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Conversational outreach: SMS, app, email, phone</li>
          <li>Patient education and reminders</li>
          <li>Collecting patient-reported outcomes and barriers</li>
          <li>Personalized nudges and motivational support</li>
          <li>Accessibility: language, disability, cultural adaptation</li>
          <li>Escalation of urgent responses to care team</li>
          <li>Feedback collection and continuous learning</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">
          Patient Engagement Agent Opportunities
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Learning:</strong> Adapts communication style and content
            based on patient preferences and outcomes.
          </li>
          <li>
            <strong>Outreach:</strong> Proactively checks in with patients,
            reminds them of appointments, medications, and care plan steps.
          </li>
          <li>
            <strong>Friendly, Helpful Guidance:</strong> Explains clinical
            concepts in plain language, offers encouragement, and helps patients
            navigate their care journey.
          </li>
          <li>
            <strong>Accessibility:</strong> Supports multiple languages, reading
            levels, and communication formats (text, audio, visual).
          </li>
          <li>
            <strong>Collaboration:</strong> Works with other agents to escalate
            issues, suggest interventions, and close the loop with the care
            team.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">
          Patient Engagement Agent TODOs
        </h2>
        <ul className="list-disc list-inside mb-4">
          {engagementTodos.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">
          How to Build the Patient Engagement Agent
        </h2>
        <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">
          {buildInstructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  ),
});
