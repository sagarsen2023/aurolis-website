import PrivacyModule from "@/modules/privacy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyModule,
});
