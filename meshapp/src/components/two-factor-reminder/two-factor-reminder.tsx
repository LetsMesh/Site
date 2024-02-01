import { useState, useEffect } from "react";

import TwoFactorAuthModal from "./two-factor-popup";
import TwoFactorBanner from "./two-factor-banner";
import { useAccountContext } from "../../contexts/UserContext";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const { account } = useAccountContext();

  const handleModalOpen = () => setModalVisible(true);
  const handleModalClose = () => {
    setModalVisible(false);
    localStorage.setItem("promptedFor2FA", "true");
    handleBannerOpen();
  };

  const handleBannerOpen = () => setBannerVisible(true);
  const handleBannerClose = () => setBannerVisible(false);

  // On page load, check if the user has 2FA already enabled
  // If not, check if the user has been prompted to enable 2FA (if not, show modal)
  // Otherwise, show the banner
  useEffect(() => {
    const promptedFor2FA = localStorage.getItem("promptedFor2FA");
    const is2FAEnabled = account?.settings?.is2FAEnabled;

    // Show modal only if 2FA is not enabled and the user hasn't been prompted yet
    if (!is2FAEnabled && !promptedFor2FA) {
      handleModalOpen();
    }
    // Show banner if 2FA is not enabled but the user has been prompted
    else if (!is2FAEnabled && promptedFor2FA) {
      handleBannerOpen();
    }
  }, [account]);

  return (
    <div>
      <TwoFactorAuthModal
        visible={modalVisible}
        handleOpen={handleModalOpen}
        handleClose={handleModalClose}
      />
      <TwoFactorBanner
        visible={bannerVisible}
        handleClose={handleBannerClose}
      />
    </div>
  );
};

export default TwoFactorAuthReminders;
