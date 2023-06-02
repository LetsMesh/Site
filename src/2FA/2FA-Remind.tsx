import React, { useState, useEffect } from "react";

import TwoFactorAuthModal from "./2FA-Popup";
import TwoFactorBanner from "./2FA-Banner";

import "./TempBody.css";

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
