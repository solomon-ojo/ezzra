import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex max-w-[500px] flex-col gap-5 items-center justify-center h-full">
        <h1 className={`${title()} text-[#000000]`}>
          {siteConfig.shortName}AI - Church Database and AI Bot.
        </h1>
        <Link href={siteConfig.sitePaths.register} className="w-full">
          <button className="h-[50px] rounded-lg font-semibold bg-[#0F0529] w-full">
            Get Started
          </button>
        </Link>
      </section>
    </DefaultLayout>
  );
}
