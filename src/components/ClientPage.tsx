"use client";
import { useState, useEffect, useRef } from "react";
import { useWallet } from "../hooks/useWallet";
import { litClient } from "@/utils/lit";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";
import Loader from "../components/Loader";

export default function ClientPage() {
  const { address, isDisconnected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const disconnectInProgress = useRef(false);

  useEffect(() => {
    if (!litClient.isInitialized()) {
      litClient.connect();
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDisconnected) {
      disconnectInProgress.current = true;
    }
  }, [isDisconnected]);

  if (!mounted && !disconnectInProgress.current) return <Loader />

  return address ? <Dashboard /> : <LandingPage />
};