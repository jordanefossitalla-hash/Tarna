"use client";
import {
  Camera,
  FileText,
  Globe,
  GlobeLock,
  Hash,
  ImageIcon,
  Link2,
  LucideIcon,
  Plus,
  Smile,
  Users,
  X,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useActionState, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUserStore } from "@/src/store/userStore";
import { useFeedStore } from "@/src/store/feedStore";
import { createPostAction, type CreatePostState } from "@/app/(Client)/home/actions";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

type VisibilityOption = {
  value: string;
  label: string;
  icon: LucideIcon;
};

type MediaAction = {
  id: number;
  label: string;
  icon: LucideIcon;
  action?: () => void;
};

const visibilityOptions: VisibilityOption[] = [
  { value: "public", label: "Public", icon: Globe },
  { value: "private", label: "Privé", icon: GlobeLock },
  { value: "friends", label: "Amis", icon: Users },
];

const AddPostCard = ({ isgroup }: { isgroup: boolean }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const currentUser = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const addPost = useFeedStore((s) => s.addPost);

  const initialState: CreatePostState = { success: false, error: null, post: null };
  const [state, formAction, isPending] = useActionState(createPostAction, initialState);

  // Reset le formulaire après un post réussi + ajout au store
  useEffect(() => {
    if (state.success) {
      // Ajoute le post au store feed (en tête)
      if (state.post) {
        addPost(state.post);
      }
      setContent("");
      setImagePreview(null);
      setPdfFile(null);
      setIsFocused(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (pdfInputRef.current) pdfInputRef.current.value = "";
      toast.success("Post publié", {
        description: "Votre publication est en ligne.",
      });
    } else if (state.error) {
      toast.error("Échec de la publication", {
        description: state.error,
      });
    }
  }, [state, addPost]);

  const handleImageUpload = () => fileInputRef.current?.click();
  const handlePdfUpload = () => pdfInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPdfFile(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePdf = () => {
    setPdfFile(null);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const hasContent = content.trim().length > 0 || imagePreview || pdfFile;

  const mediaActions: MediaAction[] = [
    { id: 0, label: "Photo", icon: ImageIcon, action: handleImageUpload },
    { id: 1, label: "Vidéo", icon: Camera },
    { id: 2, label: "Document", icon: FileText, action: handlePdfUpload },
    { id: 3, label: "Lien", icon: Link2 },
    { id: 4, label: "Emoji", icon: Smile },
    { id: 5, label: "Hashtag", icon: Hash },
  ];

  return (
    <form ref={formRef} action={formAction} className="pt-4 pb-2">
      <Card
        className={`px-4 py-3 transition-shadow ${
          isFocused ? "shadow-md ring-1 ring-primary/20" : "shadow-sm"
        }`}
      >
        {/* Hidden inputs for server action */}
        <input type="hidden" name="token" value={accessToken ?? ""} />
        <input type="hidden" name="authorId" value={currentUser?.id ?? ""} />
        <input type="hidden" name="contentText" value={content} />
        <input type="hidden" name="visibility" value={visibility} />

        {/* File inputs */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="file"
          ref={pdfInputRef}
          accept="application/pdf"
          className="hidden"
          onChange={handlePdfChange}
        />

        {/* ─── Top: Avatar + Textarea ─── */}
        <div className="flex flex-row gap-3">
          <Avatar className="size-10 shrink-0 mt-0.5">
            <AvatarImage
              src={currentUser?.avatarUrl || ""}
              alt="profil"
            />
            <AvatarFallback className="text-xs font-semibold">
              {currentUser?.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              placeholder="Quoi de neuf ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={isFocused || hasContent ? 3 : 1}
              className="w-full resize-none border-0 bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-0 py-2"
            />
          </div>
        </div>

        {/* ─── Previews ─── */}
        {(imagePreview || pdfFile) && (
          <div className="flex flex-row flex-wrap gap-2 mt-2 ml-13">
            {imagePreview && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border">
                <NextImage
                  src={imagePreview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )}
            {pdfFile && (
              <div className="flex flex-row items-center gap-2 bg-accent rounded-lg px-3 py-2 h-fit">
                <FileText className="size-4 text-red-500 shrink-0" />
                <p className="text-xs truncate max-w-32">{pdfFile.name}</p>
                <button
                  type="button"
                  onClick={removePdf}
                  className="bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80 cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── Séparateur ─── */}
        <div className="h-px bg-border mt-3 mb-2 ml-13" />

        {/* ─── Bottom: Actions ─── */}
        <div className="flex flex-row items-center justify-between ml-13">
          <div className="flex flex-row items-center gap-0.5">
            {/* Desktop: boutons individuels */}
            <div className="hidden sm:flex flex-row items-center gap-0.5">
              {mediaActions.map((media) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={media.action}
                  className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                  title={media.label}
                >
                  <media.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>

            {/* Mobile: dropdown */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-accent cursor-pointer"
                  >
                    <Plus className="size-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Médias</DropdownMenuLabel>
                    {mediaActions.map((media) => (
                      <DropdownMenuItem
                        key={media.id}
                        className="cursor-pointer gap-2"
                        onClick={media.action}
                      >
                        <media.icon className="size-4" />
                        {media.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            {/* Visibilité */}
            {!isgroup && (
              <Select defaultValue="public" value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="h-8 text-xs w-28 border-0 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Visibilité</SelectLabel>
                    {visibilityOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex flex-row items-center gap-1.5">
                          <opt.icon className="size-3.5" />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            {/* Publier */}
            <Button
              type="submit"
              size="sm"
              className="cursor-pointer gap-1.5 rounded-full px-4"
              disabled={!hasContent || isPending}
            >
              {isPending ? (
                <Spinner className="size-3.5" />
              ) : (
                <Send className="size-3.5" />
              )}
              <span className="hidden sm:inline">
                {isPending ? "Publication…" : "Publier"}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default AddPostCard;
