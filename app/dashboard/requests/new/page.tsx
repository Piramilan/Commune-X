import { NewRequestForm } from "@/components/new-request-form";

export default function NewRequestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Service Request</h1>
      <NewRequestForm />
    </div>
  );
}
