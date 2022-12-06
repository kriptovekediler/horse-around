import Head from "next/head";
import useWindowSize from "../../hooks/useWindowSize";
import PageHead from "../../components/pageHead";
import BlogCard from "../../components/blog/card";
import { blogs } from "../../datas/blog";
export default function BecomeaSeller() {
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
          title="Blog"
          subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          imgSrc="../bg/blog.png"
          bg="bg-blog"
        />
        <div
          className=" pb-32 px-32  text-white grid grid-cols-3  gap-4
    xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          {/* <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard /> */}
           {blogs.map((blog,i)=>{
          return <BlogCard
                    id={blog.id}
                    author={blog.author} 
                    blogName={blog.headline} 
                    blogImage={blog.image}
                    blogContent={blog.content}
                    key={i}/>
        })}
        </div>
      </div>
    </>
  );
}