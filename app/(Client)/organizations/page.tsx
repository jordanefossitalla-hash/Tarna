"use client";

import OrgCard from "@/src/components/personnal/ui/orgCard";
import { Button } from "@/src/components/ui/button";
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
import { Input } from "@/src/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import type { OrganizationResponse } from "@/src/types/organization";
import {
  Building2,
  Plus,
  Search,
  Users,
  Compass,
  Clock,
  Globe,
  Loader2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchMyOrgs,
  fetchDiscoverOrgs,
  fetchPendingOrgs,
} from "./action";
import { useUserStore } from "@/src/store/userStore";
import { toast } from "sonner";

// ── Types & constants ────────────────────────────────────────

type Tab = "my-orgs" | "discover" | "pending";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "my-orgs", label: "Mes organisations", icon: Building2 },
  { key: "discover", label: "Découvrir", icon: Compass },
  { key: "pending", label: "En attente", icon: Clock },
];

const sectors = [
  "Technologie",
  "Infrastructure & Cloud",
  "Design & Création",
  "Éducation & Formation",
  "Data & Intelligence Artificielle",
  "Développement Mobile",
  "Entrepreneuriat",
  "Cybersécurité",
  "Blockchain & Web3",
  "Santé",
  "Finance",
  "Agriculture",
  "Autre",
];

const countries = [
  "Cameroun",
  "Sénégal",
  "Côte d'Ivoire",
  "Gabon",
  "Congo",
  "Tchad",
  "Bénin",
  "Togo",
  "Mali",
  "Burkina Faso",
  "Autre",
];

// ── Page component ───────────────────────────────────────────

const OrganizationsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("my-orgs");
  const [search, setSearch] = useState("");
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  // Per-tab state
  const [myOrgs, setMyOrgs] = useState<OrganizationResponse[]>([]);
  const [discoverOrgs, setDiscoverOrgs] = useState<OrganizationResponse[]>([]);
  const [pendingOrgs, setPendingOrgs] = useState<OrganizationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState<Record<Tab, boolean>>({
    "my-orgs": false,
    discover: false,
    pending: false,
  });

  // ── Data fetchers ──────────────────────────────────────────

  const loadTab = useCallback(
    async (tab: Tab) => {
      if (!isAuthenticated) return;
      setLoading(true);
      try {
        switch (tab) {
          case "my-orgs": {
            const res = await fetchMyOrgs();
            setMyOrgs(res.data);
            break;
          }
          case "discover": {
            const res = await fetchDiscoverOrgs();
            setDiscoverOrgs(res.data);
            break;
          }
          case "pending": {
            const res = await fetchPendingOrgs();
            setPendingOrgs(res.data);
            break;
          }
        }
        setLoaded((prev) => ({ ...prev, [tab]: true }));
      } catch {
        toast.error(
          "Une erreur est survenue lors de la récupération des organisations.",
        );
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated],
  );

  // Load current tab if not yet loaded
  useEffect(() => {
    if (!loaded[activeTab]) {
      void loadTab(activeTab);
    }
  }, [activeTab, loaded, loadTab]);

  // ── Derived lists ──────────────────────────────────────────

  const currentList: OrganizationResponse[] = useMemo(() => {
    const list =
      activeTab === "my-orgs"
        ? myOrgs
        : activeTab === "discover"
          ? discoverOrgs
          : pendingOrgs;

    if (!search.trim()) return list;

    const q = search.toLowerCase();
    return list.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        (o.bio ?? "").toLowerCase().includes(q) ||
        o.sector.toLowerCase().includes(q) ||
        o.domain.toLowerCase().includes(q) ||
        o.country.toLowerCase().includes(q),
    );
  }, [activeTab, search, myOrgs, discoverOrgs, pendingOrgs]);

  const totalMembers = useMemo(
    () => myOrgs.reduce((sum, o) => sum + o._count.memberships, 0),
    [myOrgs],
  );

  return (
    <div className="xl:w-2xl xl:max-w-2xl w-full pb-20 flex flex-col gap-4 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row w-full gap-3 justify-between pt-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="size-6" />
            Organisations
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez vos entités officielles, publiez du contenu et collaborez avec
            votre équipe.
          </p>
        </div>
        <div className="flex flex-col justify-end shrink-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex flex-row items-center gap-2 cursor-pointer">
                <Plus className="size-4" />
                Créer une organisation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-lg">
              <form>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building2 className="size-5" />
                    Créer une organisation
                  </DialogTitle>
                  <DialogDescription>
                    Lancez une entité officielle sur Tarna. Vous en serez
                    automatiquement le propriétaire (Owner).
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                  {/* Nom */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="org-name">
                      Nom de l&apos;organisation *
                    </Label>
                    <Input
                      id="org-name"
                      name="name"
                      placeholder="Ex : KIAMA Technologies, StartupHub"
                      required
                    />
                  </div>

                  {/* Domaine */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="org-domain">Domaine</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="size-4 text-muted-foreground shrink-0" />
                      <Input
                        id="org-domain"
                        name="domain"
                        placeholder="Ex : kiama.cm, monentreprise.com"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Le domaine web associé à votre organisation (optionnel).
                    </p>
                  </div>

                  {/* Pays & Secteur côte à côte */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pays */}
                    <div className="flex flex-col gap-1.5">
                      <Label>Pays *</Label>
                      <Select name="country" required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Secteur d'activité */}
                    <div className="flex flex-col gap-1.5">
                      <Label>Secteur d&apos;activité *</Label>
                      <Select name="sector" required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="org-description">Description</Label>
                    <Textarea
                      id="org-description"
                      name="description"
                      placeholder="Décrivez brièvement votre organisation, ses objectifs et son activité..."
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Annuler
                    </Button>
                  </DialogClose>
                  <Button type="submit">
                    <Building2 className="size-4 mr-1.5" />
                    Créer l&apos;organisation
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2 rounded-lg border p-3 bg-muted/30">
          <Building2 className="size-4 text-primary" />
          <div>
            <p className="text-lg font-bold leading-none">{myOrgs.length}</p>
            <p className="text-[11px] text-muted-foreground">
              Mes organisations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border p-3 bg-muted/30">
          <Users className="size-4 text-primary" />
          <div>
            <p className="text-lg font-bold leading-none">
              {totalMembers.toLocaleString()}
            </p>
            <p className="text-[11px] text-muted-foreground">Membres total</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border p-3 bg-muted/30">
          <Clock className="size-4 text-amber-500" />
          <div>
            <p className="text-lg font-bold leading-none">
              {pendingOrgs.length}
            </p>
            <p className="text-[11px] text-muted-foreground">En attente</p>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <InputGroup className="w-full">
        <InputGroupInput
          placeholder="Rechercher une organisation par nom, secteur, pays..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* Onglets */}
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
              {tab.key === "pending" && pendingOrgs.length > 0 && (
                <span
                  className={`ml-0.5 text-[10px] font-bold rounded-full px-1.5 ${
                    isActive
                      ? "bg-primary-foreground/20"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {pendingOrgs.length}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Grille d'organisations */}
      {loading && !loaded[activeTab] ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : currentList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
          <Search className="size-10 opacity-30" />
          <p className="text-sm text-center">
            {search.trim()
              ? "Aucune organisation ne correspond à votre recherche."
              : activeTab === "my-orgs"
                ? "Vous n'êtes membre d'aucune organisation pour le moment."
                : activeTab === "pending"
                  ? "Aucune demande d'adhésion en attente."
                  : "Aucune organisation disponible pour le moment."}
          </p>
          {activeTab !== "discover" && !search.trim() && (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setActiveTab("discover")}
            >
              <Compass className="size-4 mr-1.5" />
              Découvrir des organisations
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentList.map((org) => (
            <OrgCard key={org.id} org={org} variant={activeTab === "my-orgs" ? "mine" : activeTab === "discover" ? "discover" : "pending"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;
