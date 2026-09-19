import type { Metadata } from "next";
import MaintenanceContent from "@/components/MaintenanceContent";

export const metadata: Metadata = {
  title: "Péče o web | Vexx. Essential Care",
  description: "Zjistěte, co obnáší kompletní technická a obsahová péče Vexx. Essential Care. Extrémní rychlost, železné zabezpečení, pravidelné zálohování a další služby.",
};

export default function MaintenancePage() {
  return <MaintenanceContent />;
}
