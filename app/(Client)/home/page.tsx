import AddPostCard from "@/src/components/personnal/addPostCard";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Camera, FileText, Image } from "lucide-react";

const HomePage = () => {
  return (
    <div>
      <AddPostCard/>
    </div>
  );
};

export default HomePage;
