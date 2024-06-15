import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

const UserWithManagerTable = ({
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleEdit,
  handleDelete,
  handleSelectAllClick,
  handleClick,
  selected,
  role
}) => {
  const isSelected = id => selected.indexOf(id) !== -1;

  const renderActionButtons = row => {
    if (role === 'A') {
      return (
        <TableCell align='right'>
          <IconButton onClick={() => handleEdit(row.id)}>
            <GrEdit />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <RiDeleteBinLine />
          </IconButton>
        </TableCell>
      );
    }
    return null;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {role === 'A' && (
              <TableCell padding='checkbox'>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
            )}
            <TableCell sortDirection='asc'>
              <TableSortLabel active direction='asc'>
                Sr. No
              </TableSortLabel>
            </TableCell>
            <TableCell>Bo Name</TableCell>
            <TableCell>BO Email</TableCell>
            <TableCell>ABM Name</TableCell>
            <TableCell>ABM Email</TableCell>
            <TableCell>RSM Name</TableCell>
            <TableCell>RSM Email</TableCell>
            <TableCell>NSM Name</TableCell>
            <TableCell>NSM Email</TableCell>
            <TableCell>GPM Name</TableCell>
            <TableCell>GPM Email</TableCell>
            {role === 'A' && <TableCell align='right'>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
                hover
                onClick={event => handleClick(event, row.id)}
                role='checkbox'
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                {role === 'A' && (
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                )}
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{row.bo_name}</TableCell>
                <TableCell>{row.bo_email}</TableCell>
                <TableCell>{row.abm_name}</TableCell>
                <TableCell>{row.abm_email}</TableCell>
                <TableCell>{row.rsm_name}</TableCell>
                <TableCell>{row.rsm_email}</TableCell>
                <TableCell>{row.nsm_name}</TableCell>
                <TableCell>{row.nsm_email}</TableCell>
                <TableCell>{row.gpm_name}</TableCell>
                <TableCell>{row.gpm_email}</TableCell>
                {renderActionButtons(row)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UserWithManagerTable;
