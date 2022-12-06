import React from "react";
import Link from "next/link";
import Title from "../title";
import Card from "./card";
import styles from "./styles.module.css";
import { blogs } from "../../datas/blog";

export default function BlogBox() {
  return (
    <div className={styles.box}>
      <Title
        title="Blog"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        action
        actionText="View All"
      />
      <div className={styles.gridBox}>
        {blogs.map((blog,i)=>{
          return <Card
                    id={blog.id}
                    author={blog.author} 
                    blogName={blog.headline} 
                    blogImage={blog.image}
                    blogContent={blog.content}
                    date={blog.date}
                    key={i}/>
        })}
      </div>
    </div>
  );
}
