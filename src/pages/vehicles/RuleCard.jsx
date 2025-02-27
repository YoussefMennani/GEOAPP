import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit'; // MUI Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Delete icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // MUI Expand icon
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // MUI Collapse icon
import "./style.css"
const RuleCard = ({ ruleData, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title h5 mb-0 p-2  border rounded bg-dark text-white color-">{ruleData.ruleGroupName}</h3>
          <button
            className="btn btn-link p-0"
            onClick={toggleExpand}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
        </div>
        <p className="card-text text-muted small mb-3">
          Organization: {ruleData.organization}
        </p>

        {isExpanded && (
          <div className="d-flex flex-column gap-3">
            {ruleData.rules.map((rule) => (
              <div
                key={rule.id}
                className="p-3 bg-light rounded rule-hover-effect border " // Added custom class
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="h6 mb-0">{rule.name}</h4>
                  <span
                    className={`badge ${rule.status === 'active' ? 'bg-success' : 'bg-danger'
                      }`}
                  >
                    {rule.status}
                  </span>
                </div>
                <p className="mb-2 small">
                  <strong>Condition:</strong> {rule.conditions.parameter}{' '}
                  {rule.conditions.operator} {rule.conditions.value}{' '}
                  {rule.conditions.unit || ''}
                </p>
                <p className="mb-2 small">
                  <strong>Actions:</strong> {rule.actions.join(', ')}
                </p>

              </div>
            ))}

            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary"  onClick={onEdit}>
                <EditIcon fontSize="small" /> Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
                <DeleteIcon fontSize="small" /> Delete
              </button>
            </div>

          </div>


        )}

      </div>
    </div>
  );
};

export default RuleCard;