// src/components/MessageBar/index.tsx

import { IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useAccountContext } from "../../contexts/UserContext";
import MessageBox, { messageBoxWidth } from "./MessageBox";
import { useLocation } from "react-router-dom";
import { paths } from "../../routing/RoutePaths";

/**
 * ### MessageBar Component
 *
 * The MessageBar component serves as the entry point for the messaging feature in the application.
 * It provides an interface for users to access their messages from any part of the application.
 * The component is only visible to authenticated users.
 *
 * #### Functionality:
 * - The component renders the `MessageBox` which is responsible for displaying the list of conversations
 *   or a specific chat interface.
 * - It maintains a state `showSearch` to toggle the visibility of the `MessageBox`.
 * - The component renders an `IconButton` with an `EmailIcon` to open the `MessageBox`.
 * - The visibility of the `MessageBox` is controlled by the `showSearch` state, which can be toggled
 *   by the user through the `IconButton`.
 * - The `MessageBox` is conditionally rendered based on the `showSearch` state and the current pathname.
 *   It ensures that the `MessageBox` is not displayed on the dedicated messaging page.
 *
 * #### Styling:
 * - The component has a fixed position at the bottom of the screen.
 * - It utilizes the theme from Material-UI for consistent styling with the rest of the application.
 *
 * #### Props:
 * - None
 *
 * #### States:
 * - `showSearch`: A boolean state to manage the visibility of the `MessageBox`.
 *
 * #### Dependencies:
 * - Material-UI components: IconButton, useTheme.
 * - Material-UI icons: EmailIcon.
 * - React hooks: useState.
 * - React Router: useLocation.
 * - Contexts: useAccountContext.
 * - Custom components: MessageBox.
 * - Constants: messageBoxWidth.
 * - Route paths: paths from "../../routing/RoutePaths".
 *
 * #### Usage:
 * This component should be used in layouts or pages where quick access to messaging is needed.
 * It should not be rendered on the dedicated messaging page to avoid redundancy.
 *
 * #### Example:
 * ```
 * <MessageBar />
 * ```
 */
const MessageBar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { account } = useAccountContext();

  const [showSearch, setShowSearch] = useState(false);

  if (!account) return null;

  return (
    <>
      <MessageBox showSearch={showSearch} setShowSearch={setShowSearch} />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: theme.palette.secondary.main,
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          zIndex: 100,
          borderTop: "sold black 1px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 10px",
            width: messageBoxWidth,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {pathname !== paths.messages && (
            <IconButton
              sx={{ color: "primary.contrastText", borderRadius: 0 }}
              onClick={() => setShowSearch(!showSearch)}
            >
              <EmailIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBar;
