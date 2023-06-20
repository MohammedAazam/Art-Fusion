"use client";

import { useAppDispatch } from "@/lib/hooks";
import { fetchProdutionMembers } from "@/store/productions.slice";
import { fetchRequests } from "@/store/requests.slice";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface props {
  children: React.ReactNode;
}

export default function MyProjectsLayout({ children }: props) {
  const session = useSession();
  const projectId = useParams().projectId;
  const user = session.data?.user;
  const dispatch = useAppDispatch();

  if (user && projectId) {
    dispatch(fetchProdutionMembers(projectId));
    dispatch(fetchRequests({ projectId }));
  }

  return <>{children}</>;
}
