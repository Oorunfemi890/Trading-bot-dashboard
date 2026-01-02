/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/admin/UsersPage.tsx
// ===================================================

import { useState } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { useUsers } from '@/hooks';
import { formatDate } from '@/utils';
import { Ban, CheckCircle, Trash2 } from 'lucide-react';

export default function UsersPage() {
  const { users, loading, total, page, setPage, setFilters, suspendUser, activateUser } = useUsers();
  const [search, setSearch] = useState('');

  function handleSearch(query: string) {
    setSearch(query);
    setFilters({ search: query });
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
                      user.status === 'active'
                        ? 'success'
                        : user.status === 'suspended'
                        ? 'destructive'
                        : 'warning'
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.status === 'active' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => suspendUser(user.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Ban className="h-4 w-4 text-destructive" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => activateUser(user.id)}
                        className="h-8 w-8 p-0"
                      >
                        <CheckCircle className="h-4 w-4 text-success" />
                      </Button>
                    )}
                  </div>
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
    </div>
  );
}