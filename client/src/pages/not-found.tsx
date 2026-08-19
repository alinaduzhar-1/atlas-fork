import { Layout } from "@/components/layouts";
import { Button, ErrorScenarios } from "@multiverse-io/stardust-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout width="narrow">
      <ErrorScenarios.FourOhFour
        supportUrl="https://www.google.com"
        linkComponent={Link}
      >
        <Button className="block md:hidden" size={"small"}>
          Go to home
        </Button>
        <Button className="hidden md:block" size={"default"}>
          Go to home
        </Button>
      </ErrorScenarios.FourOhFour>
    </Layout>
  );
}
