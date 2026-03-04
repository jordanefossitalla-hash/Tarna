import { Button } from "@/src/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/components/ui/empty";
import { Pickaxe } from "lucide-react";
import Link from "next/link";

export function InBuild() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Pickaxe />
        </EmptyMedia>
        <EmptyTitle>Interface en cours de developpement</EmptyTitle>
        <EmptyDescription>
          Cette interface est actuellement en cours de développement. Revenez
          plus tard pour découvrir les nouvelles fonctionnalités.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button asChild>
          <Link href="/home">Retournez à la page principale</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
