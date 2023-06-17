
import ReactPaginate, { ReactPaginateProps } from "react-paginate";


interface Props extends ReactPaginateProps {
    currentPage: number;
    totalPages: number;
    pageSize: number
    total: number
}

const Paginate: React.FC<Props> = ({
    currentPage = 1,
    totalPages = 1,
    breakLabel = "...",
    ...props
}) => {

    return (
        <div>
            <ReactPaginate
                {...props}
                forcePage={currentPage - 1}
                previousLabel={""}
                nextLabel={""}
                breakLabel={breakLabel}
                pageCount={totalPages}
                pageRangeDisplayed={2}
                containerClassName={"pagination"}
                pageClassName={"paginationItem"}
                breakClassName={"paginationItem"}
                activeClassName={"active"}
                previousClassName={"paginationItem paginationItem__prev "}
                nextClassName={"paginationItem paginationItem__next"}
            />
        </div>
    );
};

export default Paginate;
