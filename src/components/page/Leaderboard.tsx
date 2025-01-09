import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Leaderboard.css";
import { getUserByResult } from "../../api/UserAPI";
import { UserRank } from "../../model/UserRank";

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<UserRank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const leaderboardData = await getUserByResult();
        setUsers(leaderboardData);
      } catch (error) {
        console.error("Failed to fetch leaderboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 leaderboard-title">Bảng Xếp Hạng</h1>
      <div className="table-responsive">
        <table className="table table-hover leaderboard-table">
          <thead className="table-primary text-center">
            <tr>
              <th scope="col">Hạng</th>
              <th scope="col">Người dùng</th>
              <th scope="col">Điểm</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user, index) => (
              <tr key={user.userId} className="leaderboard-row">
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
