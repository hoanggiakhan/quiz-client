import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
}

const UserStats: React.FC<UserStatsProps> = ({ totalUsers, activeUsers }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Thống kê người dùng</CardTitle>
        <CardText>
          <div>
            <strong>Tổng số người dùng:</strong> {totalUsers}
          </div>
          <div>
            <strong>Người dùng đang hoạt động:</strong> {activeUsers}
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default UserStats;