import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <Link href={"/chat"} className="underline underline-offset-4">
            <h1 className={title()}>Chat with Our AI</h1>
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
