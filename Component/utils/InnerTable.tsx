import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {IInnerTable} from "@/types/types";


const InnerTable: React.FC<IInnerTable> = ({row, column}) => {
            return (
                <TableRow
                    sx={{"&:last-child td, &:last-child th": {border: 0}, color: '#fff'}}
                >
                    <TableCell component="th" scope="row">

                    </TableCell>
                    <TableCell component="th" scope="row">
                        xxxxx
                    </TableCell>
                    <TableCell align="left">xxxx </TableCell>
                    <TableCell align="left">xxxx    </TableCell>
                    <TableCell align="left">xxxx </TableCell>
                    <TableCell align="left">xxxxxxx </TableCell>
                    <TableCell align="left">xxx</TableCell>
                    <TableCell align="left">xxxx</TableCell>
                </TableRow>
            )

}

export default InnerTable;