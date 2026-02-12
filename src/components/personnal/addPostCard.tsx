"use client"
import { Camera, FileText, Image } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

const AddPostCard = () => {
  return (
    <form action="" className="py-4">
        <Card className="bg-amber-400 h-50 w-2xl p-2 flex flex-row justify-between">
          <div className="pl-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full flex flex-col gap-3">
            <textarea
              name="post"
              id="post"
              placeholder="What's up ?"
              className="w-full h-20"
            ></textarea>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image className="size-4" />
                <p>image</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Camera className="size-4" />
                <p>video</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FileText className="size-4" />
                <p>document</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end h-full">
            <Button>Publish</Button>
          </div>
        </Card>
      </form>
  )
}

export default AddPostCard