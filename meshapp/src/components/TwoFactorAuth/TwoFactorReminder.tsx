import React, { useState, useEffect } from "react";
import TwoFactorAuthModal from "./TwoFactorPopup";
import TwoFactorBanner from "./TwoFactorBanner";

/**
 * A React component used to remind the user about enabling Two-Factor Authentication (2FA) in their settings.
 * Local storage is used to determine whether to show the reminding modal or banner.
 *
 * If a user hasn't been prompted to enable 2FA and it's not already enabled, a modal will be shown on page load.
 * If the user has been prompted but hasn't enabled 2FA yet, a banner will be shown on page load.
 *
 * It manages two important pieces of UI:
 * 1. A modal (TwoFactorAuthModal) that prompts users to enable 2FA.
 * 2. A banner (TwoFactorBanner) that reminds users about enabling 2FA.
 */
const TwoFactorAuthReminders = () => {
  // Used to track popup's visibility
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalOpen = () => setModalVisible(true);
  const handleModalClose = () => {
    setModalVisible(false);
    localStorage.setItem("promptedFor2FA", "true");

    // Upon closing the modal, show the banner
    handleBannerOpen();
  };

  // Used to track banner's visibility
  const [bannerVisible, setBannerVisible] = useState(false);
  const handleBannerOpen = () => setBannerVisible(true);
  const handleBannerClose = () => setBannerVisible(false);

  // On page load, check if the user has 2FA already enabled
  // If not, check if the user has been prompted to enable 2FA (if not, show modal)
  // Otherwise, show the banner
  useEffect(() => {
    const enabled = localStorage.getItem("2FA-Enabled");
    const prompted = localStorage.getItem("promptedFor2FA");

    if (!enabled) {
      if (!prompted) {
        handleModalOpen();
      } else {
        handleBannerOpen();
      }
    }
  }, []);

  return (
    <body>
      <TwoFactorAuthModal
        visible={modalVisible}
        handleOpen={handleModalOpen}
        handleClose={handleModalClose}
      />
      <TwoFactorBanner
        visible={bannerVisible}
        handleClose={handleBannerClose}
      />
    </body>
  );
};

export default TwoFactorAuthReminders;
