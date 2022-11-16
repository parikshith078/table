import React from "react";
import ModelTable from "../components/ModelTable";
import { useAuth } from "../lib/context";

export default function MDodelTable() {
  const { currentUser } = useAuth();

  return <>{currentUser && <ModelTable userId={currentUser.uid} />}</>;
}
