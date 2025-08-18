import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui";

export const Route = createFileRoute("/docs/care-plan-lifecycle")({
  beforeLoad: async () => {
    const session = await auth.getSession();
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: CarePlanLifecyclePage,
});

function CarePlanLifecyclePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  Platform
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Care Plan Lifecycle</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center space-x-4">
            <NavUser />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 2xl:p-8 3xl:p-12 4xl:p-16 w-full">
      <h1 className="text-3xl font-bold mb-4">
        Care Plan Lifecycle & Agent Roles
      </h1>
      <div className="mb-4 text-base text-muted-foreground">
        This page provides a conceptual overview of how care plans are created,
        modified, and managed within Sophia, and how each AI agent contributes
        to the lifecycle. This is a living document for design and
        collaboration.
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Care Plan Lifecycle Stages
        </h2>
        <ol className="list-decimal list-inside mb-4">
          <li>
            <strong>Creation:</strong> Genesis Agent suggests evidence-based
            templates; Care Manager Agent reviews and customizes; Patient
            Engagement Agent introduces the plan to the patient.
          </li>
          <li>
            <strong>Activation:</strong> Patient Engagement Agent guides the
            patient through onboarding; Compliance Agent ensures all
            prerequisites are met.
          </li>
          <li>
            <strong>Monitoring:</strong> Compliance Agent tracks adherence;
            Quantum Agent analyzes progress and outcomes; Patient Engagement
            Agent checks in with the patient.
          </li>
          <li>
            <strong>Modification:</strong> Genesis Agent proposes updates based
            on new evidence; Compliance and Quantum Agents flag issues or
            opportunities; Care Manager Agent reviews and approves changes.
          </li>
          <li>
            <strong>Escalation & Support:</strong> Compliance Agent detects
            risks; Patient Engagement Agent collects patient-reported barriers;
            Care Manager Agent coordinates interventions.
          </li>
          <li>
            <strong>Completion & Learning:</strong> Quantum Agent measures
            outcomes; Genesis Agent incorporates learnings into future
            templates; Patient Engagement Agent gathers feedback.
          </li>
        </ol>
        <h2 className="text-xl font-semibold mb-2">Agent Roles at a Glance</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Genesis Agent:</strong> Evidence-based plan design, updates,
            and learning
          </li>
          <li>
            <strong>Compliance Agent:</strong> Adherence monitoring, risk
            detection, escalation
          </li>
          <li>
            <strong>Quantum Agent:</strong> Analytics, outcome measurement,
            continuous improvement
          </li>
          <li>
            <strong>Care Manager Agent:</strong> Human-in-the-loop review,
            approval, and coordination
          </li>
          <li>
            <strong>Patient Engagement Agent:</strong> Communication, education,
            feedback, and support
          </li>
        </ul>
      </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
