import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    Table,
    TableRow,
    TableFooter,
    Grid,
    TablePagination,
} from '@material-ui/core';
import _ from 'lodash'
import {
    fetchCharacters as fetchCharactersApi,
    changeCharactersListPage,
    gameStartToggle
} from "../../../../actions";
import TablePaginationActions from '../../../../components/TablePaginationActions'
import CharacterCard from '../CharacterCard'


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
        this.props.fetchCharactersApi(() => {
            this.setState({listLoaded: true});
            this.props.gameStartToggle(true)
        })
    }

    handleChangePage = (event, page) => {
        this.props.changeCharactersListPage(page + 1)
            .then(() => {
                this.fetchCharacters()
            })
    };

    render() {
        const {
            classes,
            characters: {paging},
            onClickItem
        } = this.props;
        if(!this.state.listLoaded){
            return <div/>
        }
        return (
            <div className={classes.fullContainer}>
                <Grid container spacing={24} justify="center">
                    {_.map(this.props.characters.charactersList, (character, index) => (
                        <CharacterCard onClickItem={onClickItem} character={character} characterIndex={index} key={index}/>
                    ))}
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
        loading: state.systemSettings.countLoadingRequest,
    }
};

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {
        fetchCharactersApi,
        changeCharactersListPage,
        gameStartToggle
    }),
)(CharactersList);
