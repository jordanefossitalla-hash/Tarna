"use client";

import GroupDisplay from "@/src/components/personnal/ui/groupDisplay";
import { groupsData } from "@/src/data/groups";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Globe,
  GlobeLock,
  Lock,
  Plus,
  Search,
  Users,
  Compass,
  Clock,
} from "lucide-react";
import { useMemo, useState } from "react";

type Tab = "my-groups" | "discover" | "pending";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "my-groups", label: "Mes groupes", icon: Users },
  { key: "discover", label: "Découvrir", icon: Compass },
  { key: "pending", label: "En attente", icon: Clock },
];

const GroupsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("my-groups");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = groupsData;

    // Filtre par onglet
    switch (activeTab) {
      case "my-groups":
        list = list.filter((g) => g.isMember);
        break;
      case "discover":
        list = list.filter((g) => !g.isMember && !g.isPending);
        break;
      case "pending":
        list = list.filter((g) => g.isPending);
        break;
    }

    // Filtre par recherche
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, search]);

  const pendingCount = groupsData.filter((g) => g.isPending).length;

  return (
    <div className="xl:w-2xl xl:max-w-2xl w-full pb-20 flex flex-col gap-4 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row w-full gap-3 justify-between pt-8">
        <div>
          <h1 className="text-2xl font-bold">Groupes</h1>
          <p className="text-sm text-muted-foreground">
            Rejoignez des communautés et connectez-vous avec vos collègues
          </p>
        </div>
        <div className="flex flex-col justify-end shrink-0">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="flex flex-row items-center gap-2 cursor-pointer">
                  <Plus className="size-4" />
                  Créer un groupe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm md:max-w-md">
                <DialogHeader>
                  <DialogTitle>Créer un groupe</DialogTitle>
                  <DialogDescription>
                    Configurez votre nouveau groupe et ajoutez des membres.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name-1">Nom du groupe</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder="Ex : Alpha projet, Dev Team"
                    />
                  </Field>
                  <Field>
                    <Label>Visibilité</Label>
                    <RadioGroup defaultValue="public" className="max-w-sm">
                      <FieldLabel htmlFor="public">
                        <Field orientation="horizontal">
                          <FieldContent className="flex flex-row items-center">
                            <RadioGroupItem value="public" id="public" />
                            <div>
                              <FieldTitle className="flex flex-row items-center gap-1">
                                <Globe className="size-3" /> Public
                              </FieldTitle>
                              <FieldDescription>
                                Tout le monde peut trouver et rejoindre ce
                                groupe.
                              </FieldDescription>
                            </div>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="private">
                        <Field orientation="horizontal">
                          <FieldContent className="flex flex-row items-center">
                            <RadioGroupItem value="private" id="private" />
                            <div>
                              <FieldTitle className="flex flex-row items-center gap-1">
                                <GlobeLock className="size-3" /> Privé
                              </FieldTitle>
                              <FieldDescription>
                                Visible mais l&apos;adhésion nécessite une
                                approbation.
                              </FieldDescription>
                            </div>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="secret-plan">
                        <Field orientation="horizontal">
                          <FieldContent className="flex flex-row items-center">
                            <RadioGroupItem value="secret" id="secret-plan" />
                            <div>
                              <FieldTitle className="flex flex-row items-center gap-1">
                                <Lock className="size-3" /> Secret
                              </FieldTitle>
                              <FieldDescription>
                                Visible uniquement par les membres invités.
                              </FieldDescription>
                            </div>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                  </Field>
                  <Field>
                    <Label htmlFor="invite-members">Inviter des membres</Label>
                    <Card className="flex flex-row items-center gap-1 border py-1 px-2 w-full">
                      <Search className="size-4" />
                      <Input
                        id="invite-members"
                        placeholder="Rechercher des utilisateurs..."
                        className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
                        tabIndex={-1}
                      />
                    </Card>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button type="submit">Créer le groupe</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>

      {/* ─── Barre de recherche ─── */}
      <InputGroup className="w-full">
        <InputGroupInput
          placeholder="Rechercher un groupe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* ─── Onglets ─── */}
      <div className="flex flex-row gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <Button
              key={tab.key}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="cursor-pointer gap-1.5 rounded-full"
              onClick={() => setActiveTab(tab.key)}
            >
              <Icon className="size-3.5" />
              {tab.label}
              {tab.key === "pending" && pendingCount > 0 && (
                <span
                  className={`ml-0.5 text-[10px] font-bold rounded-full px-1.5 ${
                    isActive
                      ? "bg-primary-foreground/20"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* ─── Grille de groupes ─── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
          <Search className="size-10 opacity-30" />
          <p className="text-sm">
            {search.trim()
              ? "Aucun groupe trouvé pour cette recherche."
              : activeTab === "my-groups"
              ? "Vous n'avez rejoint aucun groupe pour le moment."
              : activeTab === "pending"
              ? "Aucune demande en attente."
              : "Aucun groupe à découvrir."}
          </p>
          {activeTab !== "discover" && !search.trim() && (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setActiveTab("discover")}
            >
              <Compass className="size-4 mr-1.5" />
              Découvrir des groupes
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((group) => (
            <GroupDisplay key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
