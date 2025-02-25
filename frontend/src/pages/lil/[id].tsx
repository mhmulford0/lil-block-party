import { WalletIcon } from "@heroicons/react/20/solid";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import Header from "../../components/Header";
import { EulogyInfo } from "../../components/Memeorium";
import Tombstone from "../../components/Tombstone";
import { prisma } from "../../core/db";

interface Props {
  eulogy: EulogyInfo;
}

export default function LilPage({ eulogy }: Props) {
  if (!eulogy) {
    return <div className="mx-auto flex flex-wrap pt-6 bg-[#22212C] min-h-screen"></div>;
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Lil Block Party</title>
        <meta name="description" content="Watch the blocks. Pick a lil. Join the party" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="lilblockparty.wtf" />
        <meta property="twitter:url" content="https://www.lilblockparty.wtf" />
        <meta name="twitter:title" content="Lil Block Party" />
        <meta
          name="twitter:description"
          content="Watch the blocks. Pick a lil. Join the party"
        />
        <meta name="twitter:image" content={eulogy.img_url} />
      </Head>
      <div className="mx-auto flex flex-col flex-wrap pt-6 bg-[#22212C] min-h-screen">
        <div className="mx-auto w-full px-1.5 md:px-4 pt-6 pb-12 lg:max-w-6xl">
          <Header />
        </div>
        <div key={eulogy.token_id} className="mx-auto">
          <section className="mx-auto mb-12">
            <div className="flex flex-wrap flex-col w-full items-center">
              <Tombstone />

              <div className="">
                <h3 className=" text-gray-400 text-3xl mt-4">
                  RIP to the almost Lil #: {eulogy.token_id}
                </h3>
                <span className="text-white text-xl block">{eulogy?.eulogy}</span>
              </div>
            </div>
            <div className="flex justify-center max-w-5xl">
              <section className="w-full mt-8">
                <img
                  src={eulogy.img_url}
                  className=" object-cover object-center  mx-auto rounded-md"
                  alt="lil"
                />
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {

  if (!context.query.id || typeof context.query.id !== "string") {
    return { props: {} };
  }

  try {
    const data = await prisma.eulogies.findFirst({
      where: {
        id: context.query.id,
      },
      select: { eulogy: true, img_url: true, token_id: true, id: true },
    });
    return {
      props: { eulogy: data },
    };
  } catch (error) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }
}
