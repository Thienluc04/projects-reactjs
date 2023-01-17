import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const USER_PER_PAY = 5;

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
            // where("id", "!=", userInfo.uid)
          )
        : query(
            colRef,
            // where("id", "!=", userInfo.uid),
            limit(USER_PER_PAY)
          );
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      setLastDoc(lastVisible);

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUserList(results);
      });
    }

    fetchData();
  }, [filter]);

  const handleUploadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc || 0),
      limit(USER_PER_PAY)
    );
    const documentSnapshots = await getDocs(nextRef);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUserList([...userList, ...results]);
    });
  };

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-between mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="py-4 px-5 border boder-gray-300 rounded-lg"
          onChange={handleInputFilter}
        />
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable userList={userList}></UserTable>
      {total > userList.length && (
        <div className="mt-10">
          <Button onClick={handleUploadMoreUser} className="mx-auto">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserManage;
