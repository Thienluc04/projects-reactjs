import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fectchData() {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fectchData();
  }, [params.slug]);
  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="pt-10"></div>
        <div className="post-related">
          <Heading>Danh mục {params.slug}</Heading>
          <div className="grid-layout grid-layout--primary">
            {posts.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
