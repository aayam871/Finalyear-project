import React, { useState } from "react";
import AgentList from "./AgentList";
import AgentDetail from "./AgentDetail";

const AgentPanel = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleViewDetails = (agent) => setSelectedAgent(agent);
  const handleCloseDetail = () => setSelectedAgent(null);
  const handleStatusChange = () => {
    setSelectedAgent(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <AgentList key={refreshKey} onViewDetails={handleViewDetails} />
      {selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          onClose={handleCloseDetail}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AgentPanel;
