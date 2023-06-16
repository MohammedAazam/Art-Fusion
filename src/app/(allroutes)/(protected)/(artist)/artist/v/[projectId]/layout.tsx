"use client";

import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/store";
import {
  ProjectSelector,
  fetchIntialProduction,
} from "@/store/productions.slice";
import { fetchRequests } from "@/store/requests.slice";
import { useParams} from "next/navigation";

interface props {
  children: React.ReactNode;
}

export default function ProjectViewLayout({ children }: props) {
  const dispatch = useAppDispatch();
  const params = useParams();
  dispatch(fetchRequests({ projectId: params.projectId }));

  return <div>{children}</div>;
}
