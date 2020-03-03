import React from 'react';
import Header from '../CommonComponents/AppBar';
import clsx from 'clsx';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch,
    Avatar
} from '@material-ui/core';
import { lighten, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {userService} from "../Services/userServices";
import config from "./config";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    // { id: 'srno', numeric: false, disablePadding: true, label: '#' },
    { id: 'categoryName', numeric: true, disablePadding: false, label: 'Category Name' },
    { id: 'CategoryImage', numeric: true, disablePadding: false, label: 'Category Image' },
    { id: 'Action', numeric: true, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead style={{backgroundColor:'black'}}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                        style={{color:'white'}}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{color:'white'}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = props => {
    const classes = props;
    const { numSelected } = props;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null
            }
        </Toolbar>
    );
};

 class EnhancedTable extends React.Component{

     constructor(props) {
         super(props);
         this.state={
             order:'asc',
             orderBy:'calories',
             selected:[],
             page:0,
             dense:false,
             rowsPerPage:6,
             CategoryData:[],
             COUNT:0,
             AllId:[],
             isAllChecked:false,
             unchecked:[]
         }
     }

     componentDidMount() {
        this.GetData(this.state.page+1)
     }

      arrayUnique =(array) => {
         let a = array.concat();
         for(let i=0; i<a.length; ++i) {
             for(let j=i+1; j<a.length; ++j) {
                 if(a[i] === a[j])
                     a.splice(j--, 1);
             }
         }
         return a;
     }

     GetData = (num)=>{
         const {isAllChecked,unchecked}=this.state
         const data={
             page:num
         }
             userService.getAllLazyCategory(data).then((response)=>{
                 debugger
                 let arr=[...this.state.CategoryData]

                 this.setState({
                     CategoryData:response.data.data,
                     COUNT:response.data.count,
                     AllId:arr.concat(response.data.data)
                 })

                 if(isAllChecked){
                     debugger
                     let a=[...this.state.selected]
                     const arr1 = response.data.data.map(n => n._id);
                     let newSelecteds=this.arrayUnique(a.concat(arr1));
                     console.log(newSelecteds)
                     console.log(unchecked)
                     // newSelecteds.map((item,index)=>{
                     //     unchecked.map((item1,index1)=>{
                     //         if(item==item1){
                     //             newSelecteds.splice(index,1)
                     //         }
                     //     })
                     //
                     // })
                     debugger
                     this.setState({selected:newSelecteds});


                 }

             }).catch((err)=>{
                 alert(err)
             })

     }

     render(){
        const {classes}= this.props;
        const {
            order,
            orderBy,
            selected,
            page,
            dense,
            rowsPerPage,
            CategoryData,
            COUNT,
            AllId,
            isAllChecked,
            unchecked}=this.state;

        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            this.setState({order:isAsc ? 'desc' : 'asc',orderBy:property})
        };

        const handleSelectAllClick = event => {
            if (event.target.checked) {
                const newSelecteds = AllId.map(n => n._id);
                this.setState({selected:newSelecteds,isAllChecked:true})
                return;
            }
            this.setState({selected:[],isAllChecked:false})
        };

        const handleClick = (event, id) => {

            const selectedIndex = selected.indexOf(id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }

            this.setState({selected:newSelected})

            if(isAllChecked){
                if(unchecked.includes(id)){
                  unchecked.map((item,index)=>{
                        if(item==id){
                            unchecked.splice(index,1)
                        }
                    })
                }else{
                    this.setState({unchecked:[...unchecked,id]})
                }
                console.log(this.state.unchecked);

            }
            // console.log(this.state.selected)
        };

        const handleChangePage = (event, newPage) => {
            this.setState({page:newPage})
            this.GetData(newPage+1)
        };

        const handleChangeRowsPerPage = event => {
            this.setState({page:1,rowsPerPage:parseInt(event.target.value, 10)})
            // console.log(this.state.rowsPerPage)
        };

        const handleChangeDense = event => {
            this.setState({dense:event.target.checked})
        };

        const isSelected = name => selected.indexOf(name) !== -1 ;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, COUNT - page * rowsPerPage);

         const pageNumbers = [];
         for (let i = 1; i <= Math.ceil(COUNT/ rowsPerPage); i++) {
             pageNumbers.push(i);
         }

        const renderPageNumbers = pageNumbers.map(number => {
             let classs = page === number ? classes.active : '';
             return (
                 <span key={number} className={classs} onClick={() => this.GetData(number)}>{number}</span>
             );
         });

        return (
            <div className={classes.root}>
                <Header />
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table">
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={COUNT}
                            />
                            <TableBody>
                                {
                                    stableSort(CategoryData, getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleClick(event, row._id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                key={row._id}
                                                selected={isItemSelected}
                                            >
                                                {/*<TableCell component="th" id={labelId} scope="row" padding="none">*/}
                                                {/*    {(page*rowsPerPage)}*/}
                                                {/*</TableCell>*/}
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected || isAllChecked}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">{row.Category_name}</TableCell>
                                                <TableCell align="right"><Avatar alt="Cindy Baker" src={`${config.apiUrl}/images/Image/category/${row.CategoryImage}`} style={{float:'right'}}/></TableCell>
                                                <TableCell align="right"><EditIcon onClick={()=>alert('Edit')} /><DeleteIcon onClick={()=>alert('Delete')}/></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={COUNT}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    <div className={classes.paginationex}>
                        <span>&laquo;</span>
                        {renderPageNumbers}
                        <span>&raquo;</span>
                    </div>
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        );
    }

}

const style=theme => ({
    root: {
        width: '100%',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
        color:'#fff'
    },
    paginationex: {
        cursor: 'pointer',
        color: 'black',
        // float: 'left',
        padding: '8px 16px',
        textDecoration: 'none',
        transition: 'background-color .3s',
        border: '2px solid #ddd',
        '& span':{
            border: '2px solid #ddd',
            padding: '8px 16px',
        }
    },
    active: {
        backgroundColor:'#0099FF',
        color: 'white',
        border: '1px solid #0099FF'
    },
    headBackRoundColor:{
        backgroundColor:'#FFF',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.8),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    }
})

export default withStyles(style)(EnhancedTable)