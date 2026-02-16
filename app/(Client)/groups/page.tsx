import GroupDisplay from "@/src/components/personnal/ui/groupDisplay";
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
import { Globe, GlobeLock, Lock, Plus, Search } from "lucide-react";

const GroupsHeader = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row w-full gap-2 justify-between pt-10">
        <div className="w-3/4">
          <p className="text-2xl font-bold">Groups</p>
          <p className="text-gray-600">
            Join communities and connect with your colleagues
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="flex flex-row items-center gap-2 cursor-pointer">
                  <Plus />
                  Create group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm md:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create a chat group</DialogTitle>
                  <DialogDescription>
                    Set up your new group and add members.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name-1">Group name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      placeholder="Ex : Alpha projet, Dev Team"
                    />
                  </Field>
                  <Field>
                    <Label>Visibility</Label>
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
                                Anyone can find and join this group.
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
                                <GlobeLock className="size-3" /> Private
                              </FieldTitle>
                              <FieldDescription>
                                Visible but membership requires approval.
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
                                Visible only to invited members.
                              </FieldDescription>
                            </div>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                  </Field>
                  <Field>
                    <Label htmlFor="name-1">Invite members</Label>
                    <Card className="flex flex-row items-center gap-1 border py-1 px-2 w-full">
                      <Search className="size-4" />
                      <Input
                        placeholder="Search users..."
                        className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
                        tabIndex={-1}
                      />
                    </Card>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create group</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <InputGroup className="w-full">
        <InputGroupInput placeholder="Search groups..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

const GroupContent = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* <Card className="p-2 bg-accent flex flex-row gap-2 xl:max-w-2xl w-full rounded-md">
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-center gap-2"
            variant="outline"
          >
            My groups
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-cente gap-2r"
            variant="ghost"
          >
            Discover
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-cente gap-2r"
            variant="ghost"
          >
            pending
          </Button>
        </div>
      </Card> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GroupDisplay />
        <GroupDisplay />
        <GroupDisplay />
      </div>
    </div>
  );
};

const GroupsPage = () => {
  return (
    <div className="xl:w-2xl xl:max-w-2xl w-/4 pb-20 flex flex-col gap-3 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      <GroupsHeader />
      <GroupContent />
    </div>
  );
};

export default GroupsPage;
