'use client';
import { useTheme } from "@emotion/react";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { Box, IconButton, Card, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material";
import { useState } from "react";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }
  
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };
  
    return (
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          gap: "10px",
          padding: "0 20px",
        }}
      >
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
          sx={{
            borderRadius: "4px",
            padding: "6px",
          }}
          className="border"
        >
          
            <KeyboardArrowLeft />
        
        </IconButton>
  
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
          sx={{
            borderRadius: "4px",
            padding: "6px",
          }}
          className="border"
        >
         
            <KeyboardArrowRight />
       
        </IconButton>
      </Box>
    );
  }

interface TableChurchesProps {
  rows: any;
}

const TableChurches: React.FC<TableChurchesProps> = ({ rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    return (
        <>
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
              mb: "25px",
              padding: { xs: "18px", sm: "20px", lg: "25px" },
            }}
            className="rmui-card"
          >
            {/* Table */}
            <Box
              sx={{
                marginLeft: "-25px",
                marginRight: "-25px",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  borderRadius: "0",
                }}
                className="rmui-table"
              >
                <Table sx={{ minWidth: 1200 }} aria-label="All Projects Table">
                  <TableHead className="bg-primary-50">
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "500",
                          padding: "10px 24px",
                          fontSize: "14px",
                        }}
                        className="text-black border-bottom"
                      >
                        ID
                      </TableCell>
    
                      <TableCell
                        sx={{
                          fontWeight: "500",
                          padding: "10px 20px",
                          fontSize: "14px",
                        }}
                        className="text-black border-bottom"
                      >
                       Nombre
                      </TableCell>
    
                      <TableCell
                        sx={{
                          fontWeight: "500",
                          padding: "10px 20px",
                          fontSize: "14px",
                        }}
                        className="text-black border-bottom"
                      >
                        Dirección
                      </TableCell>
    
                      <TableCell
                        sx={{
                          fontWeight: "500",
                          padding: "10px 20px",
                          fontSize: "14px",
                        }}
                        className="text-black border-bottom"
                      >
                        Teléfono
                      </TableCell>
    
                      <TableCell
                        sx={{
                          fontWeight: "500",
                          padding: "10px 20px",
                          fontSize: "14px",
                        }}
                        className="text-black border-bottom"
                      >
                        Sacerdote encargado
                      </TableCell>
                    </TableRow>
                  </TableHead>
    
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row:any) => (
                      <TableRow key={row.id}>
                        <TableCell
                          sx={{
                            padding: "15px 20px",
                            fontSize: "14px",
                          }}
                          className="border-bottom"
                        >
                          {row.id}
                        </TableCell>
    
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            padding: "15px 20px",
                            fontSize: "14px",
                          }}
                          className="text-black border-bottom"
                        >
                          {row.title}
                        </TableCell>
    
                        <TableCell
                          sx={{
                            padding: "15px 20px",
                            fontSize: "14px",
                          }}
                          className="text-black border-bottom"
                        >
                          {row.address}
                        </TableCell>
    
                        <TableCell
                          sx={{
                            padding: "15px 20px",
                            fontSize: "14px",
                          }}
                          className="text-black border-bottom"
                        >
                         {row.phone_number}
                        </TableCell>
    
                        <TableCell
                          sx={{
                            padding: "15px 20px",
                            fontSize: "14px",
                          }}
                          className="text-black border-bottom"
                        >
                          {row.priest}
                        </TableCell>
    
                      
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={9} />
                      </TableRow>
                    )}
                  </TableBody>
    
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={9}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        sx={{
                          border: "none",
                        }}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </>
      );
}
export default TableChurches;