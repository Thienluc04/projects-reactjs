import { ActionDelete, ActionEdit } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";

const UserTable = ({ userList }) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };

  const hanldeDeleteUser = async (user) => {
    const docRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        await deleteUser(user);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MODE:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };

  const renderUserItem = (user) => {
    if (user.email === userInfo.email) {
      return (
        <tr key={user.id}>
          <td title={user.id}>{user.id.slice(0, 8) + "..."}</td>
          <td className="whitespace-nowrap">
            <div className="flex items-center gap-x-3">
              <img
                src={user?.avatar}
                alt=""
                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1">
                <h3>{user?.fullname}</h3>
                <time className="text-sm text-gray-400">
                  {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                    "vi-VI"
                  )}
                </time>
              </div>
            </div>
          </td>
          <td>{user.username}</td>
          <td title={user.email}>{user.email.slice(0, 8) + "..."}</td>
          <td>{renderLabelStatus(Number(user?.status))}</td>
          <td>{renderRoleLabel(Number(user?.role))}</td>
          <td>
            <div
              className="flex items-center gap-x-3  opacity-50"
              title="This user is you, so you can't change it!"
            >
              <ActionEdit className="bg-slate-300 !cursor-default"></ActionEdit>
              <ActionDelete className="bg-slate-300 !cursor-default"></ActionDelete>
            </div>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={user.id}>
          <td title={user.id}>{user.id.slice(0, 8) + "..."}</td>
          <td className="whitespace-nowrap">
            <div className="flex items-center gap-x-3">
              <img
                src={user?.avatar}
                alt=""
                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1">
                <h3>{user?.fullname}</h3>
                <time className="text-sm text-gray-400">
                  {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                    "vi-VI"
                  )}
                </time>
              </div>
            </div>
          </td>
          <td>{user.username}</td>
          <td title={user.email}>{user.email.slice(0, 8) + "..."}</td>
          <td>{renderLabelStatus(Number(user?.status))}</td>
          <td>{renderRoleLabel(Number(user?.role))}</td>
          <td>
            <div className="flex items-center gap-x-3">
              <ActionEdit
                onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
              ></ActionEdit>
              <ActionDelete
                onClick={() => hanldeDeleteUser(user)}
              ></ActionDelete>
            </div>
          </td>
        </tr>
      );
    }
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
