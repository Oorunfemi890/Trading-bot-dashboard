/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// ===================================================
// FILE: src/pages/admin/UsersPage.tsx (UPDATED WITH EYE ICON)
// ===================================================
import { useState } from "react";
import { Eye } from "lucide-react";
import { Card } from "@/components/common/Card/Card";
import { Button } from "@/components/common/Button/Button";
import { Badge } from "@/components/common/Badge/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/common/Table/Table";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Pagination } from "@/components/common/Pagination/Pagination";
import { useUsers } from "@/hooks";
import { formatDate } from "@/utils";
import { UserDetailModal } from "@/components/features/admin/UserDetailModal";

export default function UsersPage() {
  const { users, loading, total, page, setPage, setFilters } = useUsers();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserStats, setSelectedUserStats] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  function handleSearch(query: string) {
    setSearch(query);
    setFilters({ search: query });
  }

  async function handleViewDetails(user: any) {
    try {
      // Fetch full user details with statistics
      const response = await fetch(`/api/v1/admin/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setSelectedUser(data.data);
        setSelectedUserStats(data.data.statistics);
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6 overflow-x-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-2">Manage user accounts</p>
        </div>
      </div>

      <Card>
        <div className="mb-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search users by name or email..."
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="capitalize">{user.tier}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "success"
                        : user.status === "suspended"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(user)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        userStats={selectedUserStats}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}
