import React from 'react';
import ActivityFeedItem from './ActivityFeedItem';

const ActivityFeed = ({
  title = 'Recent Activity',
  activities = [],
  bgColor = 'bg-gradient-to-br from-white to-[#f8f9fa]',
  borderColor = 'border-[#e9ecef]',
  titleColor = 'text-[#624d41]',
  className = ''
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className={`text-2xl font-bold ${titleColor} mb-6`}>{title}</h2>
      <div className={`${bgColor} border ${borderColor} rounded-xl p-6 shadow-md`}>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <ActivityFeedItem
              key={index}
              icon={activity.icon}
              title={activity.title}
              time={activity.time}
              status={activity.status}
              statusColor={activity.statusColor}
              bgColor={activity.iconBgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;