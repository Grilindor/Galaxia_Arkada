import React from "react";
import PropTypes from "prop-types";
import {
  StatCardContainer,
  StatIcon,
  StatContent,
} from "../styles/StatCard_SC";

const StatCard = ({ title, value, icon }) => {
  return (
    <StatCardContainer>
      <StatIcon>{icon && <img src={icon} alt={`${title} icon`} />}</StatIcon>
      <StatContent>
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </StatContent>
    </StatCardContainer>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
};

export default StatCard;
