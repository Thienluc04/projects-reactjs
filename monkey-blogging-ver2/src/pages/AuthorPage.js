import Header from "components/layout/Header";
import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import slugify from "slugify";

const AuthorPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("user.slug", "==", slug)
      );
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
          setAuthorName(doc.data().user.fullname);
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [slug]);
  if (posts.length <= 0) return null;
  return (
    <div>
      <Layout>
        <div className="container">
          <div className="pt-10"></div>
          <div className="post-related">
            <Heading>Các bài viết của {authorName}</Heading>
            <div className="grid-layout grid-layout--primary">
              {posts?.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AuthorPage;
