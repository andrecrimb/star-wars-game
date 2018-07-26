import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    Typography,
    Table,
    Paper,
    TableRow,
    TableFooter,
    Grid,
    TablePagination,
} from '@material-ui/core';
import _ from 'lodash'
import {
    fetchCharacters as fetchCharactersApi,
    changeCharactersListPage
} from "../../../../actions";
import TablePaginationActions from '../../../../components/TablePaginationActions'

class CharactersList extends Component {

    constructor(props) {
        super(props);

        this.state = {listLoaded: false};

        this.fetchCharacters = this.fetchCharacters.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillMount() {
        this.fetchCharacters()
    }

    fetchCharacters() {
        this.setState({listLoaded: false});
        this.props.fetchCharactersApi(() => {
            this.setState({listLoaded: true});
        })
    }

    handleChangePage = (event, page) => {
        this.props.changeCharactersListPage(page + 1)
            .then(() => {
                this.fetchCharacters()
            })
    };


    render() {
        const {classes, characters: {paging}} = this.props;
        return (
            <div className={classes.fullContainer}>
                <Grid container spacing={24} justify="center">
                    {
                        _.map(this.props.characters.charactersList, (character, index) => {
                            return (
                                <Grid item sm={4} xs={12} key={index}>
                                    <Paper className={classes.paper} elevation={1}>
                                        <div className={classes.container}>
                                            <h4>Eye color: {character.eye_color}</h4>
                                            <h4>Skin color: {character.skin_color}</h4>
                                            <h4>Gender: {character.gender}</h4>
                                        </div>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                    <Table>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    className={classes.spacer}
                                    colSpan={3}
                                    count={paging.count}
                                    rowsPerPage={10}
                                    rowsPerPageOptions={[10]}
                                    page={paging.page - 1}
                                    onChangePage={this.handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                    labelRowsPerPage="Linhas por página:"
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Grid>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        characters: state.characters,
        films: state.films,
    }
};

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {fetchCharactersApi, changeCharactersListPage}),
)(CharactersList);
