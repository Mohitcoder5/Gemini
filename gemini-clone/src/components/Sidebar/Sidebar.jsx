import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false); // clearer naming
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className="sidebar"
      style={{ width: expanded ? "240px" : "70px" }} // expanded wide, collapsed narrow
    >
      <div className="top">
        {/* Menu toggle button */}
        <img
          onClick={() => setExpanded(!expanded)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
          data-tooltip-id="menu"
          data-tooltip-content={expanded ? "Collapse" : "Expand"}
        />
        <Tooltip
          id="menu"
          place="bottom"
          style={{ padding: "5px", fontSize: "12px", color: "#f0f4f9" }}
        />

        {/* New chat button */}
        <div
          onClick={newChat}
          className="new-chat"
          data-tooltip-id="new-chat"
          data-tooltip-content="New Chat"
        >
          <img src={assets.plus_icon} alt="new chat" />
          {expanded && <p>New Chat</p>}
        </div>
        <Tooltip
          id="new-chat"
          place="bottom"
          style={{ padding: "5px", fontSize: "12px", color: "#f0f4f9" }}
        />

        {/* Recent prompts only when expanded */}
        {expanded && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="prompt" />
                <p>
                  {item.slice(0, 24)}
                  {item.length > 24 && "..."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom items */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {expanded && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {expanded && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {expanded && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
