import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import PageHead from "../components/pageHead";
import { Input, Textarea, Button } from "../components/formElement";
export default function ContactUs() {
  const size = useWindowSize();
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <PageHead
          title="Contact Us!"
          //   subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          imgSrc="../bg/contact.png"
          bg="bg-contact"
          noBottom
        />
        <div
          className=" pb-32 px-32  text-white grid grid-cols-2  gap-4
    xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1"
        >
          <form>
            <h2 className="text-xl text-white mb-10 font-PoppinsSemiBold">
              Drop Us a Line
            </h2>
            <Input placeholder="Name Surname" />
            <Input placeholder="Email" />
            <Textarea placeholder="Message" />
            <Input placeholder="Human verify: 3+1= ?" />
            <div className="mt-4">
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}