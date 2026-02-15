"use client";

import { useTheme } from "@/theme/ThemeProvider";
import { AgeGroupModal } from "./AgeGroupModal";

export function AgeGroupPicker() {
  const {
    showAgeModal,
    ageModalDismissable,
    setAgeGroup,
    closeAgeModal,
  } = useTheme();

  return (
    <AgeGroupModal
      open={showAgeModal}
      dismissable={ageModalDismissable}
      onSelect={(id) => {
        setAgeGroup(id);
        closeAgeModal();
      }}
      onClose={closeAgeModal}
    />
  );
}
