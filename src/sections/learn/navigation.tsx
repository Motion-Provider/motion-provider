import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import libraryLib from "@/lib/learn/library.lib";
import { setDocument } from "@/redux/slices/documentSlice";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const Navigation = () => {
  const [next, setNext] = useState<string>("Motion Provider");
  const [navigation, setNavigation] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath.split("/").filter((p) => p !== "");
    const nextPathName = path[path.length - 1];
    const findObject = libraryLib.find((item) =>
      item.link.includes(nextPathName)
    ) as (typeof libraryLib)[0];

    const nextObjectID = findObject?.id + 1;
    const nextObject = libraryLib.find(
      (item) => item.id === nextObjectID
    ) as (typeof libraryLib)[0];

    if (findObject) {
      setNext(nextObject.title);
      dispatch(
        setDocument({
          objectID: findObject.id,
        })
      );
    }
    if (nextObject) setNavigation(nextObject.link);
  }, []);

  if (!navigation) return <Skeleton className="h-24 w-36 dark" />;
  return (
    <section className="w-full h-24 flex items-center justify-between py-12">
      <Link href={"/learn"}>
        <Button variant={"outline"}>
          <ArrowLeft /> Go Home
        </Button>
      </Link>
      <Link href={`${navigation}`}>
        <Button variant={"outline"}>
          Go next | {next} <ArrowRight />
        </Button>
      </Link>
    </section>
  );
};
