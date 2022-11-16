import React from "react";
import TeacherTable from "../components/TeacherTable";
import { useAuth } from "../lib/context";

export default function MDodelTable() {
  const { currentUser } = useAuth();

  return <>{currentUser && <TeacherTable userId={currentUser.uid} />}</>;
}
