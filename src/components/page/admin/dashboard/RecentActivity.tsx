import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'react-bootstrap';

interface RecentActivityProps {
  activities: {
    timestamp: string;
    description: string;
  }[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <ListGroup>
          {activities.map((activity, index) => (
            <ListGroupItem key={index}>
              <div>{activity.timestamp}</div>
              <div>{activity.description}</div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default RecentActivity;